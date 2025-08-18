/**
 * Merge a date with specific hours and minutes.
 *
 * @param date - Base date
 * @param hours - Hours (0-23)
 * @param minutes - Minutes (0-59)
 * @returns New date with merged time
 *
 * @example
 * mergeDateAndTime(new Date("2025-01-01"), 14, 30);
 * // 2025-01-01T14:30:00
 */
export function mergeDateAndTime(
  date: Date,
  hours: number,
  minutes: number
): Date {
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
}
