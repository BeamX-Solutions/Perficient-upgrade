"use client";

import { useActionState, useEffect, useId, useState } from "react";
import type { Ref } from "react";

import { submitBookingRequest } from "@/app/actions";
import { EMPTY_BOOKING_STATE } from "./state";
import { CITIES, HIRE_WINDOWS, SERVICES } from "@/data/company";
import { hireDays, localNowISO } from "@/lib/format";
import type { BookingPrefill } from "./BookingProvider";
import { SuccessPanel } from "./SuccessPanel";
import { useEstimate } from "./useEstimate";
import { VehicleSelect } from "./VehicleSelect";
import styles from "./BookingDialog.module.css";

type BookingDialogProps = {
  ref: Ref<HTMLDialogElement>;
  prefill: BookingPrefill;
  onClose: () => void;
};

export function BookingDialog({ ref, prefill, onClose }: BookingDialogProps) {
  /* Bumping the key discards the finished action state so "Make another
     request" genuinely starts over rather than re-showing the confirmation. */
  const [formKey, setFormKey] = useState(0);

  return (
    <dialog
      className={styles.dialog}
      ref={ref}
      aria-labelledby="booking-dialog-title"
      /* Clicking the backdrop — but not the panel — closes, matching the export. */
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onClose={onClose}
    >
      <DialogForm
        key={formKey}
        prefill={prefill}
        onClose={onClose}
        onRestart={() => setFormKey((key) => key + 1)}
      />
    </dialog>
  );
}

function DialogForm({
  prefill,
  onClose,
  onRestart,
}: {
  prefill: BookingPrefill;
  onClose: () => void;
  onRestart: () => void;
}) {
  const uid = useId();
  const [state, formAction, pending] = useActionState(submitBookingRequest, EMPTY_BOOKING_STATE);

  const [service, setService] = useState(prefill.service ?? SERVICES[0].value);
  const [vehicle, setVehicle] = useState(prefill.vehicle ?? "Help me choose");
  const [pickup, setPickup] = useState(prefill.pickup ?? "");
  const [returnDate, setReturnDate] = useState(prefill.returnDate ?? "");

  /* Resolved on the client only: the min attribute depends on the visitor's clock,
     so computing it during render would desync the server and client markup. */
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => setNow(localNowISO()), []);

  const estimate = useEstimate(vehicle, hireDays(pickup, returnDate));
  const submitted = state.status === "success";

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

  return (
    <form action={formAction} noValidate>
      <div className={styles.head}>
        <div>
          <h2 className="h3" id="booking-dialog-title">
            {submitted ? "Request received." : "Request your booking"}
          </h2>
          <p>
            {submitted
              ? "A concierge will be in touch to confirm the details."
              : "Every hire includes a professional chauffeur and fuel. See your base estimate before sending."}
          </p>
        </div>
        <button
          className={styles.iconButton}
          type="button"
          onClick={onClose}
          aria-label="Close booking form"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {submitted ? (
        <SuccessPanel
          className={styles.success}
          copy="The Perficient team will call to confirm the vehicle, rate and journey details."
          summary={state.summary}
          actionLabel="Make another request"
          onAction={onRestart}
        />
      ) : (
        <div className={styles.body}>
          <input type="hidden" name="source" value={prefill.source ?? "booking-dialog"} />
          {/* The visitor is not asked to pick a service, but whichever control
              opened the dialog still tells the team what they were looking at. */}
          <input type="hidden" name="service" value={service} />

          <div className={styles.formGrid}>

            <div className="field">
              <label htmlFor={`${uid}-coverage`}>City *</label>
              <select
                className="input"
                {...field("coverage")}
                name="coverage"
                defaultValue={prefill.coverage ?? ""}
                required
              >
                <option value="">Choose city</option>
                {CITIES.map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>
              {errorFor("coverage")}
            </div>

            <div className="field">
              <label htmlFor={`${uid}-area`}>Pickup area</label>
              <input className="input" {...field("area")} name="area" placeholder="Area or landmark" />
            </div>

            <div className="field">
              <label htmlFor={`${uid}-pickup`}>Pickup date &amp; time *</label>
              <input
                className="input"
                {...field("pickup")}
                name="pickup"
                type="datetime-local"
                min={now?.slice(0, 16)}
                value={pickup}
                onChange={(event) => setPickup(event.target.value)}
                required
              />
              {errorFor("pickup")}
            </div>

            <div className="field">
              <label htmlFor={`${uid}-return`}>Return date *</label>
              <input
                className="input"
                {...field("return")}
                name="return"
                type="date"
                min={pickup ? pickup.slice(0, 10) : now?.slice(0, 10)}
                value={returnDate}
                onChange={(event) => setReturnDate(event.target.value)}
                required
              />
              {errorFor("return")}
            </div>

            <div className={`field ${styles.full}`}>
              <label htmlFor={`${uid}-vehicle`}>Preferred vehicle</label>
              <VehicleSelect id={`${uid}-vehicle`} value={vehicle} onChange={setVehicle} />
            </div>

            <div className={`field ${styles.full}`}>
              <label htmlFor={`${uid}-hireWindow`}>Hire window</label>
              <select className="input" {...field("hireWindow")} name="hireWindow">
                {HIRE_WINDOWS.map((window) => (
                  <option key={window}>{window}</option>
                ))}
              </select>
            </div>

            <div className={styles.priceSummary} aria-live="polite">
              <div>
                <span>{estimate.label}</span>
                <p>{estimate.detail}</p>
              </div>
              <strong className="num">{estimate.price}</strong>
              <p className={styles.priceFootnote}>
                Estimate uses the listed day rate. Airport, escort, interstate, overtime and
                night-hire charges are confirmed separately before booking.
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
              <label htmlFor={`${uid}-notes`}>Notes</label>
              <textarea
                className="textarea"
                {...field("notes")}
                name="notes"
                defaultValue={prefill.notes ?? ""}
                placeholder="Occasion, guests or special requests"
              />
            </div>
          </div>

          <button className={`btn btn-primary ${styles.submit}`} type="submit" disabled={pending}>
            {pending ? "Sending request…" : "Request booking"}
          </button>
          <p className="form-note">
            This sends a request, not a payment. Required fields are marked *.
          </p>
        </div>
      )}
    </form>
  );
}
