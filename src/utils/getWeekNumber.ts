/**
 * Get ISO-8601 week number for a given date.
 *
 * @param date - The date
 * @returns Week number (1-53)
 *
 * @example
 * getWeekNumber(new Date("2025-01-01")); // 1
 */
export function getWeekNumber(date: Date): number {
  const temp = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  temp.setUTCDate(temp.getUTCDate() + 4 - (temp.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
  return Math.ceil(((+temp - +yearStart) / 86400000 + 1) / 7);
}
