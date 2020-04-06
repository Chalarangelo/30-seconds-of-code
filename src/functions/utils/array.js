/** Chunks an array into smaller arrays of a specified size. */
export const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

/** Returns all unique values of an array. */
export const uniqueElements = arr => [...new Set(arr)];

/** Returns an array of elements that appear in both arrays. */
export const similarity = (arr, values) => arr.filter(v => values.includes(v));
