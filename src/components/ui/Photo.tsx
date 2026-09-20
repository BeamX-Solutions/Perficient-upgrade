import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

import styles from "./Photo.module.css";

type PhotoSource = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type PhotoProps = {
  photo: PhotoSource;
  className?: string;
  /** Overrides the alt text — pass "" for photography that is purely decorative. */
  alt?: string;
  priority?: boolean;
  sizes?: string;
  /** Copy shown in the reserved frame while the real photograph is outstanding. */
  placeholder?: string;
};

/**
 * Editorial photograph with the export's reserved-frame fallback.
 *
 * Photography is evidence in this design, so a missing file must never collapse
 * a layout or show a broken image. When the file is not yet in /public/assets
 * this renders the dashed reserved frame the design uses for pending fleet
 * photography, at the same aspect ratio, and says what is required.
 *
 * Existence is resolved on the server at render time, so no placeholder request
 * is ever made and no client JavaScript is involved.
 */
export function Photo({
  photo,
  className,
  alt,
  priority = false,
  sizes,
  placeholder = "Perficient photography pending",
}: PhotoProps) {
  const filePath = path.join(process.cwd(), "public", photo.src);

  if (existsSync(filePath)) {
    return (
      <Image
        className={className}
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={alt ?? photo.alt}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  /* Decorative photography (alt="") stays out of the accessibility tree
     entirely rather than announcing a placeholder. */
  const decorative = alt === "";

  return (
    <div
      className={[styles.reserved, className].filter(Boolean).join(" ")}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : `Reserved for Perficient photography: ${alt ?? photo.alt}`}
      aria-hidden={decorative ? true : undefined}
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
    >
      <span className={styles.reservedInner}>
        <CarMark />
        {placeholder}
        <br />
        <code>{photo.src}</code>
      </span>
    </div>
  );
}

function CarMark() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M10 41l5-16h34l5 16M20 25l5-10h14l5 10M7 41h50v9H7z" />
      <circle cx="18" cy="50" r="4" />
      <circle cx="46" cy="50" r="4" />
    </svg>
  );
}
