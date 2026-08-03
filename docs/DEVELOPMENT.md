# Development

This guide defines the day-to-day workflow for extending QUBO without breaking approved
product, design, accessibility, or engineering decisions.

## Source of truth

Before implementing a task, review the relevant numbered documents in the repository root. The
approved documents take precedence over this operational guide.

Permanent rules include:

- explain the implementation plan before changing code;
- preserve approved sections unless the task explicitly requests a redesign;
- use only approved technologies and dependencies;
- prefer reusable, typed, accessible components;
- run the Quality Assurance Checklist;
- finish every task with a Completion Report.

## Branch and review workflow

The approved branch model is:

- `main` — production-ready code;
- `develop` — integration branch;
- `feature/*` — one scoped feature;
- `hotfix/*` — urgent production correction.

Keep commits small and descriptive. Pull requests should include a summary, affected files, testing
performed, screenshots when UI changed, known limitations, and checklist confirmation.

## Daily workflow

1. Read the task and relevant project documents.
2. Inspect existing components and feature modules before creating anything new.
3. Explain the implementation plan.
4. Implement the smallest complete change.
5. Add or update behavior-focused tests.
6. Review desktop, tablet, and mobile behavior when UI is affected.
7. Run targeted tests during development.
8. Run `npm run check` before completion.
9. Produce a Completion Report.

## Application boundaries

- `app/` owns routes, layouts, metadata entry points, and route composition.
- `components/` owns reusable presentation and interaction primitives.
- `features/` owns domain validation, types, selectors, structured data, and preview submission logic.
- `constants/` owns static interface copy and configuration values.
- `data/` owns local content collections used before a CMS exists.
- `lib/` owns cross-feature libraries such as SEO helpers.
- `config/` owns validated runtime and site configuration.
- `hooks/` owns small reusable React hooks.
- `utils/` owns pure, framework-independent helpers.

Do not move business rules into route files or generic UI components.

## Server and client components

App Router pages and layouts are Server Components by default. Keep them on the server unless they
need browser state, effects, event handlers, or Framer Motion.

Use `"use client"` only at the smallest practical boundary. Current client components cover:

- navigation state and scrolling behavior;
- Framer Motion animation;
- modal, drawer, accordion, tabs, carousel, tooltip, and lightbox interaction;
- forms and upload preview;
- animated statistics.

Do not add client boundaries only to access static data or render markup.

## Components

- One component should have one responsibility.
- Prefer composition over large conditional components.
- Reuse existing primitives from `components/ui/`.
- Keep components below 250 lines where practical.
- Keep hooks below 150 lines and utilities below 100 lines where practical.
- Define explicit prop types.
- Avoid duplicated JSX and repeated class groups.
- Keep business-specific components out of `components/ui/`.

Component tests are colocated beside the component with the `.test.tsx` suffix.

## Styling and design tokens

Global styles enter through `app/globals.css`:

1. Tailwind CSS;
2. primitive and semantic CSS tokens from `styles/tokens.css`;
3. Tailwind theme mappings from `styles/theme.css`.

Use semantic utilities such as `bg-background-primary`, `text-text-secondary`, `border-divider`,
`rounded-xl`, and token-backed spacing. Do not introduce arbitrary colors, shadows, radii, timing,
or page-specific styles.

Responsive breakpoints are semantic:

- `mobile`: 30rem;
- `tablet`: 48rem;
- `laptop`: 64rem;
- `desktop`: 80rem;
- `wide`: 90rem;
- `ultrawide`: 120rem.

## Animation

Use Framer Motion for React animation and the shared presets in `constants/motion.ts`. Motion must:

- improve hierarchy or feedback;
- remain subtle and consistent;
- avoid unnecessary layout work;
- respect `prefers-reduced-motion`;
- preserve keyboard and screen-reader behavior.

## Forms and uploads

Estimate and contact forms use React Hook Form with Zod schemas in their feature directories. The
current submit functions simulate asynchronous preview behavior and do not transmit data.

When a real backend is introduced:

- validate again on the server;
- protect public endpoints with rate limiting;
- define retention and privacy behavior;
- never trust client validation;
- preserve loading, success, failure, and retry states;
- update privacy and legal content before collecting personal data.

Upload validation currently checks client-side file type, size, count, preview, and removal. Future
server storage must validate MIME type and size again, generate safe filenames, and prevent uploaded
files from becoming executable.

## Adding a page

1. Confirm the route belongs in `app/` and is part of the approved information architecture.
2. Compose the page from existing sections and layout primitives.
3. Use `PageWrapper`; the root layout already supplies Navbar and Footer.
4. Add unique metadata, canonical URL, Open Graph, Twitter data, and structured data where relevant.
5. Maintain one H1 and a logical heading hierarchy.
6. Add internal links and a clear conversion path.
7. Add route tests and accessibility assertions.
8. Update sitemap data if the route should be indexed.

## Adding a service

Service definitions live in `data/services.ts`. The dynamic service route uses static params and the
helpers in `features/services/`.

A new service requires:

- a unique slug and metadata;
- complete hero, benefits, problem, process, FAQ, area, and related-service content;
- a matching icon supported by `ServiceIcon`;
- internal links and structured data validation;
- updated tests and a production build.

Do not create a separate page component when the dynamic service template already supports the
content.

## Adding a service area

Local landing-page data lives in `data/serviceAreas.ts`. The dynamic route and structured-data
helpers live in `features/serviceAreas/`.

Every new area must contain unique local copy, metadata, nearby areas, benefits, and internal links.
Avoid copied city pages with only the place name replaced.

## Testing

Current automated tools:

- Vitest for unit and integration tests;
- React Testing Library for component behavior;
- axe-core for automated accessibility assertions;
- jsdom for the test environment.

Useful commands:

```bash
npm run test
npm run test:watch
npm run typecheck
npm run lint
npm run check
```

Playwright end-to-end tests, screenshot regression, and Lighthouse CI are approved future additions
but are not installed in Version 0.1. Do not document them as active gates until they exist.

## Definition of done

A task is complete only when applicable checks pass:

- requested behavior is complete;
- no temporary or debugging code remains;
- TypeScript, ESLint, formatting, tests, and production build pass;
- no unnecessary duplication or dependencies were introduced;
- responsive behavior has been reviewed;
- keyboard access, focus, semantics, labels, contrast, and reduced motion are preserved;
- metadata and structured data remain valid;
- no secrets or sensitive data are exposed;
- the Completion Report states files, QA status, limitations, and next step.
