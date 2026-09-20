"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { useBooking } from "@/components/booking/BookingProvider";
import { SERVICES } from "@/data/company";
import styles from "./ServiceGallery.module.css";

type ServiceGalleryProps = {
  /**
   * Server-rendered photographs keyed by the `view` each service maps to.
   * All three are mounted and cross-faded, so switching never shows a gap.
   */
  views: Record<string, ReactNode>;
};

export function ServiceGallery({ views }: ServiceGalleryProps) {
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);
  const { openBooking } = useBooking();

  const active = SERVICES.find((service) => service.id === activeId) ?? SERVICES[0];

  return (
    <section className={styles.gallery} id="services">
      <div className={styles.menu}>
        <p className="eyebrow">Choose your service</p>
        <h2>Every journey has its own brief.</h2>

        <div className={styles.list} role="group" aria-label="Services">
          {SERVICES.map((service, index) => (
            <button
              key={service.id}
              className={`${styles.item} ${service.id === activeId ? styles.isActive : ""}`}
              type="button"
              aria-pressed={service.id === activeId}
              onClick={() => setActiveId(service.id)}
            >
              <span className="num">{String(index + 1).padStart(2, "0")}</span>
              <strong>{service.label}</strong>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.view}>
        {Object.entries(views).map(([view, node]) => (
          <div
            key={view}
            className={`${styles.viewImage} ${view === active.view ? styles.isActive : ""}`}
            aria-hidden={view === active.view ? undefined : true}
          >
            {node}
          </div>
        ))}

        <div className={styles.caption}>
          <div aria-live="polite">
            <span className="meta">Selected service</span>
            <h3>{active.label}</h3>
            <p>{active.copy}</p>
          </div>
          <button
            className="btn btn-light"
            type="button"
            onClick={() =>
              openBooking({
                service: active.value,
                notes: active.label,
                source: `service-gallery:${active.id}`,
              })
            }
          >
            Request this service
          </button>
        </div>
      </div>
    </section>
  );
}
