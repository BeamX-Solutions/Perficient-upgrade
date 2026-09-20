import Link from "next/link";

import { BookingButton } from "@/components/booking/BookingButton";
import { FleetShowroom } from "@/components/home/FleetShowroom";
import { QuickBookingDock } from "@/components/home/QuickBookingDock";
import { ServiceGallery } from "@/components/home/ServiceGallery";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Avatar } from "@/components/ui/Avatar";
import { Brand } from "@/components/ui/Brand";
import { Photo } from "@/components/ui/Photo";
import { COMPANY, TESTIMONIALS } from "@/data/company";
import { FLEET_SIZE } from "@/data/fleet";
import { PHOTOS } from "@/lib/assets";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <SiteHeader variant="onDark" brand={<Brand width={140} />} />

      <main id="content">
        {/* ---- Hero: the photograph runs under the fixed nav ---- */}
        <section className={styles.hero} id="home">
          <div className={styles.heroMedia} aria-hidden="true">
            <Photo photo={PHOTOS.chauffeurHero} alt="" priority sizes="100vw" />
          </div>

          <div className={`container ${styles.heroContent}`}>
            <div className={styles.heroCopy}>
              <p className="eyebrow">Chauffeured car hire · Lagos &amp; Abuja</p>
              <h1>Arrive like it matters.</h1>
              <p className="lead">
                Every Perficient hire pairs a prepared vehicle with a professional chauffeur and
                fuel, so your movement feels considered from the start.
              </p>
              <div className={styles.heroActions}>
                <BookingButton prefill={{ source: "hero" }}>Request a booking</BookingButton>
                <Link className="btn btn-outline-light btn-arrow" href="/fleet">
                  Explore the fleet
                </Link>
              </div>
            </div>

            <div className={styles.heroCaption}>
              <strong>Movement, properly considered.</strong>
              <span>Events · airport transfers · executive travel · personal hire</span>
            </div>
          </div>

          <QuickBookingDock />
        </section>

        {/* ---- The Perficient standard ---- */}
        <section className={`section ${styles.photoIntro}`}>
          <div className={`container ${styles.introGrid}`}>
            <div>
              <p className="eyebrow">The Perficient standard</p>
              <h2>A better way to hire a car.</h2>
            </div>
            <div>
              <p className={`lead ${styles.introLead}`}>
                You should know what is available, what it costs per day and who is responsible for
                the details. Our experience is designed around that clarity.
              </p>
              <div className={styles.introNotes}>
                <div className={styles.note}>
                  <strong>Your chauffeur, included</strong>
                  <span>Professional driver and fuel with every hire</span>
                </div>
                <div className={styles.note}>
                  <strong>Your dates, clearly set</strong>
                  <span>Daily hire for a defined period</span>
                </div>
                <div className={styles.note}>
                  <strong>Your booking, confirmed</strong>
                  <span>Direct follow-up from the team</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Services ---- */}
        <ServiceGallery
          views={{
            chauffeur: <Photo photo={PHOTOS.chauffeurHero} sizes="(max-width: 820px) 100vw, 60vw" />,
            journey: <Photo photo={PHOTOS.luxurySuv} sizes="(max-width: 820px) 100vw, 60vw" />,
            event: <Photo photo={PHOTOS.eventCar} sizes="(max-width: 820px) 100vw, 60vw" />,
          }}
        />

        {/* ---- Featured fleet ---- */}
        <section className="section" id="fleet">
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <p className="eyebrow">Featured fleet</p>
                <h2>See the car. See the daily rate.</h2>
              </div>
              <p className="lead">
                Browse all {FLEET_SIZE} vehicles across four classes, with day rates, chauffeur
                inclusion and the essential hire terms shown upfront.
              </p>
            </div>

            <FleetShowroom
              visual={
                <Photo
                  photo={PHOTOS.luxurySuv}
                  alt="The featured Perficient vehicle"
                  placeholder="Actual Perficient vehicle photography · three-quarter front angle"
                  sizes="(max-width: 1080px) 100vw, 55vw"
                />
              }
            />
          </div>
        </section>

        {/* ---- The experience ---- */}
        <section className={styles.comfort} id="experience">
          <div className={styles.comfortPhoto}>
            <Photo photo={PHOTOS.luxuryInterior} sizes="(max-width: 820px) 100vw, 55vw" />
          </div>
          <div className={styles.comfortCopy}>
            <p className="eyebrow">The experience</p>
            <h2>Comfort is only part of it.</h2>
            <p className={`lead ${styles.comfortLead}`}>
              The real luxury is knowing that the vehicle, timing and handoff have been properly
              considered before the journey begins.
            </p>
            <div className={styles.comfortList}>
              {[
                "A prepared vehicle for the occasion",
                "A clear daily rate before confirmation",
                "A professional chauffeur with every hire",
                "A team you can speak to directly",
              ].map((item, index) => (
                <div className={styles.comfortRow} key={item}>
                  <span className="num">{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Client voices ---- */}
        <section className={`section ${styles.testimonials}`} id="testimonials">
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <p className="eyebrow">Client voices</p>
                <h2>What our clients say.</h2>
              </div>
              <p className="lead">
                First-hand accounts of airport pickups, prepared vehicles and service that stayed
                dependable from booking to arrival.
              </p>
            </div>

            <div className={styles.testimonialGrid}>
              {TESTIMONIALS.map((testimonial) => (
                <article className={styles.testimonial} key={testimonial.id}>
                  <div className={styles.rating} aria-label="5 out of 5 stars">
                    <span aria-hidden="true">★ ★ ★ ★ ★</span>
                  </div>
                  <blockquote>{testimonial.quote}</blockquote>
                  <div className={styles.author}>
                    <Avatar
                      name={testimonial.name}
                      basePath={`/assets/testimonials/${testimonial.id}`}
                    />
                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---- How it works ---- */}
        <section className={`section ${styles.process}`} id="process">
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <p className="eyebrow">How it works</p>
                <h2>From request to ready.</h2>
              </div>
              <p className="lead">
                No account or payment wall. Share the essentials, confirm the details with the team,
                then meet your chauffeur at the agreed time.
              </p>
            </div>

            <div className={styles.steps}>
              {[
                {
                  title: "Set the journey",
                  copy: "Choose the service, Lagos or Abuja, your dates and preferred vehicle.",
                },
                {
                  title: "Confirm by phone",
                  copy: "Perficient confirms availability, the daily price and any special requirements.",
                },
                {
                  title: "Move as planned",
                  copy: "Meet your professional chauffeur and begin the journey at the agreed time.",
                },
              ].map((step, index) => (
                <article className={styles.step} key={step.title}>
                  <span className={`num ${styles.stepNum}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Closing ---- */}
        <section className={styles.closing}>
          <div className={styles.closingMedia} aria-hidden="true">
            <Photo photo={PHOTOS.eventCar} alt="" sizes="100vw" />
          </div>
          <div className={styles.closingCopy}>
            <p className="eyebrow">Your next journey</p>
            <h2>Make the arrival part of the occasion.</h2>
            <p className={`lead ${styles.closingLead}`}>
              Tell us what you need. The {COMPANY.shortName} team will help finalise the right
              vehicle and arrangement.
            </p>
            <BookingButton prefill={{ source: "closing-cta" }}>Request your booking</BookingButton>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
