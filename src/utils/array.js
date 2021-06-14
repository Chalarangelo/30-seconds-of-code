/**
 * Chunks an array into smaller arrays of a specified size.
 * @param {array} arr - The array to be chunked.
 * @param {number} size - The size of each chunk.
 */
export const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

/**
 * Returns all unique values of an array.
 * @param {array} arr - The array to be deduplicated.
 */
export const uniqueElements = arr => [...new Set(arr)];

/**
 * Gets a random element from an array.
 * @param {array} arr - The array to be sampled.
 */
export const sample = arr => arr[Math.floor(Math.random() * arr.length)];

/**
 * Randomizes the order of the values of an array, returning a new array.
 * @param {array} arr - The array to be shuffled.
 * @returns {array} - The shuffled array
 */
export const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
