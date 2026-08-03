# QUBO

Premium, conversion-focused website for a local home repair service operating in Friuli Venezia
Giulia, Italy.

The product presents one clear service model: customers describe several small household jobs,
and one local team coordinates the work through a single point of contact.

## Project status

- Version: `0.1.0`
- Framework: Next.js App Router
- Primary language: Italian (`it-IT`)
- Primary deployment platform: Vercel
- Production configuration: implemented
- Backend, CMS, analytics, monitoring, and real form delivery: not connected yet

The current estimate and contact forms validate user input and demonstrate loading, success, and
error states without transmitting or storing personal data. Gallery images, testimonials, and
social links are explicitly marked as illustrative or pending real client content.

## Technology

- Next.js 16
- React 19
- TypeScript in strict mode
- Tailwind CSS 4
- Framer Motion
- Lucide React
- React Hook Form
- Zod
- Vitest, React Testing Library, axe-core

Only dependencies approved by the project documents may be introduced.

## Quick start

Requirements:

- Node.js 22
- npm 10.9
- Git

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a complete local setup, including environment configuration, read
[Setup](docs/SETUP.md).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the previously generated production build |
| `npm run format` | Format supported files with Prettier |
| `npm run format:check` | Verify formatting without writing changes |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Apply safe ESLint fixes |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run test` | Run the complete Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run check` | Run formatting, linting, types, tests, and production build |

`npm run check` is the mandatory quality gate before a pull request, merge, or deployment.

## Public routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage and primary conversion journey |
| `/about` | Company approach and values |
| `/services` | Complete service overview |
| `/services/[slug]` | Static, SEO-ready service detail pages |
| `/zone-servite` | Service-area overview |
| `/zone-servite/[slug]` | Static local landing pages |
| `/gallery` | Before-and-after gallery experience |
| `/faq` | Frequently asked questions |
| `/contact` | Contact journey and preview form |
| `/privacy` | Pre-launch privacy information |
| `/cookie-policy` | Current cookie and tracking information |
| `/termini` | Website terms of use |
| `/sitemap.xml` | Generated XML sitemap |
| `/robots.txt` | Environment-aware crawler rules |

The application also generates Open Graph and Twitter images for the site and service routes.

## Documentation

- [Setup](docs/SETUP.md) — prerequisites, installation, environment, and troubleshooting
- [Development](docs/DEVELOPMENT.md) — workflow, coding rules, testing, and common changes
- [Deployment](docs/DEPLOYMENT.md) — Vercel, environments, releases, rollback, and operations
- [Folder structure](docs/FOLDER_STRUCTURE.md) — responsibility of every repository directory
- [Architecture](docs/ARCHITECTURE.md) — layers, data flow, server/client boundaries, SEO, and security

The numbered project documents `01` through `15` in the repository root are authoritative. This
README and the guides above explain the implemented repository; they do not replace or override
approved product decisions.

## Core engineering rules

- Preserve approved design and copy unless a task explicitly requests a change.
- Prefer Server Components and introduce client boundaries only for interaction or animation.
- Keep business rules in `features/`, reusable presentation in `components/`, and routing in `app/`.
- Use absolute imports through `@/`.
- Use design tokens instead of arbitrary visual values.
- Validate forms with Zod and React Hook Form.
- Maintain semantic HTML, keyboard access, focus visibility, and reduced-motion support.
- Never commit secrets, local environment files, production data, or generated build output.
- Run the complete Quality Assurance Checklist before completing a task.

## Production note

Production deployment requires the final public HTTPS origin:

```text
NEXT_PUBLIC_SITE_URL=https://your-real-domain.example
```

Vercel production builds fail early when this value is missing or insecure. Preview deployments
remain non-indexable and use their generated Vercel URL.

See [Deployment](docs/DEPLOYMENT.md) before publishing the site.
