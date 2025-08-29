// CalendarDay type for getMonthMatrix
export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
};

export type MonthName =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

/**
 * Generate a 6x7 calendar matrix for rendering monthly views.
 * Includes days from previous and next month to fill weeks.
 *
 * @param year - Full year (e.g., 2025)
 * @param monthIndex - 0-based month (0 = January, 11 = December)
 * @returns A array of 42 CalendarDay objects (6 weeks * 7 days)
 *
 * @example
 * getMonthMatrix(2025, 7); // August 2025 as a array
 */
export function getMonthMatrix(
  year: number,
  month: number | MonthName
): CalendarDay[] {
  // Handle month input as name or number (1-based)
  const monthIndex =
    typeof month === "string"
      ? new Date(`${month} 1, ${year}`).getMonth() // Convert name to index
      : month - 1; // Convert 1-based to 0-based

  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);

  const startDay = firstDayOfMonth.getDay(); // Sunday=0
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

  // 3. Add next month's leading days
  const nextMonthDays = 42 - days.length;
  for (let i = 1; i <= nextMonthDays; i++) {
    const d = new Date(year, monthIndex + 1, i);
    days.push({ date: d, isCurrentMonth: false });
  }

  return days;
}
