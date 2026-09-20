"use client";

import { useId, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { useBooking } from "@/components/booking/BookingProvider";
import {
  CATEGORY_FILTERS,
  CATEGORY_ORDER,
  FLEET,
  FLEET_SIZE,
  type FleetCategory,
} from "@/data/fleet";
import { money, slug } from "@/lib/format";
import styles from "./FleetCatalogue.module.css";

type SortValue = "default" | "low" | "high" | "name";

type FleetCatalogueProps = {
  /**
   * Photography for each vehicle, keyed by name and rendered on the server.
   * Passed as already-rendered nodes rather than a render function, because a
   * function cannot cross the server/client boundary.
   */
  media: Record<string, ReactNode>;
};

/**
 * The full fleet catalogue: search, class filter, sort, and the empty state.
 *
 * All filtering happens client-side over a 30-item list — small enough that
 * results feel instant and no request is needed to narrow the grid.
 */
export function FleetCatalogue({ media }: FleetCatalogueProps) {
  const uid = useId();
  const { openBooking } = useBooking();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FleetCategory | "All">("All");
  const [sort, setSort] = useState<SortValue>("default");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = FLEET.filter((vehicle) => {
      const matchesCategory = category === "All" || vehicle.category === category;
      const matchesText = vehicle.name.toLowerCase().includes(needle);
      return matchesCategory && matchesText;
    });

    return filtered.sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      /* Default: class order, then rate — cheapest first within each class. */
      return CATEGORY_ORDER[a.category] - CATEGORY_ORDER[b.category] || a.price - b.price;
    });
  }, [query, category, sort]);

  return (
    <>
      <div className={styles.filterShell}>
        <div className={`container ${styles.filterRow}`}>
          <div className={styles.searchWrap}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M16 16l5 5" />
            </svg>
            <input
              className={styles.search}
              id={`${uid}-search`}
              type="search"
              placeholder="Search Toyota, Lexus, Range Rover…"
              aria-label="Search fleet"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className={styles.filterTabs} role="group" aria-label="Filter by vehicle class">
            {CATEGORY_FILTERS.map((filter) => (
              <button
                key={filter.value}
                className={`${styles.filterTab} ${category === filter.value ? styles.isActive : ""}`}
                type="button"
                aria-pressed={category === filter.value}
                onClick={() => setCategory(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <select
            className={styles.sort}
            aria-label="Sort fleet"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortValue)}
          >
            <option value="default">Sort: class order</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="name">Vehicle: A to Z</option>
          </select>
        </div>
      </div>

      <div className="container">
        <div className={styles.resultLine}>
          <p aria-live="polite">
            Showing {results.length} of {FLEET_SIZE} vehicles
          </p>
          <span className="meta">Chauffeured only</span>
        </div>

        {results.length > 0 ? (
          <div className={styles.grid}>
            {results.map((vehicle) => (
              <article className={styles.card} key={vehicle.name} id={`vehicle-${slug(vehicle.name)}`}>
                <div className={styles.media}>{media[vehicle.name]}</div>

                <div className={styles.body}>
                  <div className={styles.top}>
                    <div>
                      <span className="meta">{vehicle.category}</span>
                      <h3>{vehicle.name}</h3>
                    </div>
                    <div className={styles.price}>
                      <span>Per day</span>
                      <strong className="num">{money(vehicle.price)}</strong>
                    </div>
                  </div>

                  <div className={styles.includes}>
                    <span className="tag">Driver included</span>
                    <span className="tag">Fuel included</span>
                    {vehicle.note ? <span className="tag">{vehicle.note}</span> : null}
                  </div>

                  <button
                    className={`btn btn-secondary ${styles.bookButton}`}
                    type="button"
                    onClick={() =>
                      openBooking({ vehicle: vehicle.name, source: "fleet-catalogue" })
                    }
                  >
                    Book this vehicle
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <h3>No vehicle matches that search.</h3>
            <p>Try another model name or view all four classes.</p>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
