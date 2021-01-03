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
 * Inserts an element at the given index of the array (mutative).
 * @param {number} i - The index in which to insert the element.
 * @param {*} v - Element to be inserted.
 * @param {array} arr - The array to be mutated.
 */
export const insertAt = (i, v, arr) => {
  arr.splice(i + 1, 0, v);
  return arr;
};

/**
 * Gets a random element from an array.
 * @param {array} arr - The array to be sampled.
 */
export const sample = arr => arr[Math.floor(Math.random() * arr.length)];
