# 📅 calendar-date-utils

A lightweight and flexible date utility library for building calendars, date pickers, and time-based applications.

## ✨ Features
- Generate calendar grids and week numbers
- Compare and merge dates (ignore time when needed)
- Simple formatting and parsing helpers
- Disable dates with min/max/exclude rules
- Works with npm, pnpm, yarn, bun
- TypeScript types included
- Deno-compatible via `esm.sh`

---

## 📦 Installation

```bash
# npm
npm install calendar-date-utils

# pnpm
pnpm add calendar-date-utils

# yarn
yarn add calendar-date-utils

# bun
bun add calendar-date-utils
```

### Deno

```ts
import { getMonthMatrix } from "https://esm.sh/calendar-date-utils";
```

---

## 🚀 Quick start

```ts
import {
  getMonthMatrix,
  getWeekdayNames,
  formatDate,
  addMonths,
} from "calendar-date-utils";

// August 2025 matrix (weeks x days)
const matrix = getMonthMatrix(2025, 7);

// Weekday headers (Mon-start)
const headers = getWeekdayNames("en-US", "short", 1); // ["Mon", "Tue", ...]

// Format a single day
const label = formatDate(matrix[0].date, "YYYY-MM-DD");

// Navigate months
const nextMonth = addMonths(new Date(2025, 7, 15), 1);
```

---

## 📚 API Reference

All functions are tree-shakeable and available from the top-level import.

### `getMonthMatrix(year: number, monthIndex: number | MonthName): CalendarDay[]`
Generate a 6x7 calendar matrix for a given month. Includes trailing/leading days to fill weeks.

- **year**: full year (e.g., 2025)
- **monthIndex**: 0-based month (0 = Jan, 11 = Dec)
- **returns**: a array (weeks x days) of `CalendarDay`

`CalendarDay` type:

```ts
type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
};
```

```ts
type MonthName = =
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
```

Example:

```ts
const matrix = getMonthMatrix(2025, 7); // August 2025
matrix[0].date;        // Date
matrix[0].isCurrentMonth; // boolean
```

### `getWeekdayNames(locale = "en-US", format = "short", weekStart: 0 | 1 = 0): string[]`
Returns weekday labels adjusted for locale, style, and week start (Sunday or Monday).

Example:

```ts
getWeekdayNames("en-US", "short", 1); // ["Mon", "Tue", ...]
```

### `getWeekNumber(date: Date): number`
ISO-8601 week number (1-53).

```ts
getWeekNumber(new Date("2025-01-01")); // 1
```

### `addDays(date: Date, amount: number): Date`
Add (or subtract) a number of days.

```ts
addDays(new Date("2025-08-18"), 7); // Aug 25, 2025
```

### `addMonths(date: Date, amount: number): Date`
Add (or subtract) a number of months. Preserves day when possible (rolls if needed).

```ts
addMonths(new Date("2025-01-31"), 1); // Feb 28 (or 29 in leap year)
```

### `formatDate(date: Date, format: string, locale = "en-US"): string`
Simple date formatting using `Intl.DateTimeFormat` under the hood.

Supported tokens:
- `YYYY` year
- `MM` 2-digit month
- `MMM` short month name
- `DD` 2-digit day
- `ddd` short weekday name
- `dddd` long weekday name

Examples:

```ts
formatDate(new Date("2025-08-18"), "YYYY-MM-DD");      // "2025-08-18"
formatDate(new Date("2025-08-18"), "ddd, MMM DD");     // e.g. "Mon, Aug 18"
```

### `parseDate(dateString: string, format: string): Date | null`
Parse a string into a `Date`. Supports:
- `YYYY-MM-DD`
- `DD/MM/YYYY`
Falls back to native `new Date(dateString)` if format is not matched.

```ts
parseDate("2025-08-18", "YYYY-MM-DD"); // Date
parseDate("18/08/2025", "DD/MM/YYYY"); // Date
```

### `isSameDate(date1: Date, date2: Date): boolean`
Compare two dates ignoring the time part.

```ts
isSameDate(new Date("2025-08-18"), new Date("2025-08-18")); // true
```

### `mergeDateAndTime(date: Date, hours: number, minutes: number): Date`
Merge a date with specific hours and minutes (seconds and ms set to 0).

```ts
mergeDateAndTime(new Date("2025-01-01"), 14, 30); // 2025-01-01T14:30:00
```

### `getDateRange(start: Date, end: Date): Date[]`
Inclusive date range from `start` to `end`.

```ts
getDateRange(new Date("2025-01-01"), new Date("2025-01-05"));
// [Jan 1, Jan 2, Jan 3, Jan 4, Jan 5]
```

### `isDateDisabled(date: Date, rules: { min?: Date; max?: Date; exclude?: (d: Date) => boolean }): boolean`
Return `true` if a date is outside `min`/`max` or matches a custom `exclude` predicate.

```ts
isDateDisabled(new Date("2025-01-01"), { min: new Date("2025-01-10") }); // true
```

### `getCurrentTiming(options)`


### Description
`getCurrentTiming` returns an object containing current date, time, and various formats (ISO, UTC, timestamp).  
You can specify a locale and choose whether to include seconds in the formatted time.

---

### Parameters

| Name            | Type                        | Required | Default  | Description                                    |
|-----------------|---------------------------|----------|----------|------------------------------------------------|
| `locale`        | `string`                  | No       | `'en-US'`| Locale for formatting day/time. E.g. `'fr-FR'`.|
| `includeSeconds`| `boolean`                 | No       | `true`   | Whether to include seconds in time string.     |

---

### Return Type

`CurrentTiming` object:

| Key        | Type     | Description                                   |
|------------|----------|-----------------------------------------------|
| `year`     | `number` | Current year.                                |
| `month`    | `number` | Month (1-12).                               |
| `date`     | `number` | Date (1-31).                                |
| `day`      | `string` | Day of the week.                            |
| `time`     | `string` | Local time string.                          |
| `timestamp`| `number` | Unix timestamp (ms since epoch).            |
| `iso`      | `string` | ISO 8601 formatted date string.             |
| `utc`      | `string` | UTC formatted date string.                  |

---

### Examples

```ts
import { getCurrentTiming } from './utils/time';

// Default
console.log(getCurrentTiming());
/*
{
  year: 2025,
  month: 8,
  date: 23,
  day: 'Saturday',
  time: '02:45:12 PM',
  timestamp: 1692791712000,
  iso: '2025-08-23T09:15:12.000Z',
  utc: 'Sat, 23 Aug 2025 09:15:12 GMT'
}
*/

// Custom locale and no seconds
console.log(getCurrentTiming({ locale: 'fr-FR', includeSeconds: false }));
// { time: '14:45', ... }

---

## 🧩 Import examples

### ESM / TypeScript
```ts
import { getMonthMatrix, formatDate } from "calendar-date-utils";
```

### CommonJS
```js
const { getMonthMatrix, formatDate } = require("calendar-date-utils");
```

---

## 🧪 Example: render a month grid

```ts
import { getMonthMatrix, getWeekdayNames, formatDate } from "calendar-date-utils";

const headers = getWeekdayNames("en-US", "short", 1); // Monday-first
const matrix = getMonthMatrix(2025, 7);

console.log(headers.join(" "));
for (const week of matrix) {
  console.log(
    week
      .map((d) => (d.isCurrentMonth ? formatDate(d.date, "DD") : "  "))
      .join(" ")
  );
}
```

## 🛠️ Troubleshooting: Type Suggestions in Vite/VSCode

If you installed `calendar-date-utils` via npm and do not see type suggestions in VSCode, ensure your project's `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "Node"
  }
}
```

If you use Vite, this is usually set by default, but you can explicitly add it to avoid issues.

If you see `"resolvePackageJsonExports": false` suggestion, you can ignore it—this package is compatible with Node-style resolution.

For best results, restart VSCode after updating your `tsconfig.json`.

### NOTE: This seems only appear for Vite based in other like Next it is getting suggestion

---

## 🛠️ Contributing

Issues and PRs are welcome. Please open an issue if you spot a bug or want to request a feature.

---

## 📄 License

MIT © Darsh Gajdhar
