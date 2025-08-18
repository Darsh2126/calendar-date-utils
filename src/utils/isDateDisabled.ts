/**
 * Check if a date should be disabled based on rules.
 *
 * @param date - The date to check
 * @param rules - Constraints (min, max, exclude function)
 * @returns True if the date is disabled
 *
 * @example
 * isDateDisabled(new Date("2025-01-01"), { min: new Date("2025-01-10") });
 * // true
 */
export function isDateDisabled(
  date: Date,
  rules: { min?: Date; max?: Date; exclude?: (date: Date) => boolean }
): boolean {
  if (rules.min && date < rules.min) return true;
  if (rules.max && date > rules.max) return true;
  if (rules.exclude && rules.exclude(date)) return true;
  return false;
}
