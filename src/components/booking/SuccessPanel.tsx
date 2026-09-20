"use client";

import { PinMark } from "@/components/ui/PinMark";
import type { BookingState } from "./state";
import styles from "./SuccessPanel.module.css";

type SuccessPanelProps = {
  heading?: string;
  copy: string;
  summary?: BookingState["summary"];
  actionLabel: string;
  onAction: () => void;
  className?: string;
};

/**
 * Confirmation state shared by the dialog and the contact form.
 *
 * It echoes back what was requested so the visitor can see the team received
 * the right journey, and it never implies the booking is confirmed — that
 * happens on the call.
 */
export function SuccessPanel({
  heading,
  copy,
  summary,
  actionLabel,
  onAction,
  className,
}: SuccessPanelProps) {
  return (
    <div className={[styles.success, className].filter(Boolean).join(" ")} aria-live="polite">
      <div>
        {/* The brand pin stands in for a generic tick: the request has reached
            Perficient, and that is what the confirmation is saying. */}
        <PinMark className={styles.mark} />

        {heading ? <h3>{heading}</h3> : null}
        <p className={styles.copy}>{copy}</p>

        {summary ? (
          <dl className={styles.summary}>
            <div>
              <dt>Service</dt>
              <dd>{summary.service}</dd>
            </div>
            <div>
              <dt>Coverage</dt>
              <dd>{summary.coverage}</dd>
            </div>
            <div>
              <dt>Vehicle</dt>
              <dd>{summary.vehicle}</dd>
            </div>
          </dl>
        ) : null}

        <button className="btn btn-secondary" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
