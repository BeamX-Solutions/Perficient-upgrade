"use client";

import { FLEET } from "@/data/fleet";
import { money } from "@/lib/format";

type VehicleSelectProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
};

/** Every vehicle with its confirmed day rate — the price is never hidden. */
export function VehicleSelect({ id, value, onChange }: VehicleSelectProps) {
  return (
    <select
      className="input"
      id={id}
      name="vehicle"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="Help me choose">Not sure yet, help me choose</option>
      {FLEET.map((vehicle) => (
        <option key={vehicle.name} value={vehicle.name}>
          {vehicle.name} · {money(vehicle.price)}/day
        </option>
      ))}
    </select>
  );
}
