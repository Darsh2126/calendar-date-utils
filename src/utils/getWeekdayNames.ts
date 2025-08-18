/**
 * Returns weekday names based on locale, format, and starting day.
 *
 * @param locale - The locale for formatting (default: "en-US")
 * @param format - Either "short", "long", or "narrow" (default: "short")
 * @param weekStart - Which day the week starts on: 0 (Sunday) or 1 (Monday) (default: 0)
 * @returns Array of weekday names
 */
export function getWeekdayNames(
  locale: string = "en-US",
  format: "short" | "long" | "narrow" = "short",
  weekStart: 0 | 1 = 0
): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: format });

  // Pick a reference Sunday (any Sunday works)
  const baseDate = new Date(Date.UTC(2025, 0, 5)); // Sunday, Jan 5 2025
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    formatter.format(new Date(baseDate.getTime() + i * 86400000))
  );

  // Adjust if week starts on Monday
  if (weekStart === 1) {
    return [...weekdays.slice(1), weekdays[0]];
  }

  return weekdays;
}
