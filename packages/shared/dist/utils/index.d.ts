/**
 * Utility function to ensure a date is in UTC
 */
export declare function toUTCDate(date: Date | string): Date;
/**
 * Utility function to check if a date is within a range
 */
export declare function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean;
/**
 * Utility function to calculate week number from a date
 */
export declare function getWeekNumber(date: Date): number;
/**
 * Utility function to get start of week from a date
 */
export declare function getStartOfWeek(date: Date): Date;
/**
 * Utility function to format a date as YYYY-MM-DD
 */
export declare function formatDate(date: Date): string;
/**
 * Utility function to check if a value is a valid UUID
 */
export declare function isValidUUID(uuid: string): boolean;
/**
 * Utility function to calculate the difference in days between two dates
 */
export declare function daysBetween(date1: Date, date2: Date): number;
/**
 * Utility function to check if an object has all required properties
 */
export declare function hasRequiredProperties<T extends object>(obj: T, requiredProps: (keyof T)[]): boolean;
/**
 * Utility function to remove undefined properties from an object
 */
export declare function removeUndefined<T extends object>(obj: T): Partial<T>;
