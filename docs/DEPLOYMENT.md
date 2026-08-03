# Deployment

Vercel is the primary hosting platform for QUBO. The repository also remains compatible
with a conventional Node.js deployment through `next build` and `next start`.

This guide prepares and verifies a release. It does not authorize publishing unfinished client
content or enabling data collection without the required privacy work.

## Environment model

| Environment | Purpose                            | Indexing | Data                                   |
| ----------- | ---------------------------------- | -------- | -------------------------------------- |
| Development | Local implementation and tests     | Disabled | Local and illustrative content         |
| Preview     | Pull request review and staging QA | Disabled | Production-like, non-sensitive content |
| Production  | Public stable release              | Enabled  | Approved real content only             |

Environment resolution is implemented in `config/env.ts`. Invalid production configuration fails
the build instead of silently generating incorrect metadata.

## Required production variable

Configure this variable in the Vercel **Production** environment:

```text
NEXT_PUBLIC_SITE_URL=https://your-public-domain.example
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
ADMIN_JWT_SECRET=a-random-secret-with-at-least-32-characters
CRON_SECRET=a-different-random-secret-with-at-least-32-characters
ADMIN_INITIAL_USERNAME=admin
ADMIN_INITIAL_PASSWORD=a-unique-strong-initial-password
```

Requirements:

- HTTPS is mandatory;
- provide the origin only;
- do not include a path, query, fragment, or credentials;
- use the canonical public domain that should appear in search results and structured data.
- configure the verified Web3Forms form key so contact and estimate submissions can be delivered.
- configure PostgreSQL so requests, admin users, settings, reviews, and media survive deployments;
- generate `ADMIN_JWT_SECRET` with a cryptographically secure password generator;
- generate a separate `CRON_SECRET` for the daily 12-month quote-retention task;
- rotate and remove `ADMIN_INITIAL_PASSWORD` after the first administrator has been created.

Vercel provides `VERCEL_ENV` and `VERCEL_URL`. Preview deployments use the generated deployment URL
and remain non-indexable. Do not manually create these system variables for normal deployments.

All database, admin, analytics, and provider credentials must be configured in encrypted hosting
settings and must never use the `NEXT_PUBLIC_` prefix unless the provider explicitly defines them
as public form identifiers, as Web3Forms does for its access key.

## Vercel configuration

`vercel.json` defines:

- Next.js framework detection;
- deterministic installation through `npm ci`;
- `npm run check` as the deployment build command.

The build command runs formatting verification, ESLint, TypeScript, the complete Vitest suite, and
the optimized Next.js build. A failure prevents deployment.

## First Vercel deployment

1. Push the repository to the approved Git provider.
2. Import the repository into Vercel.
3. Confirm the framework is detected as Next.js.
4. Keep the repository root as the project root.
5. Add every required variable from `.env.example` to the Production environment.
6. Connect the final domain and verify its DNS configuration.
7. Enable automatic exposure of Vercel system environment variables.
8. Deploy a Preview first.
9. Complete the release checklist below.
10. Promote or deploy the approved commit to Production.

Do not add build-output directories or edit files directly in Vercel.

## CI quality gate

`.github/workflows/ci.yml` runs on pushes and pull requests targeting `develop` or `main`.

The workflow:

1. checks out the repository with read-only content permission;
2. reads Node 22 from `.nvmrc`;
3. restores the npm cache;
4. installs `package-lock.json` with `npm ci`;
5. runs `npm run check`;
6. cancels outdated runs for the same branch.

Protect `main` and require the quality-gate job to pass before merge. Vercel deployment and GitHub
CI intentionally run the same project command.

## Production optimizations

`next.config.ts` provides:

- response compression;
- AVIF and WebP image negotiation;
- a one-day minimum cache for optimized images;
- cache and stale-while-revalidate headers for public image sources;
- disabled browser source maps in production;
- React strict mode;
- removal of the `X-Powered-By` header;
- Content Security Policy, frame protection, MIME protection, Referrer Policy, Permissions Policy,
  and HSTS.

Next.js automatically produces hashed framework assets and route-level code splitting. Do not add a
custom CDN, image loader, or bundler without a measured requirement.

## Release checklist

### Code and build

- [ ] `npm ci` succeeds from a clean dependency directory.
- [ ] `npm run check` succeeds.
- [ ] No production dependency vulnerabilities are reported.
- [ ] No debug logs, TODOs, temporary code, or secrets are present.
- [ ] The deployment commit is reviewed and traceable.

### Product and content

- [ ] Navigation, links, forms, upload preview, FAQ, carousel, and lightbox are verified.
- [ ] Desktop, tablet, mobile, and wide layouts are reviewed.
- [ ] Real gallery images and approved testimonials replace illustrative content.
- [ ] Social links point to real approved accounts.
- [ ] Business contact information and service availability are accurate.
- [ ] Privacy, cookie, and terms content receive final business/legal review.

### SEO and accessibility

- [ ] The public domain appears in canonical tags, Open Graph, structured data, sitemap, and robots.
- [ ] Production robots allow indexing; Preview robots disallow it.
- [ ] Every route has one H1, unique metadata, and a logical heading order.
- [ ] Keyboard navigation, focus visibility, labels, alternative text, contrast, and reduced motion
      are reviewed.
- [ ] Lighthouse targets are checked on the deployed production candidate.

### Operations

- [ ] HTTPS and certificate provisioning are complete.
- [ ] Availability and error monitoring are configured.
- [ ] Analytics is enabled only after consent and privacy requirements are satisfied.
- [ ] The rollback owner and previous stable deployment are identified.
- [ ] Domain and hosting access are available to more than one authorized owner.

## Runtime verification

After deployment, verify at minimum:

```bash
curl -I https://your-public-domain.example/
curl https://your-public-domain.example/robots.txt
curl https://your-public-domain.example/sitemap.xml
```

Confirm:

- HTTP 200 for public pages;
- HTTP 404 for an unknown path;
- HTTPS canonical URLs;
- production `index, follow` metadata;
- CSP, HSTS, frame protection, MIME protection, Referrer Policy, and Permissions Policy;
- optimized image responses and cache headers;
- no browser console errors.

Also manually test the primary conversion journey from the homepage through estimate and contact
forms. Confirm that a submitted quote appears in the admin panel after a fresh deployment.

## Preview and staging behavior

Every non-production branch should receive a Vercel Preview deployment. Preview URLs are suitable
for client review and QA, but must not be indexed or used as canonical public links.

Use Preview to verify:

- real browser rendering;
- responsive layouts;
- metadata and structured data shape;
- animations and reduced motion;
- security headers;
- image optimization;
- client-approved content.

## Rollback

If a critical issue appears:

1. stop promotion or mark the release unhealthy;
2. use Vercel deployment history to restore the previous stable deployment;
3. document the affected route, environment, and symptoms;
4. fix the issue in source control;
5. add a regression test when applicable;
6. pass CI and Preview QA again;
7. redeploy normally.

Never patch production files manually.

## Monitoring and analytics

No monitoring or analytics provider is currently installed. Sentry, OpenTelemetry, Google
Analytics, Search Console, Microsoft Clarity, and similar tools remain future integrations.

Before enabling any provider:

- review its security and privacy terms;
- identify data collected and retention period;
- update CSP only for required origins;
- implement consent before non-essential cookies or tracking;
- update privacy and cookie documentation;
- verify that secrets remain server-only.

Production operations should eventually monitor availability, server errors, failed requests, LCP,
INP, CLS, response time, bundle size, and image performance.

## Self-hosting

The standard portable flow is:

```bash
npm ci
npm run check
npm run start
```

Place an HTTPS reverse proxy or CDN in front of the Node.js server, forward the `Accept` header for
image negotiation, configure the same environment variables, and preserve security headers. A
single-instance server may use an absolute persistent `CONTENT_STORAGE_DIR` instead of
`DATABASE_URL`; PostgreSQL remains required for multi-instance or serverless deployments.
