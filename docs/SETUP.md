# Setup

This guide prepares a development machine for QUBO. It describes the repository as it
exists in Version 0.1 and does not require a database, CMS, or external API.

## Prerequisites

Install:

- Git
- Node.js 22
- npm 10.9

The supported runtime is declared in `.nvmrc`, `package.json`, and `package-lock.json`.

Verify the local tools:

```bash
node --version
npm --version
git --version
```

Node should report `v22.x`. The repository pins npm through the `packageManager` field.

## 1. Obtain the repository

Clone the repository and enter its root directory:

```bash
git clone <repository-url>
cd <repository-directory>
```

If the project is transferred as an archive, extract it into a normal development directory and
open a terminal at the directory containing `package.json`.

## 2. Select the Node version

With nvm on macOS or Linux:

```bash
nvm install
nvm use
```

With nvm-windows, install and select Node 22 using the equivalent nvm-windows commands. A direct
Node 22 installation is also supported.

## 3. Install locked dependencies

```bash
npm ci
```

Use `npm ci` for a predictable installation from `package-lock.json`. Do not replace it with a
different package manager or update dependencies as part of setup.

## 4. Configure the environment

Create a local environment file from the committed example.

macOS or Linux:

```bash
cp .env.example .env.local
```

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

For ordinary local development, set:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
```

`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` enables browser-side notification delivery through Web3Forms.
The public form identifier does not expose the verified recipient email. Every request is saved in
the application database before notification delivery is attempted.

Local development uses ignored files in `content/`. To test the production storage path locally,
also configure `DATABASE_URL` with a disposable PostgreSQL database.

Environment behavior:

| Environment       | Site URL source                                     | Search indexing |
| ----------------- | --------------------------------------------------- | --------------- |
| Local development | `NEXT_PUBLIC_SITE_URL` or `http://localhost:3000`   | Disabled        |
| Vercel Preview    | Generated `VERCEL_URL` unless explicitly overridden | Disabled        |
| Vercel Production | Required HTTPS `NEXT_PUBLIC_SITE_URL`               | Enabled         |

`VERCEL_ENV` and `VERCEL_URL` are Vercel system variables. Do not add them to `.env.local` for
normal development.

Only variables prefixed with `NEXT_PUBLIC_` are exposed to browser code. Never place secrets in a
public variable.

## 5. Start development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To use a different port temporarily:

```bash
npm run dev -- -p 3100
```

## 6. Verify the installation

Run the complete quality gate:

```bash
npm run check
```

This verifies formatting, ESLint, strict TypeScript, automated tests, accessibility assertions, and
the optimized Next.js build.

## Local production mode

Create and run an optimized local build:

```bash
npm run build
npm run start
```

Production mode defaults to port 3000. The local build remains non-indexable unless it is built in
an actual Vercel production environment with a valid public HTTPS origin.

## Environment safety

- `.env.local` and other `.env*` files are ignored by Git.
- `.env.example` is the only environment template that may be committed.
- Never commit database credentials, SMTP credentials, provider tokens, or analytics secrets.
- Production secrets belong in the hosting platform's encrypted environment settings.
- Restart the development server after changing environment variables.

## Troubleshooting

### Port already in use

Stop the process using the port or start Next.js on another port:

```bash
npm run dev -- -p 3100
```

### `npm ci` cannot replace an SWC file on Windows

A running Next.js process can lock the native SWC binary. Stop all local `next dev` and
`next start` processes, then run `npm ci` again.

### Build rejects `NEXT_PUBLIC_SITE_URL`

The value must be an origin only:

```text
https://example.com
```

Do not include a path, query, fragment, username, or password. Vercel Production requires HTTPS.

### Unexpected canonical URLs

Check `.env.local`, restart the server, and rebuild. Metadata is generated from the resolved site
origin in `config/env.ts` and `config/site.ts`.

## Next documents

- [Development workflow](DEVELOPMENT.md)
- [Deployment](DEPLOYMENT.md)
- [Folder structure](FOLDER_STRUCTURE.md)
- [Architecture](ARCHITECTURE.md)
