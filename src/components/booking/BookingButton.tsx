"use client";

import type { ReactNode } from "react";

import { useBooking, type BookingPrefill } from "./BookingProvider";

type BookingButtonProps = {
  children: ReactNode;
  className?: string;
  prefill?: BookingPrefill;
};

/** Opens the site-wide booking dialog from anywhere, including server pages. */
export function BookingButton({ children, className = "btn btn-primary", prefill }: BookingButtonProps) {
  const { openBooking } = useBooking();

  return (
    <button className={className} type="button" onClick={() => openBooking(prefill)}>
      {children}
    </button>
  );
}
