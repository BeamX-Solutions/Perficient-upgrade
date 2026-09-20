"use client";

import { useActionState, useEffect, useId, useState } from "react";

import { submitBookingRequest } from "@/app/actions";
import { EMPTY_BOOKING_STATE } from "./state";
import { COVERAGE } from "@/data/company";
import { localNowISO } from "@/lib/format";
import { SuccessPanel } from "./SuccessPanel";
import { useEstimate } from "./useEstimate";
import { VehicleSelect } from "./VehicleSelect";
import styles from "./ContactBookingForm.module.css";

/**
 * The contact page's booking request.
 *
 * Unlike the dialog, this form asks for a hire *length* rather than a return
 * date — the contact page is where longer and interstate arrangements start,
 * and a day count is the figure the concierge works from.
 */
export function ContactBookingForm() {
  const [formKey, setFormKey] = useState(0);
  return <Form key={formKey} onRestart={() => setFormKey((key) => key + 1)} />;
}

function Form({ onRestart }: { onRestart: () => void }) {
  const uid = useId();
  const [state, formAction, pending] = useActionState(submitBookingRequest, EMPTY_BOOKING_STATE);

  const [vehicle, setVehicle] = useState("Help me choose");
  const [hireDays, setHireDays] = useState(1);

  const [now, setNow] = useState<string | null>(null);
  useEffect(() => setNow(localNowISO()), []);

  const estimate = useEstimate(vehicle, hireDays);

  const field = (name: string) => ({
    id: `${uid}-${name}`,
    "aria-invalid": state.errors[name] ? (true as const) : undefined,
    "aria-describedby": state.errors[name] ? `${uid}-${name}-error` : undefined,
  });

  const errorFor = (name: string) =>
    state.errors[name] ? (
      <span className="field-error" id={`${uid}-${name}-error`}>
        {state.errors[name]}
      </span>
    ) : null;

  if (state.status === "success") {
    return (
      <div className={styles.card}>
        <SuccessPanel
          className={styles.success}
          heading="Request received."
          copy="The concierge will call to confirm your vehicle, hire window and final rate."
          summary={state.summary}
          actionLabel="Make another request"
          onAction={onRestart}
        />
      </div>
    );
  }

  return (
    <form className={styles.card} action={formAction} noValidate>
      <input type="hidden" name="source" value="contact-page" />

      <div className={styles.head}>
        <div>
          <h2 className="h3">Request your booking</h2>
          <p>Driver and fuel are included in every listed day rate.</p>
        </div>
        <span className="meta">No payment now</span>
      </div>

      <div className={styles.grid}>
        <div className={`field ${styles.full}`}>
          <label htmlFor={`${uid}-coverage`}>City / coverage *</label>
          <select className="input" {...field("coverage")} name="coverage" defaultValue="" required>
            <option value="">Choose coverage</option>
            {COVERAGE.map((area) => (
              <option key={area}>{area}</option>
            ))}
          </select>
          {errorFor("coverage")}
        </div>

        <div className="field">
          <label htmlFor={`${uid}-pickup`}>Pickup date &amp; time *</label>
          <input
            className="input"
            {...field("pickup")}
            name="pickup"
            type="datetime-local"
            min={now?.slice(0, 16)}
            required
          />
          {errorFor("pickup")}
        </div>

        <div className="field">
          <label htmlFor={`${uid}-days`}>Hire days *</label>
          <input
            className="input"
            {...field("days")}
            name="days"
            type="number"
            min={1}
            value={hireDays}
            onChange={(event) => setHireDays(Math.max(1, Number(event.target.value) || 1))}
            required
          />
          {errorFor("days")}
        </div>

        <div className={`field ${styles.full}`}>
          <label htmlFor={`${uid}-vehicle`}>Preferred vehicle</label>
          <VehicleSelect id={`${uid}-vehicle`} value={vehicle} onChange={setVehicle} />
        </div>

        <div className={styles.estimate} aria-live="polite">
          <div>
            <span>{estimate.label}</span>
            <p>{estimate.detail}</p>
          </div>
          <strong className="num">{estimate.price}</strong>
          <p className={styles.estimateFootnote}>
            Airport, escort, interstate, overtime and night-hire charges are confirmed separately
            before booking.
          </p>
        </div>

        <div className="field">
          <label htmlFor={`${uid}-name`}>Full name *</label>
          <input className="input" {...field("name")} name="name" autoComplete="name" required />
          {errorFor("name")}
        </div>

        <div className="field">
          <label htmlFor={`${uid}-phone`}>Phone / WhatsApp *</label>
          <input
            className="input"
            {...field("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+234"
            required
          />
          {errorFor("phone")}
        </div>

        <div className={`field ${styles.full}`}>
          <label htmlFor={`${uid}-email`}>Email</label>
          <input
            className="input"
            {...field("email")}
            name="email"
            type="email"
            autoComplete="email"
          />
          {errorFor("email")}
        </div>

        <div className={`field ${styles.full}`}>
          <label htmlFor={`${uid}-notes`}>Journey notes</label>
          <textarea
            className="textarea"
            {...field("notes")}
            name="notes"
            placeholder="Pickup area, destination, passengers, escort or event details"
          />
        </div>
      </div>

      <button className={`btn btn-primary ${styles.submit}`} type="submit" disabled={pending}>
        {pending ? "Sending request…" : "Request booking"}
      </button>
      <p className="form-note">
        This sends a request, not a payment. The team will call to confirm the final rate.
      </p>
    </form>
  );
}
