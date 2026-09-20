"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";

import { useBooking } from "@/components/booking/BookingProvider";
import { FEATURED_FLEET, FLEET_SIZE } from "@/data/fleet";
import { money } from "@/lib/format";
import styles from "./FleetShowroom.module.css";

/**
 * Featured-fleet showroom.
 *
 * Price sits beside the model name in tabular numerals and never moves, so
 * stepping between vehicles compares like with like.
 */
export function FleetShowroom({ visual }: { visual: ReactNode }) {
  const [index, setIndex] = useState(0);
  const { openBooking } = useBooking();
  const vehicle = FEATURED_FLEET[index];

  return (
    <div className={styles.card}>
      <div className={styles.visual}>{visual}</div>

      <div className={styles.detail}>
        <span className="meta">Confirmed model</span>
        <h3 className={styles.name}>{vehicle.name}</h3>

        <div className={styles.price}>
          <span>Daily rate</span>
          <strong className="num">{money(vehicle.price)}</strong>
        </div>

        <div className={styles.tags}>
          <span className={styles.tag}>Driver included</span>
          <span className={styles.tag}>Fuel included</span>
          <span className={styles.tag}>10 or 12 hours</span>
          <span className={styles.tag}>Chauffeured only</span>
          {vehicle.note ? <span className={styles.tag}>{vehicle.note}</span> : null}
        </div>

        <div className={styles.nav} role="group" aria-label="Step through featured vehicles">
          {FEATURED_FLEET.map((item, itemIndex) => (
            <button
              key={item.name}
              className={`${styles.tab} ${itemIndex === index ? styles.isActive : ""}`}
              type="button"
              aria-pressed={itemIndex === index}
              aria-label={`View ${item.name}`}
              onClick={() => setIndex(itemIndex)}
            >
              {String(itemIndex + 1).padStart(2, "0")}
            </button>
          ))}
        </div>

        <button
          className={`btn btn-light ${styles.book}`}
          type="button"
          onClick={() => openBooking({ vehicle: vehicle.name, source: "home-showroom" })}
        >
          Book this car
        </button>

        <Link className={`${styles.allLink} btn-arrow`} href="/fleet">
          View all {FLEET_SIZE} vehicles
        </Link>
      </div>
    </div>
  );
}
