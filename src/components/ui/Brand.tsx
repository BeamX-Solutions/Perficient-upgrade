import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { CSSProperties } from "react";

import { PinMark } from "@/components/ui/PinMark";
import { COMPANY } from "@/data/company";
import styles from "./Brand.module.css";

/**
 * Candidate logo files, best format first.
 *
 * The mark is flat colour with hard edges, so SVG beats PNG beats JPEG at nav
 * size. Whichever of these is present wins — no renaming required, and no
 * serving a JPEG under a .png extension.
 */
const LOGO_CANDIDATES = [
  "/assets/perficient-logo.svg",
  "/assets/perficient-logo.png",
  "/assets/perficient-logo.webp",
  "/assets/perficient-logo.jpeg",
  "/assets/perficient-logo.jpg",
];

/** Intrinsic size of the supplied artwork, used to reserve layout space. */
const LOGO_RATIO = { width: 983, height: 292 };

function findLogo(): string | null {
  return (
    LOGO_CANDIDATES.find((src) => existsSync(path.join(process.cwd(), "public", src))) ?? null
  );
}

type BrandProps = {
  /** Rendered logo width in px. The export uses 160 in nav, 180 in the footer. */
  width?: number;
  className?: string;
};

/**
 * The Perficient wordmark.
 *
 * Renders the supplied logo file when it is present in /public/assets. Until
 * then it falls back to a typographic lockup built from the brand's own pin
 * mark and type stack, so the site never ships a broken or borrowed logo.
 * Drop the real file in and every placement picks it up automatically.
 */
export function Brand({ width = 160, className }: BrandProps) {
  const logo = findLogo();

  if (logo) {
    /* next/image refuses SVG unless dangerouslyAllowSVG is on, and there is
       nothing to optimise in a vector anyway — serve it directly. */
    if (logo.endsWith(".svg")) {
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img
          className={className}
          src={logo}
          width={LOGO_RATIO.width}
          height={LOGO_RATIO.height}
          alt={COMPANY.name}
          style={{ width: `${width}px`, height: "auto" }}
        />
      );
    }

    return (
      <Image
        className={className}
        src={logo}
        width={LOGO_RATIO.width}
        height={LOGO_RATIO.height}
        alt={COMPANY.name}
        style={{ width: `${width}px`, height: "auto" }}
        priority
      />
    );
  }

  return (
    <span
      className={[styles.lockup, className].filter(Boolean).join(" ")}
      style={{ "--lockup-width": `${width}px`, width: `${width}px` } as CSSProperties}
      role="img"
      aria-label={COMPANY.name}
    >
      <PinMark className={styles.mark} />
      <span className={styles.words}>
        <span className={styles.name}>Perficient</span>
        <span className={styles.suffix}>Logistics Limited</span>
      </span>
    </span>
  );
}
