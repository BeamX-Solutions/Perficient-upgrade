"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useBooking } from "@/components/booking/BookingProvider";
import { COMPANY } from "@/data/company";
import styles from "./SiteHeader.module.css";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Fleet", href: "/fleet" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
] as const;

type SiteHeaderProps = {
  /**
   * How the bar reads before the page is scrolled:
   *   "onDark"  — transparent over a photographic hero, inverted ink
   *   "onLight" — transparent over a pale hero, normal ink
   *   "light"   — solid from the outset, for screens with no hero behind it
   * Once scrolled, every variant becomes the solid bar.
   */
  variant?: "light" | "onDark" | "onLight";
  /** Replaces the booking dialog trigger with a link, where the page already has the form. */
  action?: { href: string; label: string };
  /** Pre-rendered brand lockup, so the header can stay a client component. */
  brand: React.ReactNode;
};

/** How far the page must move before the bar goes solid. */
const PIN_OFFSET = 24;

export function SiteHeader({ variant = "light", action, brand }: SiteHeaderProps) {
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* A route change must never leave the mobile sheet hanging open. */
  useEffect(() => setMenuOpen(false), [pathname]);

  /*
   * The bar is fixed, so once the hero has scrolled past it would otherwise be
   * floating light-on-light. Going solid past a small offset keeps it legible
   * over any section beneath.
   */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > PIN_OFFSET);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* An open mobile sheet always needs the solid ground behind it. */
  const solid = variant === "light" || scrolled || menuOpen;
  const inverted = variant === "onDark" && !solid;

  const isCurrent = (href: string) => {
    const route = href.split("#")[0] || "/";
    return route === "/" ? pathname === "/" && !href.includes("#") : pathname === route;
  };

  const actionClass = `btn ${inverted ? "btn-outline-light" : "btn-secondary"}`;

  const actionButton = action ? (
    <Link className={actionClass} href={action.href}>
      {action.label}
    </Link>
  ) : (
    <button
      className={actionClass}
      type="button"
      onClick={() => openBooking({ source: "top-navigation" })}
    >
      Request a booking
    </button>
  );

  return (
    <header
      className={[styles.topnav, inverted ? styles.inverted : "", solid ? styles.solid : ""]
        .filter(Boolean)
        .join(" ")}
      data-variant={variant}
      data-solid={solid}
    >
      <div className={`container ${styles.navInner}`}>
        <Link className={styles.brand} href="/" aria-label={`${COMPANY.shortName} home`}>
          {brand}
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {NAV.map((item) => (
            <Link
              key={item.href}
              className={isCurrent(item.href) ? styles.isActive : undefined}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.navAction}>
          {actionButton}
          <button
            className={styles.menuButton}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <nav
        className={`${styles.mobileNav} ${menuOpen ? styles.isOpen : ""}`}
        id="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(item.href) ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        {action ? (
          <Link href={action.href} onClick={() => setMenuOpen(false)}>
            {action.label}
          </Link>
        ) : (
          <button
            className={styles.mobileAction}
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openBooking({ source: "mobile-navigation" });
            }}
          >
            Request a booking
          </button>
        )}
      </nav>
    </header>
  );
}
