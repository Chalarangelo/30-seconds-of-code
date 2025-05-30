// src/snippets/capitalize.js
/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The string to capitalize.
 * @returns {string} The capitalized string.
 * @example
 * capitalize("hello"); // "Hello"
 * capitalize("world"); // "World"
 */
export const capitalize = (str) => {
  if (typeof str !== "string" || str.length === 0) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

console.log()
