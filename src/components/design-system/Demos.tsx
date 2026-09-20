"use client";

import { useState } from "react";

import styles from "./Demos.module.css";

const SEGMENTS = ["Self-drive", "With driver", "Event"];

/** Live segmented control — selection is always explicit, three options maximum. */
export function SegmentedDemo() {
  const [active, setActive] = useState(SEGMENTS[0]);

  return (
    <div className={styles.segmented} role="group" aria-label="Choose hire type">
      {SEGMENTS.map((segment) => (
        <button
          key={segment}
          className={`${styles.segment} ${segment === active ? styles.isActive : ""}`}
          type="button"
          aria-pressed={segment === active}
          onClick={() => setActive(segment)}
        >
          {segment}
        </button>
      ))}
    </div>
  );
}

const SERVICE_CARDS = [
  {
    id: "self-drive",
    title: "Self-drive hire",
    copy: "A daily-rate vehicle for personal or business use, with you behind the wheel.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="2" />
        <path d="M4 12h6m4 0h6m-8-8v6" />
      </>
    ),
  },
  {
    id: "chauffeur",
    title: "Chauffeur hire",
    copy: "Professional, discreet movement for guests, airport runs and executive schedules.",
    icon: (
      <>
        <path d="M5 16l1.4-6h11.2l1.4 6M7 10l2-4h6l2 4M4 16h16v3H4z" />
        <circle cx="7" cy="19" r="1" />
        <circle cx="17" cy="19" r="1" />
      </>
    ),
  },
  {
    id: "events",
    title: "Events & occasions",
    copy: "Presentation-ready vehicles for weddings, ceremonies, corporate events and shoots.",
    icon: <path d="M5 9h14v10H5zM8 5v4m8-4v4M5 13h14" />,
  },
];

/** Selectable service cards — the single-choice pattern used across the site. */
export function ServiceCardDemo() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={styles.serviceGrid}>
      {SERVICE_CARDS.map((card) => (
        <button
          key={card.id}
          className={`${styles.serviceCard} ${selected === card.id ? styles.isSelected : ""}`}
          type="button"
          aria-pressed={selected === card.id}
          onClick={() => setSelected(card.id)}
        >
          <span className={styles.serviceMark}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {card.icon}
            </svg>
          </span>
          <h3>{card.title}</h3>
          <p>{card.copy}</p>
        </button>
      ))}
    </div>
  );
}
