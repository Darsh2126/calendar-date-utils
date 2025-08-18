/**
 * Generate an array of consecutive dates between two dates (inclusive).
 *
 * @param start - Start date
 * @param end - End date
 * @returns Array of Date objects from start to end
 *
 * @example
 * getDateRange(new Date("2025-01-01"), new Date("2025-01-05"));
 * // [Jan 1, Jan 2, Jan 3, Jan 4, Jan 5]
 */
export function getDateRange(start: Date, end: Date): Date[] {
  const range: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    range.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return range;
}
