import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  isActionDenied,
  parseDenyActions,
  validateDenyActions,
  validatePluginDenyActions,
} from '../../../src/server/deny-actions.js';

describe('parseDenyActions', () => {
  it('parses inline CSV with multiple patterns', () => {
    expect(parseDenyActions('SAPWrite.delete,SAPManage.flp_*')).toEqual(['SAPWrite.delete', 'SAPManage.flp_*']);
  });

  it('trims whitespace in inline CSV', () => {
    expect(parseDenyActions(' SAPWrite.delete , SAPManage.flp_* ')).toEqual(['SAPWrite.delete', 'SAPManage.flp_*']);
  });

  it('empty string returns empty array', () => {
    expect(parseDenyActions('')).toEqual([]);
    expect(parseDenyActions('   ')).toEqual([]);
  });

  it('filters empty entries from CSV', () => {
    expect(parseDenyActions('SAPWrite.delete,,SAPManage.flp_*,')).toEqual(['SAPWrite.delete', 'SAPManage.flp_*']);
  });

  describe('file-path input', () => {
    it('reads JSON array from absolute path', () => {
      const dir = mkdtempSync(join(tmpdir(), 'deny-actions-test-'));
      const file = join(dir, 'deny.json');
      writeFileSync(file, JSON.stringify(['SAPWrite.delete', 'SAPGit.push']), 'utf8');
      try {
        expect(parseDenyActions(file)).toEqual(['SAPWrite.delete', 'SAPGit.push']);
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    });

    it('recognizes ./ prefix as path-like', () => {
      // The function tries to read ./deny.json — will throw because file doesn't exist.
      // That exception proves the path detection worked (vs. treating as CSV).
      expect(() => parseDenyActions('./nonexistent-deny.json')).toThrow(/cannot read file/);
    });

    it('throws when file does not exist', () => {
      expect(() => parseDenyActions('/nonexistent/path/deny.json')).toThrow(/cannot read file/);
    });

    it('recognizes a Windows drive-letter absolute path as path-like', () => {
      // Same proof pattern as the './' case above: if this were misdetected as inline CSV, it
      // would parse into a single (invalid-grammar) pattern instead of throwing "cannot read file".
      expect(() => parseDenyActions('C:\\nonexistent\\deny.json')).toThrow(/cannot read file/);
      expect(() => parseDenyActions('D:/nonexistent/deny.json')).toThrow(/cannot read file/);
    });

    it('throws on invalid JSON', () => {
      const dir = mkdtempSync(join(tmpdir(), 'deny-actions-test-'));
      const file = join(dir, 'deny.json');
      writeFileSync(file, 'not valid json', 'utf8');
      try {
        expect(() => parseDenyActions(file)).toThrow(/invalid JSON/);
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    });

    it('throws when file content is not an array', () => {
      const dir = mkdtempSync(join(tmpdir(), 'deny-actions-test-'));
      const file = join(dir, 'deny.json');
      writeFileSync(file, JSON.stringify({ not: 'array' }), 'utf8');
      try {
        expect(() => parseDenyActions(file)).toThrow(/must contain a JSON array of strings/);
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    });
  });
});

describe('validateDenyActions', () => {
  it('accepts valid tool-level patterns', () => {
    expect(() => validateDenyActions(['SAPWrite'])).not.toThrow();
    expect(() => validateDenyActions(['SAPGit'])).not.toThrow();
  });

  it('accepts valid Tool.action patterns', () => {
    expect(() => validateDenyActions(['SAPWrite.delete', 'SAPManage.flp_list_catalogs'])).not.toThrow();
  });

  it('accepts SAPWrite.scaffold_rap_handlers (RAP handler scaffolder)', () => {
    // Regression: this action was added after the main SAPWrite enum and
    // must be listed in ACTION_POLICY so admins can specifically deny it
    // via SAP_DENY_ACTIONS without having to block the whole SAPWrite tool.
    expect(() => validateDenyActions(['SAPWrite.scaffold_rap_handlers'])).not.toThrow();
  });

  it('accepts SAPWrite.edit_text_symbols (class text-pool write)', () => {
    // Regression: this on-prem mutating action needs an ACTION_POLICY row so
    // admins can deny it individually via SAP_DENY_ACTIONS.
    expect(() => validateDenyActions(['SAPWrite.edit_text_symbols'])).not.toThrow();
    expect(isActionDenied('SAPWrite', 'edit_text_symbols', ['SAPWrite.edit_text_symbols'])).toBe(true);
  });

  it('accepts valid Tool.glob* patterns', () => {
    expect(() => validateDenyActions(['SAPManage.flp_*', 'SAPTransport.*'])).not.toThrow();
  });

  it('rejects cross-tool wildcards', () => {
    expect(() => validateDenyActions(['*.delete'])).toThrow(/cross-tool wildcards are not supported/);
  });

  it('rejects unknown tools', () => {
    expect(() => validateDenyActions(['SAPFoo.bar'])).toThrow(/unknown tool 'SAPFoo'/);
  });

  it('rejects patterns that match no actions in the tool', () => {
    expect(() => validateDenyActions(['SAPManage.nonexistent_action'])).toThrow(/matches no actions/);
  });

  it('rejects invalid grammar (lowercase-start)', () => {
    expect(() => validateDenyActions(['sapwrite.delete'])).toThrow(/invalid pattern/);
  });

  it('lists valid tools in the error message', () => {
    try {
      validateDenyActions(['SAPFoo.bar']);
      throw new Error('should have thrown');
    } catch (err) {
      expect((err as Error).message).toMatch(/Valid tools:.*SAPRead/);
    }
  });
});

describe('isActionDenied', () => {
  it('returns false for empty pattern list', () => {
    expect(isActionDenied('SAPWrite', 'delete', [])).toBe(false);
  });

  it('exact match on Tool.action', () => {
    expect(isActionDenied('SAPWrite', 'delete', ['SAPWrite.delete'])).toBe(true);
    expect(isActionDenied('SAPWrite', 'create', ['SAPWrite.delete'])).toBe(false);
  });

  it('glob match on Tool.glob*', () => {
    expect(isActionDenied('SAPManage', 'flp_create_catalog', ['SAPManage.flp_*'])).toBe(true);
    expect(isActionDenied('SAPManage', 'flp_list_tiles', ['SAPManage.flp_*'])).toBe(true);
    expect(isActionDenied('SAPManage', 'create_package', ['SAPManage.flp_*'])).toBe(false);
  });

  it('tool-level pattern covers all actions of that tool', () => {
    expect(isActionDenied('SAPWrite', 'create', ['SAPWrite'])).toBe(true);
    expect(isActionDenied('SAPWrite', 'delete', ['SAPWrite'])).toBe(true);
    expect(isActionDenied('SAPManage', 'create_package', ['SAPWrite'])).toBe(false);
  });

  it('tool.* pattern matches all actions of that tool', () => {
    expect(isActionDenied('SAPTransport', 'create', ['SAPTransport.*'])).toBe(true);
    expect(isActionDenied('SAPTransport', 'check', ['SAPTransport.*'])).toBe(true);
  });

  it('tool mismatch returns false', () => {
    expect(isActionDenied('SAPRead', 'PROG', ['SAPWrite.delete'])).toBe(false);
  });
});

describe('plugin tool names (Custom_*) in SAP_DENY_ACTIONS', () => {
  it('accepts a plugin tool name alone', () => {
    expect(() => validateDenyActions(['Custom_LaunchReport'])).not.toThrow();
  });

  it('accepts a plugin tool name mixed with built-in patterns', () => {
    expect(() =>
      validateDenyActions(['SAPDiagnose.odata_perf', 'Custom_LaunchReport', 'SAPWrite.delete', 'SAPManage.flp_*']),
    ).not.toThrow();
  });

  it('parses and validates the inline CSV form', () => {
    const parsed = parseDenyActions('Custom_LaunchReport,SAPDiagnose.odata_perf');
    expect(parsed).toEqual(['Custom_LaunchReport', 'SAPDiagnose.odata_perf']);
    expect(() => validateDenyActions(parsed)).not.toThrow();
  });

  it('rejects an action or glob on a plugin tool (plugin tools are denied whole)', () => {
    expect(() => validateDenyActions(['Custom_LaunchReport.run'])).toThrow(/plugin tool.*tool-level only/);
    expect(() => validateDenyActions(['Custom_*'])).toThrow(/plugin tool.*tool-level only/);
    expect(() => validateDenyActions(['Custom_'])).toThrow(/plugin tool.*tool-level only/);
  });

  it('still rejects unknown built-in-style tools and typos', () => {
    expect(() => validateDenyActions(['SAPDiagnose.odata_prf'])).toThrow(/matches no actions/);
    expect(() => validateDenyActions(['Custm_LaunchReport'])).toThrow(/invalid pattern/);
  });

  describe('validatePluginDenyActions (after the plugins are loaded)', () => {
    it('accepts a pattern naming a loaded plugin tool, ignoring built-in patterns', () => {
      expect(() =>
        validatePluginDenyActions(['SAPDiagnose.odata_perf', 'Custom_LaunchReport'], ['Custom_LaunchReport']),
      ).not.toThrow();
    });

    it('refuses a plugin tool that no loaded plugin provides (typo)', () => {
      expect(() => validatePluginDenyActions(['Custom_LaunchReprt'], ['Custom_LaunchReport', 'Custom_Other'])).toThrow(
        /unknown plugin tool 'Custom_LaunchReprt'.*Loaded plugin tools: Custom_LaunchReport, Custom_Other/,
      );
    });

    it('refuses a plugin tool when no plugin is loaded', () => {
      expect(() => validatePluginDenyActions(['Custom_LaunchReport'], [])).toThrow(/ARC1_PLUGINS/);
    });

    it('does nothing for built-in patterns only', () => {
      expect(() => validatePluginDenyActions(['SAPWrite.delete'], [])).not.toThrow();
    });
  });

  it('isActionDenied covers the plugin tool, alone and mixed', () => {
    expect(isActionDenied('Custom_LaunchReport', undefined, ['Custom_LaunchReport'])).toBe(true);
    expect(isActionDenied('Custom_LaunchReport', undefined, ['SAPDiagnose.odata_perf', 'Custom_LaunchReport'])).toBe(
      true,
    );
    expect(isActionDenied('Custom_Other', undefined, ['Custom_LaunchReport'])).toBe(false);
    expect(isActionDenied('SAPDiagnose', 'odata_perf', ['SAPDiagnose.odata_perf', 'Custom_LaunchReport'])).toBe(true);
  });
});

describe('validatePluginDenyActions with registry entries', () => {
  it('counts only plugin entries as loaded plugin tools', () => {
    const entries = [
      { name: 'SAPRead', source: 'builtin' as const },
      { name: 'Custom_LaunchReport', source: 'plugin' as const },
    ];
    expect(() => validatePluginDenyActions(['Custom_LaunchReport'], entries)).not.toThrow();
    expect(() => validatePluginDenyActions(['Custom_Missing'], entries)).toThrow(
      /Loaded plugin tools: Custom_LaunchReport\./,
    );
  });
});
