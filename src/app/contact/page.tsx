import type { Metadata } from "next";

import { ContactBookingForm } from "@/components/booking/ContactBookingForm";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Brand } from "@/components/ui/Brand";
import { Photo } from "@/components/ui/Photo";
import { COMPANY, telHref } from "@/data/company";
import { PHOTOS } from "@/lib/assets";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Contact ${COMPANY.name} for chauffeur-driven car hire in Lagos, Abuja and interstate.`,
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader
        variant="onDark"
        brand={<Brand width={140} />}
        action={{ href: "#booking", label: "Request a booking" }}
      />

      <main id="content">
        {/* ---- Hero: the photograph runs under the fixed nav ---- */}
        <section className={styles.hero}>
          <div className={styles.heroMedia} aria-hidden="true">
            <Photo photo={PHOTOS.eventCar} alt="" priority sizes="100vw" />
          </div>

          <div className={`container ${styles.heroCopy}`}>
            <p className="eyebrow">Contact us</p>
            <h1>Tell us where you need to be.</h1>
            <p className={`lead ${styles.heroLead}`}>
              Share your journey, dates and preferred vehicle. Our concierge team is open 24 hours
              to confirm availability and the final rate.
            </p>
          </div>
        </section>

        {/* ---- Booking + contact routes ---- */}
        <section className="section" id="booking">
          <div className={`container ${styles.grid}`}>
            <aside className={styles.panel}>
              <p className="eyebrow">Speak with Perficient</p>
              <h2 className={styles.panelHeading}>Direct help, when you need it.</h2>
              <p className={`lead ${styles.panelLead}`}>
                Call for a quick answer or send a booking request with the essentials.
              </p>

              <div className={styles.contactList}>
                <div className={styles.contactRow}>
                  <span>Bookings</span>
                  <div>
                    {COMPANY.phones.bookings.map((phone) => (
                      <a key={phone} href={telHref(phone)}>
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
                <div className={styles.contactRow}>
                  <span>General enquiries</span>
                  <div>
                    <a href={telHref(COMPANY.phones.enquiries[0])}>{COMPANY.phones.enquiries[0]}</a>
                  </div>
                </div>
                <div className={styles.contactRow}>
                  <span>Email</span>
                  <div>
                    <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                  </div>
                </div>
                <div className={styles.contactRow}>
                  <span>Office</span>
                  <div>
                    <strong>{COMPANY.office}</strong>
                  </div>
                </div>
              </div>
            </aside>

            <ContactBookingForm />
          </div>
        </section>

        {/* ---- Availability ---- */}
        <section className={`section ${styles.availability}`}>
          <div className={`container ${styles.availabilityGrid}`}>
            <div>
              <p className="eyebrow">Ahead and ready</p>
              <h2 className={styles.availabilityHeading}>Concierge support, around the clock.</h2>
            </div>
            <div>
              <p className={`lead ${styles.availabilityLead}`}>
                Day hires run for 10 or 12 hours depending on the vehicle. Movement after 9:00 pm is
                treated as night hire and confirmed separately.
              </p>
              <div className={styles.availabilityNotes}>
                <div className={styles.availabilityRow}>
                  <span>Booking line</span>
                  <strong>{COMPANY.concierge}</strong>
                </div>
                <div className={styles.availabilityRow}>
                  <span>Coverage</span>
                  <strong>Lagos · Abuja · Interstate</strong>
                </div>
                <div className={styles.availabilityRow}>
                  <span>Every hire</span>
                  <strong>Professional driver + fuel</strong>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
