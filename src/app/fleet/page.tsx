import type { Metadata } from "next";

import { BookingButton } from "@/components/booking/BookingButton";
import { FleetCatalogue } from "@/components/fleet/FleetCatalogue";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Brand } from "@/components/ui/Brand";
import { Photo } from "@/components/ui/Photo";
import {
  ADD_ONS,
  CANCELLATION,
  COMPANY,
  HIRE_TERMS,
  SERVICE_RATES,
  telHref,
} from "@/data/company";
import { FLEET, FLEET_FROM_PRICE, FLEET_SIZE } from "@/data/fleet";
import { PHOTOS } from "@/lib/assets";
import { money, slug, splitEmphasis } from "@/lib/format";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Fleet & day rates",
  description: `Browse all ${FLEET_SIZE} chauffeured vehicles, day rates and hire terms from ${COMPANY.name}.`,
};

/**
 * One photograph per vehicle, resolved on the server.
 *
 * Each vehicle looks for /assets/fleet/<slug>.jpeg and falls back to the
 * reserved frame, so the fleet can be photographed incrementally.
 */
function fleetMedia() {
  return Object.fromEntries(
    FLEET.map((vehicle) => [
      vehicle.name,
      <Photo
        key={vehicle.name}
        photo={{
          src: `/assets/fleet/${slug(vehicle.name)}.jpeg`,
          width: 1600,
          height: 1200,
          alt: vehicle.name,
        }}
        placeholder={`Actual ${vehicle.name} photo pending`}
        sizes="(max-width: 600px) 100vw, (max-width: 1120px) 50vw, 33vw"
      />,
    ]),
  );
}

export default function FleetPage() {
  return (
    <>
      <SiteHeader variant="onDark" brand={<Brand width={140} />} />

      <main id="content" className={styles.page}>
        {/* ---- Hero: the photograph runs under the fixed nav ---- */}
        <section className={styles.hero}>
          <div className={styles.heroMedia} aria-hidden="true">
            <Photo photo={PHOTOS.luxurySuv} alt="" priority sizes="100vw" />
          </div>

          <div className={`container ${styles.heroContent}`}>
            <div>
              <p className="eyebrow">
                {FLEET_SIZE} chauffeured vehicles · 4 classes
              </p>
              <h1>A fleet for every kind of arrival.</h1>
              <p className={`lead ${styles.heroLead}`}>
                Compare every confirmed day rate, choose the vehicle that fits and send a request to
                our 24-hour concierge.
              </p>
            </div>
            <div className={styles.heroNote}>
              <strong>Driver and fuel included.</strong>
              <span>
                Every vehicle is chauffeur-driven. Hire windows run for 10 or 12 hours and day hire
                ends at 9:00 pm.
              </span>
            </div>
          </div>
        </section>

        {/* ---- Facts ---- */}
        <section className={styles.facts}>
          <div className={`container ${styles.factGrid}`}>
            <div className={styles.fact}>
              <span className="meta">Fleet</span>
              <span className={`${styles.factValue} num`}>{FLEET_SIZE} vehicles</span>
              <span className={styles.factSmall}>Across four classes</span>
            </div>
            <div className={styles.fact}>
              <span className="meta">Day rates from</span>
              <span className={`${styles.factValue} num`}>{money(FLEET_FROM_PRICE)}</span>
              <span className={styles.factSmall}>Driver and fuel included</span>
            </div>
            <div className={styles.fact}>
              <span className="meta">Coverage</span>
              <span className={styles.factValue}>{COMPANY.cities}</span>
              <span className={styles.factSmall}>Interstate priced separately</span>
            </div>
            <div className={styles.fact}>
              <span className="meta">Concierge</span>
              <span className={`${styles.factValue} num`}>24 hours</span>
              <span className={styles.factSmall}>Bookings and enquiries</span>
            </div>
          </div>
        </section>

        {/* ---- Catalogue ---- */}
        <section className="section" id="fleet">
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <p className="eyebrow">The full fleet</p>
                <h2>Choose by class, model or day rate.</h2>
              </div>
              <div>
                <p className="lead">
                  All rates are per day in Nigerian Naira and include a Perficient chauffeur and
                  fuel. Interstate travel is priced separately.
                </p>
                <p className={styles.notice}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 10v6m0-9h.01" />
                  </svg>
                  <span>
                    Exact fleet photography has not been supplied. Every image area is reserved for
                    the real Perficient vehicle, never a manufacturer or stock substitute.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <FleetCatalogue media={fleetMedia()} />
        </section>

        {/* ---- Rates by service ---- */}
        <section className={`section ${styles.rates}`} id="rates">
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <p className="eyebrow">Rates by service</p>
                <h2>Start with the service. Finalise with the car.</h2>
              </div>
              <p className="lead">
                Each service starts at the day rate of the least expensive vehicle it uses. Your
                final figure depends on the model selected.
              </p>
            </div>

            <div className={styles.ratesGrid}>
              <table className={styles.rateTable}>
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col">Starting from</th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICE_RATES.map((rate) => (
                    <tr key={rate.service}>
                      <td>{rate.service}</td>
                      <td>{money(rate.from)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <aside className={styles.addOns}>
                <span className="meta">Additional services</span>
                {ADD_ONS.map((addOn) => (
                  <div className={styles.addOn} key={addOn.label}>
                    <span>{addOn.label}</span>
                    <strong>{addOn.price}</strong>
                  </div>
                ))}
                <p className={styles.ratesNote}>
                  Interstate travel is priced above the standard day rate according to destination,
                  vehicle model and model year.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* ---- Terms ---- */}
        <section className="section" id="terms">
          <div className={`container ${styles.termsLayout}`}>
            <div className={styles.termsNav}>
              <p className="eyebrow">Before you book</p>
              <h2>Clear terms. No surprises.</h2>
              <p className={`lead ${styles.termsLead}`}>
                The confirmed rate at the time of booking is the rate that applies.
              </p>
            </div>

            <div>
              <article className={styles.termBlock} id={HIRE_TERMS[0].id}>
                <h3>{HIRE_TERMS[0].title}</h3>
                <ol className={styles.numberList}>
                  {HIRE_TERMS[0].items.map((item) => (
                    <li key={item}>
                      {splitEmphasis(item).map((part, index) =>
                        part.strong ? <strong key={index}>{part.text}</strong> : <span key={index}>{part.text}</span>,
                      )}
                    </li>
                  ))}
                </ol>
              </article>

              <article className={styles.termBlock} id="cancellation-policy">
                <h3>Cancellation policy</h3>
                <div className={styles.cancellationGrid}>
                  {CANCELLATION.map((charge) => (
                    <div className={styles.charge} key={charge.percent}>
                      <span className={`${styles.percent} num`}>{charge.percent}</span>
                      <p>{charge.copy}</p>
                    </div>
                  ))}
                </div>
                <p className={styles.policyNote}>
                  No refund is issued after cancellation. To change a booking, contact the concierge
                  line as early as possible and the team will move it where the fleet allows.
                </p>
              </article>

              <article className={styles.termBlock} id={HIRE_TERMS[1].id}>
                <h3>{HIRE_TERMS[1].title}</h3>
                <ol className={styles.numberList}>
                  {HIRE_TERMS[1].items.map((item) => (
                    <li key={item}>
                      {splitEmphasis(item).map((part, index) =>
                        part.strong ? <strong key={index}>{part.text}</strong> : <span key={index}>{part.text}</span>,
                      )}
                    </li>
                  ))}
                </ol>
              </article>
            </div>
          </div>
        </section>

        {/* ---- Concierge ---- */}
        <section className={styles.contact} id="contact">
          <div className={styles.contactMedia} aria-hidden="true">
            <Photo photo={PHOTOS.luxuryInterior} alt="" sizes="100vw" />
          </div>
          <div className={`container ${styles.contactContent}`}>
            <div>
              <p className="eyebrow">Ahead and ready</p>
              <h2>Speak with the concierge.</h2>
              <p className={`lead ${styles.contactLead}`}>
                Choose a vehicle or tell us what the journey requires. The team is open 24 hours to
                confirm availability and your final rate.
              </p>
              <div className={styles.contactActions}>
                <BookingButton prefill={{ source: "fleet-concierge" }}>
                  Request a vehicle
                </BookingButton>
                <a
                  className="btn btn-outline-light"
                  href={telHref(COMPANY.phones.bookings[0])}
                >
                  Call bookings
                </a>
              </div>
            </div>

            <div className={styles.contactList}>
              <div className={styles.contactRow}>
                <span>Bookings</span>
                <div>
                  {COMPANY.phones.bookings.map((phone, index) => (
                    <span key={phone}>
                      {index > 0 ? " / " : null}
                      <a href={telHref(phone)}>{phone}</a>
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.contactRow}>
                <span>General enquiries</span>
                <a href={telHref(COMPANY.phones.enquiries[0])}>{COMPANY.phones.enquiries[0]}</a>
              </div>
              <div className={styles.contactRow}>
                <span>Email</span>
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </div>
              <div className={styles.contactRow}>
                <span>Office</span>
                <strong>{COMPANY.office}</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
