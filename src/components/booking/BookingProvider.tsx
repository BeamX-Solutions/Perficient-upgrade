"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import { DEFAULT_SERVICE, type ServiceValue } from "@/data/company";
import { BookingDialog } from "./BookingDialog";

export type BookingPrefill = {
  service?: ServiceValue | string;
  vehicle?: string;
  coverage?: string;
  /** `datetime-local` value, e.g. 2026-10-02T09:00 */
  pickup?: string;
  /** `date` value */
  returnDate?: string;
  notes?: string;
  /** Which control opened the dialog — carried into the request for triage. */
  source?: string;
};

type BookingContextValue = {
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

/**
 * Holds the one booking dialog for the whole site.
 *
 * The export shipped a separate dialog in the homepage and the fleet page and a
 * third inline form on contact. Hoisting the dialog here means any control on
 * any route — nav, hero, a vehicle card, a service caption — can open it
 * pre-filled with what the visitor was looking at, which is the behaviour all
 * three screens were reaching for.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<BookingPrefill>({ service: DEFAULT_SERVICE });
  /** Remounts the dialog body so a fresh open never shows the last request. */
  const [openCount, setOpenCount] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openBooking = useCallback((next: BookingPrefill = {}) => {
    setPrefill({ service: DEFAULT_SERVICE, ...next });
    setOpenCount((count) => count + 1);
  }, []);

  /*
   * showModal() has to run AFTER the remount, not inside openBooking.
   * Bumping openCount changes the dialog's key, so React swaps in a brand-new
   * <dialog> element — calling showModal() synchronously would open the node
   * that is about to be discarded, and the replacement would mount closed.
   */
  useEffect(() => {
    if (openCount === 0) return;
    dialogRef.current?.showModal();
  }, [openCount]);

  const closeBooking = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const value = useMemo(() => ({ openBooking, closeBooking }), [openBooking, closeBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingDialog key={openCount} ref={dialogRef} prefill={prefill} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used inside <BookingProvider>.");
  }
  return context;
}
