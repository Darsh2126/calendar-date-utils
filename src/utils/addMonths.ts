/**
 * Add months to a given date.
 * Preserves the day if possible, but may roll over to the next month.
 *
 * @param date - The base date
 * @param amount - Number of months to add (can be negative)
 * @returns New date with added months
 *
 * @example
 * addMonths(new Date("2025-01-31"), 1); // Feb 28 (or 29 in leap year)
 */
export function addMonths(date: Date, amount: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + amount);
  return newDate;
}
