/**
 * Format a date according to a simple pattern and locale.
 * Supports YYYY, MM, MMM, DD, ddd, dddd.
 *
 * @param date - The date to format
 * @param format - Formatting pattern
 * @param locale - Optional locale (default: "en-US")
 * @returns Formatted date string
 *
 * @example
 * formatDate(new Date("2025-08-18"), "YYYY-MM-DD"); // "2025-08-18"
 * formatDate(new Date("2025-08-18"), "ddd, MMM DD"); // "Mon, Aug 18"
 */
export function formatDate(
  date: Date,
  format: string,
  locale: string = "en-US"
): string {
  const options: Intl.DateTimeFormatOptions = {};

  if (format.includes("YYYY")) options.year = "numeric";
  if (format.includes("MM")) options.month = "2-digit";
  else if (format.includes("MMM")) options.month = "short";
  if (format.includes("DD")) options.day = "2-digit";
  if (format.includes("ddd")) options.weekday = "short";
  if (format.includes("dddd")) options.weekday = "long";

  return new Intl.DateTimeFormat(locale, options).format(date);
}
