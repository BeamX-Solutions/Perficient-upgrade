"use client";

import { useEffect, useId, useState } from "react";

import { useBooking } from "@/components/booking/BookingProvider";
import { CITIES } from "@/data/company";
import { localNowISO } from "@/lib/format";
import styles from "./QuickBookingDock.module.css";

/**
 * The dock straddling the bottom edge of the hero.
 *
 * It is deliberately not the booking form. It captures the three things a
 * visitor already knows and hands them to the full request, so nothing is
 * retyped. Nothing here is required; "Continue" always opens the dialog.
 */
export function QuickBookingDock() {
  const uid = useId();
  const { openBooking } = useBooking();

  const [coverage, setCoverage] = useState("");
  const [pickup, setPickup] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(localNowISO().slice(0, 10)), []);

  return (
    <div className={styles.dockWrap}>
      <div className="container">
        <form
          className={styles.dock}
          onSubmit={(event) => {
            event.preventDefault();
            openBooking({
              coverage,
              /* A date with no time becomes a 9am pickup the visitor can adjust. */
              pickup: pickup ? `${pickup}T09:00` : undefined,
              returnDate: returnDate || undefined,
              source: "hero-quick-dock",
            });
          }}
        >
          <div className={styles.intro}>
            <strong>Plan your journey</strong>
            <span>Start here. Finalise by phone.</span>
          </div>

          <div className="field">
            <label htmlFor={`${uid}-city`}>City</label>
            <select
              className="input"
              id={`${uid}-city`}
              value={coverage}
              onChange={(event) => setCoverage(event.target.value)}
            >
              <option value="">Choose city</option>
              {CITIES.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor={`${uid}-pickup`}>Pickup</label>
            <input
              className="input"
              id={`${uid}-pickup`}
              type="date"
              min={today ?? undefined}
              value={pickup}
              onChange={(event) => setPickup(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor={`${uid}-return`}>Return</label>
            <input
              className="input"
              id={`${uid}-return`}
              type="date"
              min={pickup || today || undefined}
              value={returnDate}
              onChange={(event) => setReturnDate(event.target.value)}
            />
          </div>

          <button className="btn btn-secondary btn-arrow" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
