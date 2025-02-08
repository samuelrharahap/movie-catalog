export function getYearFromDate(date: string): string {
  return date ? new Date(date).getFullYear().toString() : '-';
}
