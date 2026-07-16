#!/usr/bin/env node

// ARC-1 CLI — direct tool invocation entry point
// Delegates to compiled TypeScript (dist/cli.js).
//
// This bin is separate from `arc1` (bin/arc1.js) even though both delegate to dist/cli.js:
// invoked as `arc1` the entry runs the MCP server and must own stdin/stdout cleanly for the
// JSON-RPC stream, while `arc1-cli` is for command-line use (read, activate, syntax, call,
// extract-cookies, …) and exits after a single invocation.

import('../dist/cli.js');
