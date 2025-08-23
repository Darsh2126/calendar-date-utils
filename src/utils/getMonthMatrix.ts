// CalendarDay type for getMonthMatrix
export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
};

/**
 * Generate a 6x7 calendar matrix for rendering monthly views.
 * Includes days from previous and next month to fill weeks.
 *
 * @param year - Full year (e.g., 2025)
 * @param monthIndex - 0-based month (0 = January, 11 = December)
 * @returns A 2D array of CalendarDay objects grouped by weeks
 *
 * @example
 * getMonthMatrix(2025, 7); // August 2025 as a matrix
 */
export function getMonthMatrix(
  year: number,
  monthIndex: number
): CalendarDay[] {
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);

  // Start from Sunday of the first visible week
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // End at Saturday of the last visible week
  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const days: CalendarDay[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    days.push({
      date: new Date(current),
      isCurrentMonth: current.getMonth() === monthIndex,
    });
    current.setDate(current.getDate() + 1);
  }

  return days; // 42 days max (6 weeks * 7 days)
}
