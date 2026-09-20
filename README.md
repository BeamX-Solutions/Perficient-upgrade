# Perficient Logistics

Production site for Perficient Logistics Limited — chauffeur-driven car hire in
Lagos, Abuja and interstate. Built from the OpenDesign export in
`DESIGN-HANDOFF.md` / `DESIGN-MANIFEST.json`.

Next.js 15 (App Router) · React 19 · TypeScript · CSS Modules.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000 (Turbopack)
npm run dev:webpack  # fallback if Turbopack misbehaves
```

### Don't judge speed by the dev server

`next dev` compiles each route the first time you visit it, so navigation feels
slow while developing. That is not what visitors get. Measured on this project:

| Route | `next dev` (cold) | `next start` (production) |
| --- | --- | --- |
| `/` | ~1.0s | **0.04s** |
| `/fleet` | ~0.9s | **0.01s** |
| `/about` | ~11.1s | **0.01s** |
| `/contact` | ~0.5s | **0.01s** |

Every route is prerendered to static HTML at build time (`○ (Static)` in the
build output), and `<Link>` prefetches them, so real navigation is instant. To
see what users will actually experience:

```bash
NEXT_DIST_DIR=.next-prod npm run build
NEXT_DIST_DIR=.next-prod npm start
```

```bash
npm run build        # production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
```

Running `next build` while `next dev` is up corrupts the shared `.next` cache
and the dev server starts throwing `Cannot find module './###.js'`. Build to a
separate directory instead:

```bash
NEXT_DIST_DIR=.next-prod npm run build
NEXT_DIST_DIR=.next-prod npm start
```

If a dev server has already been clobbered, restart it — it rebuilds the cache.

## Routes

| Route | Source screen | Notes |
| --- | --- | --- |
| `/` | `perficient-logistics-homepage-v3.html` | Cinematic hero, quick-booking dock, service gallery, showroom |
| `/fleet` | `perficient-logistics-fleet.html` | 30-vehicle catalogue with search, class filter, sort; rates; hire terms |
| `/about` | `perficient-logistics-about.html` | |
| `/contact` | `perficient-logistics-contact.html` | Inline booking form with day-rate estimator |
| `/design-system` | `perficient-design-system.html` | Internal reference, `noindex` |

The `v1` and `v2` homepage concepts from the export were dropped by decision;
`v3` is the live homepage and is the one every other exported screen linked to.

## Architecture

```
src/
  app/
    globals.css          Frozen design tokens + shared primitives
    actions.ts           Server Action: every booking request posts here
    layout.tsx           Fonts, metadata, BookingProvider
    page.tsx             Home
    fleet|about|contact|design-system/
  components/
    booking/             Provider, dialog, contact form, estimator
    fleet/               Catalogue (search, filter, sort, empty state)
    home/                Quick-booking dock, service gallery, showroom
    layout/              Header (two variants), footer
    ui/                  Brand lockup, Photo with reserved-frame fallback
    design-system/       Live specimens for the reference page
  data/
    fleet.ts             The 30 vehicles, categories, rates
    company.ts           Contact routes, services, terms, testimonials
  lib/
    format.ts            money(), hireDays(), slug()
    assets.ts            Photography paths + credits
```

### Design tokens

`src/app/globals.css` holds the token table extracted from the export before any
component was written — colours in `oklch`, the fluid type scale, the 8-point
spacing rhythm, radii, shadow and motion. Nothing hard-codes a colour or font.

Screens that ran a different scale in the export (the fleet page's tighter
rhythm, the design system's 1180px documentation measure) override the tokens on
their own root element rather than forking the stylesheet.

### Typography

The export renders in Avenir Next Condensed / Helvetica Neue, which exist only
on macOS. Those stay first in the stack, with webfont stand-ins behind them:
**Barlow Semi Condensed** for display and **Inter** for body.

The display face must stay **condensed**. The heading scale (h1 to 112px, h2 to
66px) was drawn against a face roughly 85% the width of a normal grotesque —
substitute a normal-width font and every headline reads oversized and the
layout looks "maximized". `brand-spec.md` nominates Sora and Manrope, but both
are normal-width and break these proportions; `DESIGN-HANDOFF.md` is explicit
that where choices conflict, the exported pixels win.

### Booking

Every booking surface — nav, hero, service captions, vehicle cards, the closing
CTA, the fleet concierge panel — opens one dialog, hoisted into
`BookingProvider` at the root. Controls pass a prefill, so a visitor who clicks
"Book this vehicle" on a Range Rover lands in the form with that vehicle and its
day rate already selected.

The export shipped three separate implementations of this (a homepage dialog, a
fleet dialog and the contact form); the first two are now one component. The
contact page keeps its own inline form because it asks for a hire *length*
rather than a return date.

Submissions post to `submitBookingRequest` in `src/app/actions.ts`, which
validates and normalises, then **logs the request**. The single marked
`DELIVERY HOOK` comment is where the real destination goes — email to the
bookings inbox, a WhatsApp Business message, or a CRM row. Everything upstream
of that line is finished.

### Pricing

Rates live once, in `src/data/fleet.ts`, and flow to the catalogue, the
estimator and the booking form. No rate is ever invented or rounded: the
estimator only multiplies a listed day rate by a number of days, and always
states that airport, escort, interstate, overtime and night-hire charges are
confirmed separately.

## Photography

**The image assets were not included in the handoff.** See
[`public/assets/README.md`](public/assets/README.md) for the exact filenames to
drop in. Until a file exists, `<Photo>` renders the design's reserved dashed
frame at the correct aspect ratio and names the missing path — layouts hold
their shape and no broken image is ever shown. Existence is checked on the
server at render time, so there is no placeholder request and no client JS.

The fleet catalogue additionally looks for one photo per vehicle under
`/assets/fleet/<slug>.jpeg`, so the fleet can be photographed incrementally.

## Responsive contract

Built against the handoff's viewport matrix — 360, 390, 430, 600, 820, 1024,
1366, 1440 and 1920 — using fluid `clamp()` type and spacing and the export's
semantic breakpoints (1120 / 820–900 / 600–640). `overflow-x: hidden` on `body`
plus `minmax(0, 1fr)` grid tracks keep every breakpoint free of horizontal
scroll.

## Accessibility

Headings stay hierarchical, every control is a real `button`, `a` or `input`,
focus rings are visible and token-driven, the filter and service tabs expose
`aria-pressed` / `aria-selected`, estimates and result counts are in
`aria-live` regions, and validation errors are wired to their field with
`aria-describedby`. `prefers-reduced-motion` disables transitions and smooth
scrolling.
