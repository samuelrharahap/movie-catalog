/**
 * Extracts the year from a given date string.
 *
 * @param date - The date string from which to extract the year.
 * @returns The year as a string, or '-' if the date is invalid.
 */
export function getYearFromDate(date: string): string {
  return date ? new Date(date).getFullYear().toString() : '-';
}
