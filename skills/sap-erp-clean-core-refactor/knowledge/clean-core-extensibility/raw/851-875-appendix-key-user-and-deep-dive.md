---
source_url: source/clean-core-extensibility-for-architects-2026-07.pdf
captured_at: 2026-07-13T20:47:18.456697+00:00
author: SAP
contributor: gabriele.rendina
page_start: 851
page_end: 875
topic: appendix-key-user-and-deep-dive
---

# Clean Core Extensibility - pages 851-875

## PDF page 851
ABAP Cloud development model
One development model for SAP S/4HANA and SAP BTP
On-stack Side-by-side
- TIGHTLY coupled LOOSELY coupled -
extensibility extensibility
SAP S/4HANA SAP S/4HANA Cloud, SAP S/4HANA Cloud, SAP BTP,
any premise 1 private edition 1 public edition 2 ABAP Environment
ABAP Cloud development model
to build cloud-ready business apps, services, and extensions
Classic ABAP development model
1 SAP S/4HANA any premise or SAP S/4HANA Cloud, private edition release ≥ 2022
2 SAP S/4HANA Cloud, public edition release ≥ 2208, 3-system landscape required
INTERNAL – S R AP e an f d e P r ar t t n o ers A On B ly AP Cloud - Technical Use Cases and Recommended Technologies 981

## PDF page 852
The Product
SAP Discovery
Center
INTERNAL – SAP and Partners Only 982

## PDF page 853
SAP BTP ABAP Environment
Frontrunner for ABAP Cloud technologies
SAP BTP ABAP Environment
Main Usage Scenarios
Hibernation
Save costs
Loosely-coupled side-by-side
extensions and applications ABAP Cloud development model
Pre-Upgrade
Multitenant SaaS solutions and
Add-Ons by Partners Perform test of mission-
critical extensions before
Infrastructure
upgrade of productive
instance
SAP BTP services
Gardener (K8S), SAP HANA Cloud
INTERNAL – SAP and Partners Only 983

## PDF page 854
System Hibernation
Total costs for a stopped
minimal system
less than 5%
Blog Post
INTERNAL – SAP and Partners Only 984

## PDF page 855
Optimize Your SAP BTP ABAP Environment Budget with System Hibernation
Stop development systems outside of working hours and during the weekend
Stop correction systems (for the productive codeline) outside of correction activities
Stop test systems outside of test activities
Stop custom code analysis system when analysis is finished
Stop production systems before go-live
Blog Post
Metric Costs for a stopped system
ABAP Compute Units 0%
HANA Compute Units 12,5%
INTERNAL – SAP and Partners Only 985

## PDF page 856
Pre-upgrade now 4 weeks before
Blog post
INTERNAL – SAP and Partners Only 986

## PDF page 857
ABAP Cloud on SAP BTP and on SAP S/4HANA – Clean Core by Default
ABAP Cloud ABAP Cloud
development development
on SAP S/4HANA on SAP BTP
SAP S/4HANA
Cloud
ABAP Cloud comes with:
s
e
c
a
f r remote API Public SAP APIs and extensions
e
t n points
i
c
ilb Cloud-optimized ABAP language
u
p ABAP Development Tools
ABAP RESTful Application
Programming Model (RAP)
Comprehensive set of technical
services usable out of the box
public interfaces public interfaces Gen AI capabilities*
SAP S/4HANA Cloud ABAP Environment / ABAP SAP BTP ABAP Environment
Platform
Focus here
INTERNAL – SAP and Partners Only * This presentation and SAP‘s strategy and possible future developments are subject to change and may be changed by SAP at any time for any reason without notice. 987

## PDF page 858
Supported Delivery Options for Partners
There are two different options how partner can offer and operate their partner solution:
1. Service: Multitenancy SaaS Solution
• Partner offers cloud service
• Customers subscribe to service, getting an own tenant in the partner’s central provider system
• Application monitoring and management of infrastructure costs on partner side
• Field extensibility and custom logic is supported tenant aware (key user extensibility)
2. Software: Add-On Product
• Partner offers product as software
• Customers run their own instance of SAP BTP ABAP Environment
• Installation is by customers through the landscape portal (planned feature)
• Product extensibility is through ABAP development tools for Eclipse (developer extensibility)
INTERNAL – SAP and Partners Only 988

## PDF page 859
Solution Partner Models
Find more details in the blog post
INTERNAL – SAP and Partners Only 989

## PDF page 860
SAP BTP ABAP Environment presentation
https://dam.sap.com/mac/app/e/pdf/preview/embed/EDuHH7c?ltr=a&rc=10&doi=SAP907291
INTERNAL – SAP and Partners Only 990

## PDF page 861
Further Information
References Extensibility
• SAP BTP ABAP Environment | SAP Discovery Center - SAP S/4HANA Extensibility Learnings
• Product Documentation | SAP Help Portal - ABAP Extensibility Guide
• Roadmap | SAP Help Portal - Clean Core Extensibility whitepaper
• What's New for Release 2508 | SAP Help Portal
• Release Schedule | Blog Post
• Landing Page | SAP Community
• Material from Customer & Partner Roundtables
• Best Practices | Blog Post
Tutorials
• Create your first SAP Fiori application using RAP
• More than 100 further tutorials are available in the SAP Tutorial Navigator
INTERNAL – SAP and Partners Only 991

## PDF page 862
SAP Build Code

## PDF page 863
SAP Build
SAP Build
Low-code
SAP Build Apps
Low-code applications
Key user
Extensions for Workflows and SAP Build Process
extensibility for
SAP applications automations Automation
SAP S/4HANA
Digital workspaces
SAP Build Work Zone
Joule copilot
SAP S/4HANA
SAP BTP
Cloud
Side-by-side extensibility
On-stack extensibility
Prebuilt content
and templates
Full-stack applications
Full-stack applications
Cloud developer Integrations SAP Build Code
Integrations
extensibility for Partner multitenant
Extensions for SAP BTP, ABAP
SAP S/4HANA
SAP applications SaaS applications and environment
add-ons
Pro-code
INTERNAL – SAP and Partners Only 993

## PDF page 864
SAP Build Code
Application development for key extension use cases in SAP software environments
SAP Build Code
SAP Build Code
Extend Build SAP Fiori apps Build cross-platform
SAP solutions with SAPUI5 and mobile apps
SAP Fiori elements SAP Build Apps *
ABAP environments Develop code based Develop applications Build multitenant, SAP Build Process
on generative AI with native to SAP HANA SaaS applications Automation
the Joule copilot
* SAP Build Apps Deprecation and The Path Forward
INTERNAL – SAP and Partners Only 994

## PDF page 865
SAP Build Code: What you need to follow best practices of SAP
Build Code Development Environment
Code and visual editors for data models, services, and web and mobile development
SAP Build
Generative AI–supported application services
SAP Build UI development Mobile services
Apps Cloud application Document
programming model SAP Fiori SAP Web Mobile SDKs for management
SAPUI5
elements Components development kit iOS and Android
SAP Build
Runtime services
SAP Build
Code
Process
Continuous integration Authorization and Event broker Application Alert notification
Automation
and delivery trust management service autoscaler service service
Cloud logging Cloud transport Connectivity Destination Feature flag
service management service service service
SAP Build
Work Zone
Runtime* on SAP BTP
*Cloud Foundry included; Kyma runtime to be added soon
SAP BTP, ABAP
SAP HANA database SAP Integration Suite
environment
PUBLIC 995
This presentation and SAP‘s strategy and possible future developments are subject to change and may be changed by SAP at any time for any reason without notice.
This document is provided without a warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or noninfringement.

## PDF page 866
Help.sap.com: SAP Build Code
https://help.sap.com/docs/build_code/d0d8f5bfc3d640478854e6f4e7c7584a/504854f457cc4fbf9f79136dbc773618.html
PUBLIC 996

## PDF page 867
optional
Discover out-of-the-box capabilities SAP Build Code provides
Efficient development on SAP BTP with proven tools and frameworks
SAP Cloud Application
SAPUI5 SAP Mobile Services
Programming Model
Modern & consistent UX Offline sync Multitenancy
Accessibility Push Extensibility
Internationalization App update Cloud security
Responsiveness Logging Scalability
Security Tracing Messaging
SAP Fiori elements Application management Observability
Extensibility Cloud build service Authorization
Lifecycle stability Extensibility Localization
Test automation Enterprise-grade security Temporal data
Data privacy
Learn more in the SAP BTP Developer’s Guide
PUBLIC 997

## PDF page 868
SAP Build Code
Generative AI-powered application development, optimized for Java and JavaScript developers
Generative AI Tailored Enhanced
supercharged development for SAP development fusion development
Generative AI-powered Prebuilt integration with Secure collaboration between
app development SAP and non-SAP systems developers and business users
Turnkey development solution Trusted security for authentication, App composability across
including SAP best practices authorization, and data protection SAP Build and ABAP solutions
Guided experiences and templates to quickly Extensibility for SAP Unified governance and simplified
build full stack, back-end, and mobile apps S/4HANA and other systems application lifecycle management
INTERNAL – SAP and Partners Only 998

## PDF page 869
Creating a Mobile Development Kit Application with SAP Build Code
Reduce app development costs and increase
productivity using Joule and visual tooling
Build custom mobile application or extend
selected SAP applications to your business
needs
Relieve maintenance burdens with intuitive
lifecycle management
Deploy the application to run on multiple
platforms (iOS & Android)
INTERNAL – SAP and Partners Only 999

## PDF page 870
Mastering secure and trusted integrations via Service Center
Discover and consume APIs and events, business services, and sample apps
Use prebuilt integrations with SAP
and ​non-SAP applications that
maintain ​business context
Security from SAP BTP for authentication,
authorization, and data protection
Unified IT governance, transport
management and application
lifecycle management
PUBLIC 1000

## PDF page 871
SAP Build Lobby facilitates fusion development
One entry point for all business users and developers building on SAP BTP
Unified lobby for app composability,
a single entry point for all projects
Consume components created with SAP
Build Code in SAP Build Apps *, SAP
Build Process Automation, and SAP
Build Work Zone
Fast-track projects with pre-built
templates from the Lobby Store
PUBLIC * SAP Build Apps Deprecation and The Path Forward 1001

## PDF page 872
Joule Studio

## PDF page 873
Build Joule agents and skills
Joule Studio
Extend Joule copilot and enhance enterprise-wide productivity
Apps and extensions Automations AI skills and agents Digital workspaces
Bring data and transactions from SAP and
third-party apps into Joule to provide a
unified conversational experience
Build Joule agents Govern AI agents
and skills that centrally within
understand and SAP Build for built-in
solve business enterprise-grade
problems security
PUBLIC 1003

## PDF page 874
Use this slide when needed as a deep dive / more information for the previous slide
Joule agent and skill development with Joule Studio
Extend Joule using clean core approach
Apps and extensions Automations AI skills and agents Digital workspaces
Building custom Joule agents and skills
More information in the
Joule Studio deck
SAP and third-party integration
Reuse standard Build custom Build custom Bring tools for AI
SAP Integration Suite
Joule skills and Joule skills AI agents agents to reason
agents and act
Secure AI model orchestration
SAP AI Core infrastructure
Business data grounding Multi-agent Natural language Document Unified
SAP Business Data Cloud collaboration in understanding grounding governance and
business context lifecycle
AI copilot Joule
>660
prebuilt processes and automations
PUBLIC 1004

## PDF page 875
Webinar: Learn about the free SAP Build
test, demo, and development (TDD)
licenses for partners
