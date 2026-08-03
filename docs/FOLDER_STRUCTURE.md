# Folder structure

The repository is organized by responsibility. The numbered project documents remain in the root;
developer-facing operational guides live in `docs/`.

## Repository map

```text
.
|-- .github/workflows/    # Continuous integration
|-- actions/              # Reserved for future Server Actions
|-- app/                  # App Router routes, layout, metadata routes, route tests
|-- components/           # Reusable React presentation and interaction
|-- config/               # Validated environment and site configuration
|-- constants/            # Static UI copy, routes, motion, and configuration values
|-- content/              # Reserved for future Markdown, blog, and managed content
|-- data/                 # Local service, area, gallery, and testimonial datasets
|-- docs/                 # Developer setup, workflow, deployment, and architecture guides
|-- features/             # Domain validation, types, selectors, and submission behavior
|-- hooks/                # Reusable React hooks
|-- lib/                  # Cross-feature libraries, currently SEO
|-- locales/              # Reserved for future translations
|-- middleware/           # Reserved for future redirects, localization, or authentication
|-- providers/            # Reserved for future React providers
|-- public/               # Static images and public assets
|-- services/             # Reserved for future external API, database, or CMS clients
|-- styles/               # Design tokens and Tailwind theme mapping
|-- tests/                # Shared test setup
|-- types/                # Reserved for truly global shared TypeScript types
|-- utils/                # Pure framework-independent helpers
|-- README.md             # Project entry point
|-- next.config.ts        # Next.js performance and security configuration
|-- package.json          # Runtime, dependencies, and project commands
|-- vercel.json           # Vercel installation and quality-gate configuration
`-- 01..15 documents      # Authoritative approved project documentation
```

Empty reserved directories contain `.gitkeep` so the approved architecture remains visible before
their integrations are implemented.

## `app/`

`app/` contains route entry points and route-specific metadata composition.

```text
app/
|-- layout.tsx
|-- page.tsx
|-- not-found.tsx
|-- about/
|-- contact/
|-- cookie-policy/
|-- faq/
|-- gallery/
|-- privacy/
|-- services/
|   `-- [slug]/
|-- termini/
|-- zone-servite/
|   `-- [slug]/
|-- opengraph-image.tsx
|-- twitter-image.tsx
|-- robots.ts
`-- sitemap.ts
```

Rules:

- keep pages focused on composition;
- use `PageWrapper` for the page main element;
- rely on the root layout for Navbar and Footer;
- colocate route tests with the route;
- use dynamic templates for repeated service and area pages;
- keep reusable sections outside `app/`.

## `components/`

```text
components/
|-- animations/   # Reusable reveal behavior
|-- forms/        # Estimate, contact, and upload presentation
|-- icons/        # Shared icon selection and wrappers
|-- layout/       # Footer and page-level wrappers
|-- navigation/   # Navbar and brand navigation
|-- sections/     # Reusable page and homepage sections
|-- seo/          # JSON-LD and generated social image presentation
`-- ui/           # Business-agnostic design-system primitives
```

`components/ui/` must remain business-agnostic. A component that knows about services, estimates,
cities, or QUBO copy belongs in a section, form, or feature instead.

Tests are colocated, for example:

```text
Button.tsx
Accessibility.test.tsx
```

## `features/`

Feature modules contain domain behavior that should not live in generic UI:

```text
features/
|-- contact/       # Contact schema and preview submission
|-- estimate/      # Estimate schema and preview submission
|-- serviceAreas/  # Area lookup, types, related areas, structured data
|-- services/      # Service lookup, types, related services, structured data
`-- upload/        # Image-file validation
```

Each feature may expose a small public API through `index.ts`. Prefer importing from that public API
instead of reaching into internal files from unrelated modules.

## `constants/` and `data/`

Use `constants/` for stable labels, copy groups, route definitions, motion presets, and interface
configuration. Use `data/` for collections that represent content records and may later move to a
CMS or database.

Examples:

- `constants/hero.ts` — hero labels and copy;
- `constants/motion.ts` — shared Framer Motion configuration;
- `data/services.ts` — complete service records;
- `data/serviceAreas.ts` — local landing-page records;
- `data/gallery.ts` — illustrative gallery records.

Do not duplicate these values inside components.

## `config/`

- `env.ts` validates deployment variables and resolves the environment-aware origin.
- `site.ts` defines global identity, locale, region, social-image routes, and indexing state.

Configuration may depend on validated environment values. It must not contain secrets or UI logic.

## `lib/seo/`

The SEO library is split by responsibility:

- `metadata.ts` — root and page metadata;
- `structuredData.ts` — site and page schema graphs;
- `urls.ts` — absolute URLs and stable entity IDs;
- `serializeJsonLd.ts` — safe JSON-LD serialization;
- `lib/seo.ts` — public barrel export.

Service and service-area schema remains in the matching feature because it depends on domain types.

## `styles/`

- `tokens.css` defines primitive and semantic design tokens.
- `theme.css` exposes approved tokens to Tailwind CSS.
- `app/globals.css` imports Tailwind, tokens, and the theme.

Do not create route-specific stylesheets. Add a token only when it represents a reusable design
decision.

## `public/`

Static assets are grouped by purpose:

```text
public/images/
|-- hero/
`-- gallery/
```

Use descriptive names and modern formats. React images should use Next.js `Image` with dimensions,
responsive `sizes`, and lazy loading unless the image is a justified priority asset.

## Root configuration

| File                 | Responsibility                                          |
| -------------------- | ------------------------------------------------------- |
| `.env.example`       | Safe environment template                               |
| `.gitignore`         | Generated, local, secret, and editor exclusions         |
| `.nvmrc`             | Node 22 runtime selection                               |
| `eslint.config.mjs`  | ESLint and Next.js rules                                |
| `next.config.ts`     | Images, caching, security headers, and runtime behavior |
| `postcss.config.mjs` | Tailwind PostCSS integration                            |
| `tsconfig.json`      | Strict TypeScript and `@/` absolute imports             |
| `vercel.json`        | Vercel install and build commands                       |
| `vitest.config.mts`  | jsdom, aliases, and test setup                          |

## Placement guide

| New responsibility              | Destination            |
| ------------------------------- | ---------------------- |
| Public route                    | `app/<route>/`         |
| Reusable generic control        | `components/ui/`       |
| Reusable page section           | `components/sections/` |
| Form presentation               | `components/forms/`    |
| Domain validation or lookup     | `features/<feature>/`  |
| Reusable React state/effect     | `hooks/`               |
| Pure helper                     | `utils/`               |
| Cross-feature library           | `lib/`                 |
| External provider communication | `services/`            |
| Server mutation                 | `actions/`             |
| Static interface copy           | `constants/`           |
| CMS-like local records          | `data/`                |
| Public asset                    | `public/`              |
| Global design decision          | `styles/`              |
| Developer documentation         | `docs/`                |

Avoid deep nesting, duplicate folders, route-specific helpers that should be reusable, and React code
inside `utils/`.
