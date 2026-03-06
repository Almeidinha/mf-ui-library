import {
  addDays,
  format as dfFormat,
  getDay as dfGetDay,
  isValid,
  parse as dfParse,
  parseISO,
  subDays,
} from "date-fns";

type DateLike = Date | string | number;

type TokenStyle = "date-fns" | "moment"; // "moment" covers Moment/Dayjs-ish tokens

type FormatOptions = {
  /**
   * If input is a non-ISO string (e.g. "06/03/2026"), provide its format.
   * If omitted, we try ISO parsing first.
   */
  inputFormat?: string;

  /**
   * Token style for input/output formats.
   * - "date-fns": yyyy-MM-dd (date-fns tokens)
   * - "moment":   YYYY-MM-DD (Moment/Dayjs tokens)
   */
  inputTokens?: TokenStyle;
  outputTokens?: TokenStyle;

  /**
   * What to return if parsing fails.
   * Default: empty string.
   */
  fallback?: string;
};

/**
 * Format any Date-like value into a target format, optionally converting
 * between token styles and parsing a specified input format.
 */
export function formatDate(
  value: DateLike | null | undefined,
  outputFormat: string,
  opts: FormatOptions = {},
): string {
  const {
    inputFormat,
    inputTokens = "date-fns",
    outputTokens = "date-fns",
    fallback = "",
  } = opts;

  if (value == null) {
    return fallback;
  }

  const date = coerceToDate(value, { inputFormat, inputTokens });
  if (!date || !isValid(date)) {
    return fallback;
  }

  const dfOut =
    outputTokens === "moment" ? momentToDateFns(outputFormat) : outputFormat;
  return dfFormat(date, dfOut);
}

/**
 * Safe weekday getter for Date-like inputs.
 *
 * Notes:
 * - JS (and date-fns) parsing of "YYYY-MM-DD" via `new Date(str)` treats it as UTC midnight.
 *   Converting that to local time can shift the calendar day, leading to wrong weekdays.
 * - Here we parse date-only strings as *local* dates to keep weekdays stable.
 */
export function getDay(value: DateLike): number {
  const date = coerceToDate(value, { inputTokens: "date-fns" });
  return date && isValid(date) ? dfGetDay(date) : Number.NaN;
}

function coerceToDate(
  value: DateLike,
  opts: { inputFormat?: string; inputTokens: TokenStyle },
): Date | null {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "number") {
    const d = new Date(value);
    return isValid(d) ? d : null;
  }

  const str = String(value).trim();
  if (!str) {
    return null;
  }

  // Special-case date-only strings to avoid UTC parsing surprises.
  // date-fns `parseISO("YYYY-MM-DD")` and JS `new Date("YYYY-MM-DD")` can shift the weekday
  // depending on the local timezone.
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const parsed = dfParse(str, "yyyy-MM-dd", new Date());
    return isValid(parsed) ? parsed : null;
  }

  // 1) Try ISO first (handles "YYYY-MM-DD" and full ISO strings)
  // parseISO accepts many ISO variations; if it fails it returns Invalid Date.
  const iso = parseISO(str);
  if (isValid(iso)) {
    return iso;
  }

  // 2) If caller supplied inputFormat, use it
  if (opts.inputFormat) {
    const dfIn =
      opts.inputTokens === "moment"
        ? momentToDateFns(opts.inputFormat)
        : opts.inputFormat;

    // Use an arbitrary reference date required by date-fns parse
    const parsed = dfParse(str, dfIn, new Date());
    if (isValid(parsed)) {
      return parsed;
    }
  }

  // 3) Last resort: let Date try (not recommended, but helps with some inputs)
  const d = new Date(str);
  return isValid(d) ? d : null;
}

/**
 * Convert common Moment/Dayjs tokens to date-fns tokens.
 * This is not “every token ever”, but covers the common ones:
 * Year, month, day, hour, minute, second, am/pm, timezone-ish.
 */
export function momentToDateFns(fmt: string): string {
  // IMPORTANT: order matters (replace longer tokens first)
  return (
    fmt
      // Year
      .replace(/YYYY/g, "yyyy")
      .replace(/YY/g, "yy")
      // Month
      .replace(/MMMM/g, "MMMM")
      .replace(/MMM/g, "MMM")
      .replace(/MM/g, "MM")
      .replace(/\bM\b/g, "M")
      // Day of month
      .replace(/DD/g, "dd")
      .replace(/\bD\b/g, "d")
      // Day of week
      .replace(/dddd/g, "EEEE")
      .replace(/ddd/g, "EEE")
      // Hours
      .replace(/HH/g, "HH")
      .replace(/\bH\b/g, "H")
      .replace(/hh/g, "hh")
      .replace(/\bh\b/g, "h")
      // Minutes/seconds
      .replace(/mm/g, "mm")
      .replace(/ss/g, "ss")
      // AM/PM
      .replace(/A/g, "aa")
      .replace(/a/g, "aa")
      // Fractional seconds
      .replace(/SSS/g, "SSS")
  );
}

export { addDays, subDays };
