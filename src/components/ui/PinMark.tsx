/** Rounded pin head with a tapering tail, reading as a P. */
const PIN_PATH =
  "M50 18a24 24 0 0 0-17 41l0 0v19a2 2 0 0 0 3.4 1.4L50 65.8a24 24 0 0 0 0-47.8Zm0 34a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z";

const GRADIENT_ID = "perficient-pin-gradient";

type PinMarkProps = {
  className?: string;
  /** "brand" keeps the blue gradient badge; "mono" inherits currentColor. */
  tone?: "brand" | "mono";
  /** Supplying a title makes the mark meaningful to assistive tech. */
  title?: string;
};

/**
 * The Perficient pin mark: the "P" from the logo, without the wordmark.
 *
 * Drawn rather than cropped out of the supplied logo file, so it stays crisp
 * at any size and can take a currentColor treatment where the full-colour
 * badge would be too loud.
 */
export function PinMark({ className, tone = "brand", title }: PinMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}

      {tone === "brand" ? (
        <defs>
          <linearGradient id={GRADIENT_ID} x1="10%" y1="95%" x2="85%" y2="10%">
            <stop offset="0%" stopColor="oklch(72% 0.16 233)" />
            <stop offset="55%" stopColor="oklch(65.8% 0.178 253)" />
            <stop offset="100%" stopColor="oklch(58% 0.19 262)" />
          </linearGradient>
        </defs>
      ) : null}

      <circle cx="50" cy="50" r="50" fill={tone === "brand" ? `url(#${GRADIENT_ID})` : "currentColor"} />
      <path d={PIN_PATH} fill="var(--surface)" />
    </svg>
  );
}
