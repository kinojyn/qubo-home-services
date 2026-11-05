# Advertising landing page

`/pubblicita` is an isolated Italian advertising page for Facebook and Instagram traffic.
The homepage, `/contatti`, shared navigation components, global tokens, domain configuration
and deployment workflow are unchanged. `SiteChrome` only omits the existing site shell on
this exact route. The landing uses its own scoped CSS module, the existing logo, and QUBO's
spacing, typography, motion and accessibility tokens. Cookie preferences and Vercel Analytics
continue to use the root providers. No dependencies were added.

The page uses a 3.4 KB favicon derived from the existing QUBO logo, and does not load the
site's installable-app manifest. Both overrides apply only to this route and avoid downloading
the original 445 KB logo for browser icons. The hero logo is served by Next.js image optimization.

## Search and links

- Title: `QUBO | Piccoli Lavori e Preventivi`.
- Canonical: `https://quboservice.com/pubblicita`.
- Robots: `noindex, follow`; intentionally excluded from the sitemap and main navigation.
- WhatsApp uses the approved `wa.me` number and message, in a new tab with `noopener noreferrer`.
- The secondary action opens the public homepage in the same tab.

The primary links work in server-rendered HTML before JavaScript runs.
The installed WhatsApp app or WhatsApp Web handles `wa.me` according to device/browser settings.
Emulation can verify the outbound URL and tab behavior; opening the native app still requires
a real iPhone/Android device, including the Facebook/Instagram in-app browsers.

## Analytics and consent

The existing `@vercel/analytics` installation receives `whatsapp_click` and `website_click`
only after analytics consent. Custom properties contain only the fixed page `/pubblicita`.
No message, contact information, query string or click identifier is included in the custom
event properties. An outbound WhatsApp click is not reported as a confirmed lead or sale.

No Meta Pixel installation was found in the existing source. The page does not load or initialize
a Pixel. If the existing site integration later exposes `window.fbq`, marketing consent allows
the same named custom click events and standard `Contact` on WhatsApp clicks. No `Lead` or
`Purchase` event is emitted. Existing consent preferences apply independently to both providers.

The inline footer notice offers accept/reject and opens the existing cookie preferences modal.
The global banner remains unchanged on all other routes. Analytics stays off until opt-in;
the outbound actions always work, including after rejection or provider errors.

## Campaign attribution

The existing Vercel Analytics pageview integration handles campaign attribution after consent.
The landing leaves the incoming URL intact for that integration. Custom click events intentionally
have fixed properties; use Vercel's campaign/page filters to inspect attributed traffic.

The website destination also preserves `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`
and `utm_term`. Because WhatsApp does not consume UTM parameters, approved campaign labels are
appended to the editable message as `Riferimento campagna: …`.

Use campaign codes containing ASCII letters, digits, `_` and `-`, with at most 100 characters
per value. Other labels and unrelated parameters are dropped from outbound links. Never put
personal data into campaign labels. No campaign data is stored in cookies or browser storage.

Example:

```text
/pubblicita?utm_source=instagram&utm_medium=paid_social&utm_campaign=casa_2026&utm_content=reel_01
```

## Release verification

Run the existing `npm run check` gate. Review mobile widths from 320 px, keyboard navigation,
reduced motion, consent accepted/rejected, both outbound destinations, and the unmodified
homepage. No domain or Vercel settings changes are needed. Production deployment requires the
owner's explicit confirmation for this task. After the confirmed deployment, repeat the route,
metadata, browser console, and outbound-link checks on `https://quboservice.com/pubblicita`.

## Verification completed on 5 November 2026

- `npm run check` passed: formatting, ESLint, TypeScript, 53 test files / 168 tests,
  optimized production build and the existing API smoke test. The final image/metadata/motion
  optimizations also passed a fresh production build and formatting verification.
- Production route returned HTTP 200. Exact title, description, canonical and `noindex, follow`
  were checked in the browser. No JavaScript or browser console errors were found.
- Chromium viewport checks passed at 320, 360, 375, 390, 412, 768 and 1440 px.
  No horizontal overflow; both primary actions fit at 320 × 568 and the larger mobile sizes.
- Keyboard order, visible focus, reduced motion and the existing cookie preferences modal passed.
  Axe found no WCAG A/AA violations, including color contrast, in the production browser.
- Both primary destinations remain present and usable in server-rendered HTML with JavaScript off.
- Browser checks verified the WhatsApp new-tab destination and the website same-tab destination,
  including campaign labels. Outbound network destinations were intercepted for these checks.
- Both named click events reached the existing analytics SDK with exactly `{ page: "/pubblicita" }`.
  No events were dispatched before consent or after rejection. Optional existing-Pixel behavior
  was checked using a stub; no real Pixel or second analytics instance was installed.
- The homepage body matched the captured pre-change DOM after excluding framework scripts,
  comments and generated React IDs. `/`, `/contact` and `/services` returned HTTP 200.
- This checkout has no `/contatti` page: it returns HTTP 404. That route was neither created nor
  changed by this work. The originally requested `/contatti` implementation was superseded by
  the owner's advertising-page brief before any code was written.
- Final local mobile Lighthouse: Performance **100**, Accessibility **100**, Best Practices **100**;
  LCP **0.9 s**, TBT **10 ms**, CLS **0**. SEO was **69** because indexing is intentionally disabled
  and the local environment's robots file blocks crawling. Keep the requested `noindex, follow`.

These are local lab checks, not measurements from deployed visitors. Native WhatsApp handoff
on physical iPhone/Android devices and inside Facebook/Instagram browsers, analytics ingestion
on Vercel, and verification of the public URL remain post-deployment checks. At the time this
preparation report was written, no production deployment, Git push, domain change or Vercel
configuration change had been performed. The owner subsequently authorized publication through
the existing Git-to-Vercel production workflow.

## Changed files

Modified existing file:

- `app/layout.tsx` — isolates existing shell elements on the advertising route only.

Added files:

- `app/pubblicita/page.tsx` — route and page metadata.
- `components/layout/SiteChrome.tsx` — exact-route shell isolation.
- `components/layout/SiteChrome.test.tsx` — preservation of all other route shells.
- `components/advertising/AdvertisingLanding.tsx` — semantic page content.
- `components/advertising/AdvertisingLanding.module.css` — scoped theme and responsive layout.
- `components/advertising/AdvertisingActions.tsx` — outbound actions and click tracking.
- `components/advertising/AdvertisingConsent.tsx` — inline consent using the existing provider.
- `features/advertising/analytics.ts` — consent-gated events and optional existing Pixel.
- `features/advertising/analytics.test.ts` — consent, event payloads and provider-failure tests.
- `features/advertising/attribution.ts` — bounded campaign labels and outbound destinations.
- `features/advertising/attribution.test.ts` — destination and campaign-filtering tests.
- `public/images/advertising/qubo-icon.png` — optimized icon derived from the existing logo.
- `docs/ADVERTISING_LANDING.md` — implementation, verification and release notes.
