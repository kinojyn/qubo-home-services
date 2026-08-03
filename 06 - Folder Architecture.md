# Document 06: Folder Architecture

## DS Home Services

**Version:** 1.0  
**Status:** Approved  
**Priority:** Critical

## Purpose

This document defines the complete project folder structure.

The architecture must remain clean, scalable, and maintainable as the project grows.

Never place files randomly.

Every file must have a logical home.

## Architecture Philosophy

Organize by responsibility.

Not by convenience.

Every folder should have one purpose.

Avoid deep nesting whenever possible.

Prefer reusable modules.

## Root Structure

```text
app/
components/
features/
hooks/
lib/
services/
actions/
types/
constants/
config/
utils/
styles/
providers/
public/
data/
content/
locales/
middleware/
```

## App

Contains application routes.

Example:

```text
app/
├── layout.tsx
├── page.tsx
├── services/
├── about/
├── pricing/
├── contact/
├── faq/
├── estimate/
├── admin/
└── blog/
```

## Components

Reusable UI only.

No business logic.

Structure:

```text
components/
├── ui/
├── layout/
├── sections/
├── forms/
├── cards/
├── navigation/
├── feedback/
├── icons/
└── animations/
```

## UI Components

- Button
- Input
- Textarea
- Select
- Checkbox
- Badge
- Avatar
- Modal
- Drawer
- Accordion
- Tabs
- Tooltip
- Spinner
- Skeleton
- Divider
- Container
- Section

## Layout Components

- Navbar
- Footer
- Header
- Sidebar
- MobileMenu
- PageWrapper
- SectionWrapper

## Section Components

- Hero
- Services
- HowItWorks
- Pricing
- Testimonials
- Gallery
- Coverage
- FAQ
- Contact
- Estimate
- BlogPreview
- CTASection

## Card Components

- ServiceCard
- PricingCard
- FeatureCard
- ReviewCard
- GalleryCard
- StatisticCard
- CoverageCard

## Form Components

- EstimateForm
- ContactForm
- UploadField
- PhoneInput
- EmailInput
- TextArea
- SuccessMessage

## Features

Business logic is grouped by feature.

Example:

```text
features/
├── estimate/
├── gallery/
├── blog/
└── admin/
```

Each feature contains:

- Components
- Hooks
- Actions
- Types
- Utilities

## Hooks

Reusable hooks only.

Examples:

- `useScrollPosition`
- `useBreakpoint`
- `useEstimate`
- `useLanguage`
- `useUpload`
- `useModal`

## Services

Contains external communication:

- API calls
- Future database
- Future CMS

Never put UI here.

## Actions

Contains:

- Server Actions
- Database writes
- Form submissions
- Authentication

## Lib

Contains shared libraries:

- Database
- Validators
- Helpers
- API clients
- Authentication

## Utils

Contains pure helper functions:

- Formatting
- Calculations
- Validation
- Parsing

Never place React code here.

## Constants

Contains static values:

- Routes
- Colors
- Animation settings
- Navigation
- Configuration

## Config

Contains project configuration:

- Site metadata
- SEO
- Theme
- Analytics
- Language

## Providers

React Providers only:

- Theme
- Language
- Future authentication
- Future query client

## Types

Contains global TypeScript types:

- Interfaces
- Enums
- API responses
- Shared models

## Data

Contains temporary local data:

- Mock content
- Placeholder services
- Dummy testimonials

Remove this data after CMS integration.

## Content

Contains:

- Markdown
- Future blog posts
- Legal pages
- Policies

## Locales

Contains translations.

Example:

```text
locales/
├── en.json
├── it.json
└── de.json
```

Future languages should be added here.

## Public

Contains:

- Images
- Icons
- Videos
- Fonts
- Logos

Static assets only.

## Styles

Contains:

- Global CSS
- Tailwind configuration
- Animations
- Variables

Never create page-specific styles.

## Middleware

Contains:

- Localization
- Authentication
- Future redirects
- Security

## File Size

- **Components:** Prefer under 250 lines
- **Hooks:** Prefer under 150 lines
- **Utilities:** Prefer under 100 lines

Split large files.

## Import Rules

Prefer absolute imports.

Avoid long relative paths.

Examples:

- `@/components`
- `@/features`
- `@/hooks`
- `@/lib`

## Naming Rules

- **Folders:** lowercase
- **Components:** PascalCase
- **Hooks:** camelCase
- **Types:** PascalCase
- **Constants:** UPPER_CASE when appropriate

## Future Modules

The architecture must support:

- Admin dashboard
- Customer dashboard
- Booking system
- Invoices
- Payments
- Notifications
- Authentication
- Analytics
- CRM
- CMS

These modules must be possible without major restructuring.

## Forbidden

- Do not place business logic inside UI components
- Do not create duplicate folders
- Do not mix utilities with services
- Do not store API logic inside components
- Do not create page-specific helper functions if they can be reused

## Final Principle

The project should remain understandable even after several hundred files.

Every developer should know where a file belongs without guessing.

Clean architecture is a feature, not an afterthought.
