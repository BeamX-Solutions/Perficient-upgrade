import type { Metadata } from "next";
import Link from "next/link";

import { BookingButton } from "@/components/booking/BookingButton";
import { SegmentedDemo, ServiceCardDemo } from "@/components/design-system/Demos";
import { Brand } from "@/components/ui/Brand";
import { COMPANY } from "@/data/company";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "Perficient Logistics digital design system: foundations, components and booking patterns.",
  // Internal reference, not a marketing surface.
  robots: { index: false, follow: false },
};

const COLOURS = [
  { role: "Canvas", name: "Background", value: "oklch(97.8% 0.006 247)", swatch: styles.swatchBg },
  { role: "Raised", name: "Surface", value: "oklch(100% 0 0)", swatch: styles.swatchSurface },
  { role: "Primary", name: "Foreground", value: "oklch(18% 0.012 255)", swatch: styles.swatchFg },
  { role: "Secondary", name: "Muted", value: "oklch(52% 0.018 255)", swatch: styles.swatchMuted },
  { role: "Structure", name: "Border", value: "oklch(90.5% 0.015 247)", swatch: styles.swatchBorder },
  { role: "Action", name: "Perficient blue", value: "oklch(65.8% 0.178 253)", swatch: styles.swatchAccent },
];

const SPACING = [
  ["XS", 8],
  ["SM", 12],
  ["MD", 20],
  ["LG", 32],
  ["XL", 56],
  ["2XL", 96],
] as const;

export default function DesignSystemPage() {
  return (
    <div className={styles.page}>
      <header className={styles.topnav}>
        <div className={`container ${styles.navInner}`}>
          <Link className={styles.brand} href="/" aria-label={`${COMPANY.shortName} home`}>
            <Brand width={142} />
            <span className={styles.version}>DS 1.0</span>
          </Link>
          <nav className={styles.nav} aria-label="Design system sections">
            <a href="#foundations">Foundations</a>
            <a href="#components">Components</a>
            <a href="#patterns">Patterns</a>
            <a href="#guidance">Guidance</a>
          </nav>
          <Link className="btn btn-secondary" href="/">
            View live site
          </Link>
        </div>
      </header>

      <main id="content">
        {/* ---- Overview ---- */}
        <section className={`${styles.section} ${styles.hero}`} id="overview">
          <div className={`container ${styles.heroSplit}`}>
            <div>
              <p className="eyebrow">Perficient Logistics · Digital system</p>
              <h1>Premium movement, made effortless.</h1>
              <p className={`lead ${styles.heroLead}`}>
                A clear, calm interface language for presenting the fleet, explaining services and
                moving every visitor toward a confident booking request.
              </p>
            </div>
            <div>
              <div className={styles.heroRule} aria-hidden="true" />
              <div className={styles.principles}>
                {[
                  "Price and availability before persuasion",
                  "Photography carries the premium promise",
                  "Every path resolves to human follow-up",
                ].map((principle, index) => (
                  <div className={styles.principle} key={principle}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{principle}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---- Colour ---- */}
        <section className={styles.section} id="foundations">
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <p className="eyebrow">01 · Foundations</p>
                <h2>Colour with a clear job.</h2>
              </div>
              <p className="lead">
                Cool neutrals create a bright, trustworthy base. Perficient blue is reserved for
                orientation and high-intent actions, never decoration.
              </p>
            </div>

            <div className={styles.grid3}>
              {COLOURS.map((colour) => (
                <div className={`${styles.swatch} ${colour.swatch}`} key={colour.name}>
                  <span className="meta">{colour.role}</span>
                  <div>
                    <strong>{colour.name}</strong>
                    <code>{colour.value}</code>
                  </div>
                </div>
              ))}
            </div>

            <div className={`${styles.grid3} ${styles.stateRow}`}>
              <div className={`${styles.stateChip} ${styles.stateSuccess}`}>
                CONFIRMED / AVAILABLE
              </div>
              <div className={`${styles.stateChip} ${styles.stateWarning}`}>
                PENDING / ATTENTION
              </div>
              <div className={`${styles.stateChip} ${styles.stateDanger}`}>ERROR / UNAVAILABLE</div>
            </div>
          </div>
        </section>

        {/* ---- Typography ---- */}
        <section className={styles.section}>
          <div className={`container ${styles.grid12}`}>
            <div>
              <p className="eyebrow">Typography</p>
              <h2>Direct, modern, composed.</h2>
            </div>
            <div>
              <div className={styles.typeSample}>
                <div className={styles.typeMeta}>
                  <span>Display / 112</span>
                  <span>Avenir Next Condensed → Sora · Bold</span>
                </div>
                <div className={styles.displaySample}>Arrive with confidence.</div>
              </div>
              <div className={styles.typeSample}>
                <div className={styles.typeMeta}>
                  <span>Heading / 66</span>
                  <span>Avenir Next → Sora · Demi Bold</span>
                </div>
                <div className={styles.headingSample}>A fleet prepared for the occasion.</div>
              </div>
              <div className={styles.typeSample}>
                <div className={styles.typeMeta}>
                  <span>Body / 17</span>
                  <span>Helvetica Neue → Manrope · Regular</span>
                </div>
                <p className={styles.bodySample}>
                  Choose a vehicle, set your dates and tell us where the journey begins. The
                  Perficient team will call to confirm the details.
                </p>
              </div>
              <div className={styles.typeSample}>
                <div className={styles.typeMeta}>
                  <span>Mono / 13</span>
                  <span>SF Mono · Semibold</span>
                </div>
                <div className={styles.monoSample}>LAGOS · DAILY RATE · 08:30 WAT · NGN</div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Spacing ---- */}
        <section className={styles.section}>
          <div className={`container ${styles.grid12}`}>
            <div>
              <p className="eyebrow">Spacing &amp; shape</p>
              <h2>Room to breathe. Edges with intent.</h2>
              <p className={`lead ${styles.spacingLead}`}>
                An 8-point rhythm and selective clipped corners keep layouts ordered without feeling
                generic.
              </p>
            </div>
            <div>
              {SPACING.map(([label, size]) => (
                <div className={styles.spaceRow} key={label}>
                  <span className="meta">{label}</span>
                  <span
                    className={styles.spaceBar}
                    style={{ width: `${size}px` }}
                    aria-hidden="true"
                  />
                  <span className="num">{String(size).padStart(2, "0")} PX</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Components ---- */}
        <section className={styles.section} id="components">
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <p className="eyebrow">02 · Components</p>
                <h2>Familiar controls, refined.</h2>
              </div>
              <p className="lead">
                The component set stays compact, legible and direct. States change surface, border
                or position while preserving strong contrast.
              </p>
            </div>

            <div className={styles.grid2}>
              <article className={styles.card}>
                <span className="meta">Actions</span>
                <h3 className={styles.cardTitle}>Buttons</h3>
                <div className={styles.buttonSet}>
                  <BookingButton prefill={{ source: "design-system" }}>
                    Request booking
                  </BookingButton>
                  <Link className="btn btn-secondary" href="/fleet">
                    View fleet
                  </Link>
                  <button className="btn btn-ghost btn-arrow" type="button">
                    See details
                  </button>
                </div>
                <div className={styles.buttonSet}>
                  <button className="btn btn-primary" type="button" disabled>
                    Request booking
                  </button>
                  <span className="meta">Disabled</span>
                </div>
              </article>

              <article className={styles.card}>
                <span className="meta">Single choice</span>
                <h3 className={styles.cardTitle}>Service selector</h3>
                <SegmentedDemo />
                <p className={styles.help}>
                  Use three options maximum; selection is always explicit.
                </p>
              </article>

              <article className={styles.card}>
                <span className="meta">Data entry</span>
                <h3 className={styles.cardTitle}>Inputs</h3>
                <div className={styles.fieldStack}>
                  <div className="field">
                    <label htmlFor="ds-city">Pickup city</label>
                    <select className="input" id="ds-city" defaultValue="Lagos">
                      <option>Lagos</option>
                      <option>Abuja</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="ds-area">Area or landmark</label>
                    <input className="input" id="ds-area" placeholder="e.g. Victoria Island" />
                  </div>
                  <div className="field">
                    <label htmlFor="ds-notes">
                      Notes <span className="meta">Optional</span>
                    </label>
                    <textarea
                      className="textarea"
                      id="ds-notes"
                      placeholder="Occasion, guests or special requests"
                    />
                  </div>
                </div>
              </article>

              <article className={styles.card}>
                <span className="meta">Content labels</span>
                <h3 className={styles.cardTitle}>Tags &amp; status</h3>
                <div className={styles.tagRow}>
                  <span className="tag">Lagos</span>
                  <span className="tag">5 seats</span>
                  <span className="tag">Automatic</span>
                  <span className="tag">Driver available</span>
                </div>
                <p className={styles.help}>
                  Use tags for facts only. Availability belongs in a clear status message, not a
                  decorative badge.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ---- Service cards ---- */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.narrowHead}>
              <p className="eyebrow">Service cards</p>
              <h2>Start with the journey they have in mind.</h2>
            </div>
            <ServiceCardDemo />
          </div>
        </section>

        {/* ---- Patterns ---- */}
        <section className={styles.section} id="patterns">
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <p className="eyebrow">03 · Product patterns</p>
                <h2>Price, choice, then a human handoff.</h2>
              </div>
              <p className="lead">
                The fleet card and booking request work as one flow: visitors understand the daily
                rate, choose a service, then submit only enough detail for the team to follow up.
              </p>
            </div>

            <div className={styles.anatomyGrid}>
              {[
                {
                  step: "Anatomy / 01",
                  title: "Photography is evidence",
                  copy: "Every card uses a real image of the exact fleet vehicle in consistent framing. The fixed 4:3 media area makes future swaps predictable.",
                },
                {
                  step: "Anatomy / 02",
                  title: "Price is never hidden",
                  copy: "Daily rates sit beside the model name in tabular numerals. No invented example prices appear in the system.",
                },
                {
                  step: "Anatomy / 03",
                  title: "One next action",
                  copy: "“Book this car” carries the selected model into the booking request instead of starting a second checkout flow.",
                },
              ].map((item) => (
                <article className={styles.card} key={item.step}>
                  <span className="meta">{item.step}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.anatomyCopy}>{item.copy}</p>
                </article>
              ))}
            </div>

            <div className={styles.bookingShell}>
              <div className={styles.bookingCopy}>
                <p className="eyebrow">Booking request</p>
                <h2>Enough detail to start. No checkout theatre.</h2>
                <p className={`lead ${styles.bookingLead}`}>
                  Keep service, city, dates, name and phone required. Everything else helps the team
                  prepare the call.
                </p>
                <p className="meta">
                  Response expectation should be set by the operations team before launch.
                </p>
                <BookingButton
                  className={`btn btn-light ${styles.bookingAction}`}
                  prefill={{ source: "design-system-pattern" }}
                >
                  Open the live booking request
                </BookingButton>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Guidance ---- */}
        <section className={styles.section} id="guidance">
          <div className={`container ${styles.grid12}`}>
            <div>
              <p className="eyebrow">04 · Guidance</p>
              <h2>Trust is built in the details.</h2>
            </div>
            <div>
              {[
                {
                  rule: "Do show confirmed daily prices.",
                  copy: "Use “from” only when a real operational condition changes the rate.",
                },
                {
                  rule: "Do use the exact fleet vehicle.",
                  copy: "Keep framing, light and background treatment consistent across the grid.",
                },
                {
                  rule: "Do write for an assured handoff.",
                  copy: "Explain what happens after the request and avoid implying instant confirmation.",
                },
                {
                  rule: "Don’t over-brand the interface.",
                  copy: "One blue action and one small orientation cue per screen are enough.",
                },
              ].map((item) => (
                <div className={styles.doDont} key={item.rule}>
                  <strong>{item.rule}</strong>
                  <span>{item.copy}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.pagefoot}>
        <div className={`container ${styles.pagefootInner}`}>
          <span>{COMPANY.name} · Digital Design System</span>
          <span className="meta">Version 1.0 · Lagos / Abuja</span>
        </div>
      </footer>
    </div>
  );
}
