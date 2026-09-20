/** Formatting helpers shared by the catalogue, the estimator and the forms. */

/** ₦1,500,000 — always tabular, never rounded or abbreviated. */
export function money(value: number): string {
  return `₦${value.toLocaleString("en-NG")}`;
}

/** "1 day" / "3 days" */
export function days(count: number): string {
  return `${count} ${count === 1 ? "day" : "days"}`;
}

/** Local `datetime-local` / `date` min attribute, so past dates cannot be picked. */
export function localNowISO(): string {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();
}

/**
 * Inclusive hire length between a pickup datetime and a return date.
 * Returns null when either side is missing or the return precedes the pickup,
 * which is the estimator's cue to show the plain day rate instead of a total.
 */
export function hireDays(pickup: string, returnDate: string): number | null {
  if (!pickup || !returnDate) return null;

  const start = new Date(`${pickup.slice(0, 10)}T00:00:00`);
  const end = new Date(`${returnDate.slice(0, 10)}T00:00:00`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return null;
  }

  return Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1);
}

/** Stable DOM id fragment from a vehicle name. */
export function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Renders the `**bold**` spans used in the hire terms copy.
 * Deliberately minimal: the only markup the terms list needs.
 */
export function splitEmphasis(text: string): { text: string; strong: boolean }[] {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part) =>
    part.startsWith("**") && part.endsWith("**")
      ? { text: part.slice(2, -2), strong: true }
      : { text: part, strong: false },
  );
}
