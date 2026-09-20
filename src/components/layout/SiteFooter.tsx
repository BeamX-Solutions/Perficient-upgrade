import Link from "next/link";

import { Brand } from "@/components/ui/Brand";
import { COMPANY, SOCIALS, localPhone, telHref } from "@/data/company";
import styles from "./SiteFooter.module.css";

/**
 * Site footer — the ink-dark band that closes every page in the export.
 *
 * The lockup keeps its white plate so the blue pin never sits directly on the
 * dark ground, matching how the brand is placed everywhere else on the site.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <span className={styles.logoPlate}>
              <Brand width={180} />
            </span>

            <p className={styles.blurb}>{COMPANY.blurb}</p>

            <span className={styles.divider} aria-hidden="true" />

            <ul className={styles.socials}>
              {SOCIALS.map((social) => (
                <li key={social.id}>
                  {social.href ? (
                    <a
                      className={styles.social}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <SocialIcon id={social.id} />
                    </a>
                  ) : (
                    /* No handle supplied yet — show the mark, link nothing. */
                    <span className={`${styles.social} ${styles.socialIdle}`} title={social.label}>
                      <SocialIcon id={social.id} />
                      <span className="visually-hidden">{social.label}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <p className={styles.motto}>{COMPANY.motto}</p>
          </div>

          <nav className={styles.col} aria-labelledby="footer-navigate">
            <h2 className={styles.heading} id="footer-navigate">
              Navigate
            </h2>
            <ul className={styles.links}>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/fleet">Fleet</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          <div className={styles.col}>
            <h2 className={styles.heading}>Contact</h2>
            <ul className={styles.contactList}>
              <li>
                <PinIcon />
                <span>{COMPANY.office}</span>
              </li>
              <li>
                <PhoneIcon />
                <span>
                  {COMPANY.phones.bookings.map((phone) => (
                    <a key={phone} href={telHref(phone)}>
                      {localPhone(phone)}
                    </a>
                  ))}
                </span>
              </li>
              <li>
                <MailIcon />
                <span>
                  <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 {COMPANY.name}</span>
          <span>All rates in Nigerian Naira</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Icons ---------- */

function SocialIcon({ id }: { id: string }) {
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (id === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1-5.8 6.1H1.5l7.5-8.6L1.1 3h6.6l4.5 5.6L17.5 3Zm-1.1 16.1h1.8L7.7 4.8H5.8l10.6 14.3Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}
