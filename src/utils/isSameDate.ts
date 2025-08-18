/**
 * Compare two dates ignoring time
 *
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if both dates fall on the same year, month, and day
 *
 * @example
 * isSameDate(new Date("2025-08-18"), new Date("2025-08-18")); // true
 */
export function isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
