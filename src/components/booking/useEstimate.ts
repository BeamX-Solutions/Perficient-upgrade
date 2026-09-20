"use client";

import { useMemo } from "react";

import { FLEET_FROM_PRICE, findVehicle } from "@/data/fleet";
import { days as pluralDays, money } from "@/lib/format";

export type Estimate = {
  label: string;
  detail: string;
  price: string;
};

/**
 * The base-rate estimator shown in the booking dialog and the contact form.
 *
 * It only ever multiplies a *listed* day rate by a number of days. Airport,
 * escort, interstate, overtime and night-hire charges are confirmed by the team
 * on the call, so the panel never presents itself as a quote.
 */
export function useEstimate(vehicleName: string, hireDays: number | null): Estimate {
  return useMemo(() => {
    const vehicle = findVehicle(vehicleName);

    if (!vehicle) {
      return {
        label: "Base day rate",
        detail: "Choose a vehicle to see its listed day rate.",
        price: `From ${money(FLEET_FROM_PRICE)}`,
      };
    }

    if (hireDays && hireDays > 0) {
      return {
        label: `Estimated base for ${pluralDays(hireDays)}`,
        detail: `${money(vehicle.price)}/day × ${hireDays} · Driver and fuel included`,
        price: money(vehicle.price * hireDays),
      };
    }

    return {
      label: "Listed day rate",
      detail: "Driver and fuel included · Select dates for a base estimate",
      price: `${money(vehicle.price)}/day`,
    };
  }, [vehicleName, hireDays]);
}
