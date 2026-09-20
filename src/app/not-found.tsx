import Link from "next/link";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Brand } from "@/components/ui/Brand";
import { COMPANY, telHref } from "@/data/company";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <SiteHeader brand={<Brand width={160} />} />

      <main id="content" className={`section ${styles.wrap}`}>
        <div className="container">
          <p className="eyebrow">404 · Page not found</p>
          <h1>That route doesn’t exist.</h1>
          <p className={`lead ${styles.lead}`}>
            The page may have moved. Browse the fleet and day rates, or call the concierge. The
            line is open 24 hours.
          </p>
          <div className={styles.actions}>
            <Link className="btn btn-primary" href="/fleet">
              Browse the fleet
            </Link>
            <a className="btn btn-secondary" href={telHref(COMPANY.phones.bookings[0])}>
              Call {COMPANY.phones.bookings[0]}
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
