/**
 * Utility function to ensure a date is in UTC
 */
export function toUTCDate(date: Date | string): Date {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
}

/**
 * Utility function to check if a date is within a range
 */
export function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  const d = toUTCDate(date);
  const start = toUTCDate(startDate);
  const end = toUTCDate(endDate);
  return d >= start && d <= end;
}

/**
 * Utility function to calculate week number from a date
 */
export function getWeekNumber(date: Date): number {
  const d = toUTCDate(date);
  const firstDayOfYear = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const pastDaysOfYear = (d.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getUTCDay() + 1) / 7);
}

/**
 * Utility function to get start of week from a date
 */
export function getStartOfWeek(date: Date): Date {
  const d = toUTCDate(date);
  const day = d.getUTCDay();
  const diff = d.getUTCDate() - day + (day === 0 ? -6 : 1);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), diff));
}

/**
 * Utility function to format a date as YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Utility function to check if a value is a valid UUID
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Utility function to calculate the difference in days between two dates
 */
export function daysBetween(date1: Date, date2: Date): number {
  const d1 = toUTCDate(date1);
  const d2 = toUTCDate(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Utility function to check if an object has all required properties
 */
export function hasRequiredProperties<T extends object>(obj: T, requiredProps: (keyof T)[]): boolean {
  return requiredProps.every(prop => prop in obj && obj[prop] !== undefined && obj[prop] !== null);
}

/**
 * Utility function to remove undefined properties from an object
 */
export function removeUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  ) as Partial<T>;
} 