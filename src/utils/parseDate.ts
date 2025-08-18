/**
 * Parse a string into a Date object based on a format.
 * Supports "YYYY-MM-DD" and "DD/MM/YYYY".
 *
 * @param dateString - Input string
 * @param format - Format to parse
 * @returns Parsed Date or null if invalid
 *
 * @example
 * parseDate("2025-08-18", "YYYY-MM-DD"); // Mon Aug 18 2025
 * parseDate("18/08/2025", "DD/MM/YYYY"); // Mon Aug 18 2025
 */
export function parseDate(dateString: string, format: string): Date | null {
  try {
    if (format === "YYYY-MM-DD") {
      const [year, month, day] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day);
    }
    if (format === "DD/MM/YYYY") {
      const [day, month, year] = dateString.split("/").map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date(dateString);
  } catch {
    return null;
  }
}
