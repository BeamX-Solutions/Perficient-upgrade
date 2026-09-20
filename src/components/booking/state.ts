/**
 * Shape of a booking submission's result.
 *
 * This lives outside `app/actions.ts` because a `"use server"` module may only
 * export async functions — a plain constant there is not a valid Server Action
 * and does not survive the client boundary.
 */

export type BookingState = {
  status: "idle" | "success" | "error";
  /** Field-keyed messages, rendered beside the offending input. */
  errors: Record<string, string>;
  /** Echoed back so the confirmation panel can name what was requested. */
  summary?: {
    service: string;
    coverage: string;
    vehicle: string;
    pickup: string;
  };
};

export const EMPTY_BOOKING_STATE: BookingState = { status: "idle", errors: {} };
