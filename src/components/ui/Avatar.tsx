import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

import styles from "./Avatar.module.css";

const EXTENSIONS = [".jpeg", ".jpg", ".png", ".webp"];

type AvatarProps = {
  /** Person's name — used for the alt text and the initials fallback. */
  name: string;
  /** Path without extension, e.g. "/assets/testimonials/obinna-nweke". */
  basePath: string;
  /** Rendered diameter in px. */
  size?: number;
};

/**
 * Circular portrait with an initials fallback.
 *
 * Client photographs are optional and arrive one at a time, so the slot is
 * always laid out at a fixed size: the name never shifts when a photo is added.
 * Any of .jpeg/.jpg/.png/.webp at `basePath` is picked up automatically.
 */
export function Avatar({ name, basePath, size = 44 }: AvatarProps) {
  const found = EXTENSIONS.map((ext) => `${basePath}${ext}`).find((src) =>
    existsSync(path.join(process.cwd(), "public", src)),
  );

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <span className={styles.avatar} style={{ width: size, height: size }}>
      {found ? (
        <Image src={found} alt={name} width={size * 2} height={size * 2} sizes={`${size}px`} />
      ) : (
        <span className={styles.initials} aria-hidden="true">
          {initials}
        </span>
      )}
    </span>
  );
}
