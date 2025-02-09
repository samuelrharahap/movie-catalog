/**
 * Converts a number to a string with a specified number of decimal places.
 *
 * @param value - The number to be converted.
 * @param precision - The number of decimal places to include in the output string. Defaults to 1.
 * @returns A string representing the number with the specified number of decimal places.
 */
export const toFixed = (value: number, precision: number = 1) => {
  return value.toFixed(precision);
};

/**
 * Formats a number by adding commas as thousand separators.
 *
 * @param value - The number to be formatted.
 * @returns The formatted number as a string with commas as thousand separators.
 */
export const formatNumber = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
