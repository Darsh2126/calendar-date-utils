// utils/time.ts

/**
 * Predefined locale codes for formatting dates and times.
 * Users can also pass a custom string if needed.
 */
export type SupportedLocale =
  | "en-US"
  | "en-GB"
  | "fr-FR"
  | "de-DE"
  | "es-ES"
  | "it-IT"
  | "ja-JP"
  | "zh-CN"
  | "hi-IN"
  | (string & {}); // Allows any custom locale string

export type GetCurrentTimingOptions = {
  /**
   * Locale string used to format day and time. Defaults to 'en-US'.
   * Example: 'en-GB', 'fr-FR'.
   */
  locale?: SupportedLocale;

  /**
   * Whether to include seconds in the time string. Defaults to true.
   */
  includeSeconds?: boolean;
};

export type CurrentTiming = {
  year: number;
  month: number;
  date: number;
  day: string;
  time: string;
  timestamp: number;
  iso: string;
  utc: string;
};

/**
 * Returns various details about the current date and time.
 *
 * @param {GetCurrentTimingOptions} [options={}] - Optional configuration.
 * @returns {CurrentTiming} Object containing date/time details.
 */
export function getCurrentTiming(
  options: GetCurrentTimingOptions = {}
): CurrentTiming {
  const { locale = "en-US", includeSeconds = true } = options;

  const now = new Date();

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    ...(includeSeconds && { second: "2-digit" }),
  };

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    date: now.getDate(),
    day: now.toLocaleString(locale, { weekday: "long" }),
    time: now.toLocaleTimeString(locale, timeOptions),
    timestamp: now.getTime(),
    iso: now.toISOString(),
    utc: now.toUTCString(),
  };
}
