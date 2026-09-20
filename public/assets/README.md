# Drop-in assets

The design export referenced these files but they were not included with the
handoff, so nothing here is committed yet. Every component already points at the
paths below — **drop the files in and they appear, no code change required.**

Until a file exists, `<Photo>` renders the design's reserved dashed frame at the
correct aspect ratio and names the missing path, so layouts never collapse and
no broken image is ever shown.

## Required

| Path | Size in export | Used by |
| --- | --- | --- |
| `perficient-logo.*` | 983 × 292 | Header and footer on every page |
| `perficient-chauffeur-hero.jpeg` | 1800 × 1202 | Home hero, About hero, Services gallery |
| `perficient-event-car.jpeg` | 1800 × 1263 | Home closing, About occasions, Contact hero |
| `perficient-luxury-suv.jpeg` | 1800 × 2658 | Fleet hero, Home showroom, Services gallery |
| `perficient-luxury-interior.jpeg` | 1800 × 1200 | Home experience, Fleet concierge |

The logo arrived in the handoff as `WhatsApp-Image-2026-09-15-at-14.38.32.jpeg`.
Rename it to `perficient-logo` and keep its own extension — `.svg`, `.png`,
`.webp`, `.jpeg` and `.jpg` are all picked up automatically, in that order of
preference. Do **not** rename a JPEG to `.png`; the server would then send the
wrong `Content-Type`.

SVG is worth chasing if the original artwork exists: the mark is flat colour
with hard edges, which JPEG artefacts badly at nav size.

Until a logo is present, the site renders a typographic lockup built from the
brand pin and type stack rather than a placeholder box.

## Optional — per-vehicle fleet photography

The fleet catalogue looks for one image per vehicle at:

```
/assets/fleet/<slugified-vehicle-name>.jpeg
```

For example:

```
assets/fleet/toyota-camry-2014-model.jpeg
assets/fleet/lexus-lx-570-2020-model.jpeg
assets/fleet/g-wagon-benz-2023.jpeg
```

The slug is the vehicle name lowercased with every run of non-alphanumeric
characters replaced by a single hyphen. Any vehicle without a file keeps the
reserved frame, so the fleet can be photographed incrementally.

Per the design guidance, these must be photographs of the **actual Perficient
vehicle** — never a manufacturer press shot or stock substitute — framed
three-quarter front at 4:3.

## Optional — client portraits

The homepage testimonials reserve a circular portrait slot beside each name:

```
/assets/testimonials/<testimonial-id>.jpeg
```

The ids come from `TESTIMONIALS` in `src/data/company.ts`:

```
assets/testimonials/obinna-nweke.jpeg
assets/testimonials/maybel-oluchi.jpeg
assets/testimonials/victor-kalu.jpeg
```

`.jpeg`, `.jpg`, `.png` and `.webp` all work. Square crops, 88px or larger.
Anyone without a photo shows their initials instead, and the slot keeps its
width either way so the row never reflows. Get written permission before
publishing a client's photograph.

## Image credits

The export credits Pexels photographers (Pavel Danilyuk, Harem, Saif allah
Dawoud, NUDE Nahum) for the editorial imagery, marked editorial use only. Those
credit lines are rendered in each page footer via `src/lib/assets.ts`. Update
them when the real photography replaces the placeholders.
