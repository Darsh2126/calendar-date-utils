/**
 * Add days to a given date.
 *
 * @param date - The base date
 * @param amount - Number of days to add (can be negative)
 * @returns New date with added days
 *
 * @example
 * addDays(new Date("2025-08-18"), 7); // Aug 25, 2025
 */
export function addDays(date: Date, amount: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + amount);
  return newDate;
}
