import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Brand } from "@/components/ui/Brand";
import { Photo } from "@/components/ui/Photo";
import { COMPANY, SERVICE_STANDARDS } from "@/data/company";
import { FLEET_SIZE } from "@/data/fleet";
import { PHOTOS } from "@/lib/assets";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About us",
  description: `Meet ${COMPANY.name}, a chauffeur-driven car hire company serving Lagos, Abuja and interstate journeys.`,
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader
        variant="onLight"
        brand={<Brand width={140} />}
        action={{ href: "/contact#booking", label: "Request a booking" }}
      />

      <main id="content">
        {/* ---- Hero: pale, so the nav reads with normal ink over it ---- */}
        <section className={styles.heroWrap}>
          <div className={styles.hero}>
            <div className={styles.heroCopy}>
              <p className="eyebrow">About Perficient</p>
              <h1>Movement, handled with intent.</h1>
              <p className={`lead ${styles.heroLead}`}>
                {COMPANY.name} is a chauffeur-driven car hire company serving Lagos, Abuja and
                interstate journeys with prepared vehicles and attentive human service.
              </p>
            </div>
            <div className={styles.heroPhoto}>
              <Photo photo={PHOTOS.chauffeurHero} priority sizes="(max-width: 820px) 100vw, 55vw" />
            </div>
          </div>
        </section>

        {/* ---- Facts ---- */}
        <section className={styles.facts}>
          <div className={`container ${styles.factGrid}`}>
            <div className={styles.fact}>
              <span className="meta">Experience</span>
              <strong>{COMPANY.yearsActive}</strong>
            </div>
            <div className={styles.fact}>
              <span className="meta">Core cities</span>
              <strong>{COMPANY.cities}</strong>
            </div>
            <div className={styles.fact}>
              <span className="meta">Fleet</span>
              <strong>{FLEET_SIZE} vehicles</strong>
            </div>
            <div className={styles.fact}>
              <span className="meta">Concierge</span>
              <strong>{COMPANY.concierge}</strong>
            </div>
          </div>
        </section>

        {/* ---- Story ---- */}
        <section className="section">
          <div className={`container ${styles.storyGrid}`}>
            <div>
              <p className="eyebrow">Who we are</p>
              <h2 className={styles.storyHeading}>Built for journeys that carry weight.</h2>
            </div>
            <div className={styles.storyCopy}>
              <p>
                Some trips are routine. Others carry an important client, mark a wedding day, begin
                at an airport arrival or run across state lines. Perficient exists to make every one
                of them feel properly prepared.
              </p>
              <p>
                Customers choose directly from our fleet and see the day rate before they request a
                booking. Every vehicle is supplied with a professional Perficient chauffeur, and
                driver and fuel are included in the listed rate.
              </p>
              <p>
                The experience stays deliberately human. Share the service, dates, city and vehicle
                you need; our team confirms availability, the final rate and the practical details
                by phone.
              </p>
            </div>
          </div>
        </section>

        {/* ---- Standards ---- */}
        <section className={`section ${styles.standards}`}>
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <p className="eyebrow">The Perficient standard</p>
                <h2>Trust is built in the details.</h2>
              </div>
              <p className="lead">
                From the vehicle dispatched to the person behind the wheel, every part of the
                service should support a calm, dependable journey.
              </p>
            </div>

            <div className={styles.standardList}>
              {SERVICE_STANDARDS.map((standard, index) => (
                <article className={styles.standard} key={standard.id}>
                  <span className={`${styles.number} num`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{standard.title}</h3>
                  <p>{standard.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Occasions ---- */}
        <section className={styles.picture}>
          <div className={styles.picturePhoto}>
            <Photo photo={PHOTOS.eventCar} sizes="(max-width: 820px) 100vw, 55vw" />
          </div>
          <div className={styles.pictureCopy}>
            <p className="eyebrow">Ahead and ready</p>
            <h2>The right car for the way you need to arrive.</h2>
            <p className={`lead ${styles.pictureLead}`}>
              Airport transfers, executive movement, events, protocol, corporate arrangements and
              interstate travel, all handled with the same care.
            </p>
            <Link className={`btn btn-light ${styles.pictureAction}`} href="/fleet">
              Explore the fleet
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
