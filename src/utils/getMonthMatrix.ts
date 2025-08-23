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
 * @returns A flat array of 42 CalendarDay objects (6 weeks * 7 days)
 *
 * @example
 * getMonthMatrix(2025, 7); // August 2025 as a flat array
 */
export function getMonthMatrix(
  year: number,
  monthIndex: number
): CalendarDay[] {
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);

  // How many days from the previous month to show
  const startDay = firstDayOfMonth.getDay(); // Sunday = 0
  const totalDaysInMonth = lastDayOfMonth.getDate();

  const days: CalendarDay[] = [];

  // 1. Add previous month's trailing days
  for (let i = startDay - 1; i >= 0; i--) {
    const d = new Date(year, monthIndex, -i);
    days.push({ date: d, isCurrentMonth: false });
  }

  // 2. Add current month's days
  for (let i = 1; i <= totalDaysInMonth; i++) {
    days.push({ date: new Date(year, monthIndex, i), isCurrentMonth: true });
  }

  // 3. Add next month's leading days until we have 42 total
  while (days.length < 42) {
    const nextDate = new Date(
      year,
      monthIndex,
      totalDaysInMonth + (days.length - startDay) + 1
    );
    days.push({ date: nextDate, isCurrentMonth: false });
  }

  return days; // Always 42 days
}
