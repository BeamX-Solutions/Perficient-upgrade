"use server";

import type { BookingState } from "@/components/booking/state";
import { SERVICE_VALUES } from "@/data/company";
import { findVehicle } from "@/data/fleet";

/**
 * Booking requests from every surface: the homepage dialog, the fleet
 * catalogue dialog and the contact page form all post here.
 *
 * This is a *request*, never a payment and never a confirmation. The team calls
 * back to confirm the vehicle, the hire window and the final rate, so the only
 * fields enforced are the ones that call cannot happen without.
 */

/*
 * Service is deliberately absent: the forms no longer ask for it. The dialog
 * still passes it as a hidden value when a service-specific control opened it,
 * so it is validated when present but never demanded.
 */
const REQUIRED_FIELDS: { name: string; label: string }[] = [
  { name: "coverage", label: "Choose a city or coverage area." },
  { name: "pickup", label: "Choose a pickup date." },
  { name: "name", label: "Tell us who the booking is for." },
  { name: "phone", label: "We need a number to confirm on." },
];

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitBookingRequest(
  _previous: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const errors: Record<string, string> = {};

  for (const field of REQUIRED_FIELDS) {
    if (!text(formData, field.name)) errors[field.name] = field.label;
  }

  const service = text(formData, "service");
  if (service && !SERVICE_VALUES.includes(service as (typeof SERVICE_VALUES)[number])) {
    errors.service = "That service is not one we offer.";
  }

  const phone = text(formData, "phone");
  // Deliberately permissive: Nigerian numbers arrive as +234…, 0803…, or spaced.
  if (phone && phone.replace(/[^\d]/g, "").length < 10) {
    errors.phone = "That number looks too short to call back on.";
  }

  const email = text(formData, "email");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Check the email address.";
  }

  const pickup = text(formData, "pickup");
  const returnDate = text(formData, "return");
  if (pickup && returnDate && returnDate.slice(0, 10) < pickup.slice(0, 10)) {
    errors.return = "The return date falls before the pickup.";
  }

  const hireDaysRaw = text(formData, "days");
  if (hireDaysRaw && (!Number.isFinite(Number(hireDaysRaw)) || Number(hireDaysRaw) < 1)) {
    errors.days = "Hire days must be at least 1.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const vehicleName = text(formData, "vehicle");
  const vehicle = findVehicle(vehicleName);

  const request = {
    receivedAt: new Date().toISOString(),
    service,
    coverage: text(formData, "coverage"),
    area: text(formData, "area"),
    pickup,
    returnDate,
    hireDays: hireDaysRaw ? Number(hireDaysRaw) : undefined,
    hireWindow: text(formData, "hireWindow"),
    vehicle: vehicle?.name ?? vehicleName ?? "Help me choose",
    listedDayRate: vehicle?.price ?? null,
    name: text(formData, "name"),
    phone,
    email,
    notes: text(formData, "notes"),
    source: text(formData, "source") || "unknown",
  };

  // ---------------------------------------------------------------------
  // DELIVERY HOOK — replace this log with the real destination.
  //
  // Whatever operations actually watches (email to the bookings inbox, a
  // WhatsApp Business message, a row in a CRM) goes here. Everything above is
  // already validated and normalised; this is the only line that changes.
  // ---------------------------------------------------------------------
  console.info("[perficient] booking request", request);

  return {
    status: "success",
    errors: {},
    summary: {
      service: request.service,
      coverage: request.coverage,
      vehicle: request.vehicle,
      pickup: request.pickup,
    },
  };
}
