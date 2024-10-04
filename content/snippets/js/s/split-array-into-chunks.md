---
title: Split a JavaScript array into chunks
shortTitle: Split array into chunks
language: javascript
tags: [array,function,generator]
cover: filter-coffee-pot
excerpt: Chunk an array or iterable into arrays of a specified size or a given number of chunks.
listed: true
dateModified: 2023-11-07
---

## Split array into chunks of a given size

In order to split an array into chunks of a given size, you need to know the **amount of chunks that will be produced**. This can be calculated by dividing the length of the array by the size of each chunk and rounding up to the nearest integer, using `Math.ceil()`.

Using that number, you can create a new array with the specified length, using `Array.from()`. The second argument of `Array.from()` is a mapping function that will be called for each element of the new array. Using that in combination with `Array.prototype.slice()`, you can map each element of the new array to a chunk the length of `size`. If the original array can't be split evenly, the final chunk will contain the remaining elements.

```js
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

## Split array into a given number of chunks

Similarly, in order to split an array into a given number of chunks, you need to **know the size of each chunk**. This can be calculated by dividing the length of the array by the number of chunks and rounding up to the nearest integer, using `Math.ceil()`. The rest of the process is the same as above.

```js
const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]
```

## Split array into chunks, without dangling elements

As mentioned previously, **the final chunk can contain fewer elements** than the specified size, if the original array can't be split evenly. In order to alter this behavior, you can modify the code snippet to accommodate an additional parameter for the **minimum chunk size**.

Instead of calculating the number of chunks, we first use the [modulo operator (`%`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder) to find how many elements will be left over after splitting the array into chunks of the specified size. Depending on whether the remainder is less than the minimum chunk size, we can either use `Math.floor()` or `Math.ceil()` to calculate the number of chunks.

The rest of the process is pretty much the same. The only notable exception is that the **last chunk's calculation** is slightly different, as it needs to include the remaining elements, shall the remainder be less than the minimum chunk size.

```js
const chunkWithMinSize = (arr, chunkSize, minChunkSize = 0) => {
  const remainder = arr.length % chunkSize;
  const isLastChunkTooSmall = remainder < minChunkSize;
  const totalChunks = isLastChunkTooSmall
    ? Math.floor(arr.length / chunkSize)
    : Math.ceil(arr.length / chunkSize);
  return Array.from({ length: totalChunks }, (_, i) => {
    const chunk = arr.slice(i * chunkSize, i * chunkSize + chunkSize);
    if (i === totalChunks - 1 && isLastChunkTooSmall)
      chunk.push(...arr.slice(-remainder));
    return chunk;
  });
};

const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

chunkWithMinSize(x, 5, 3); // [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11]]
chunkWithMinSize(x, 4, 2); // [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11]]
```

## Split iterable into chunks of a given size

Any iterable can be chunked in a similar fashion, using a **generator function**. The only difference is that the iterable needs to be iterated over using a `for...of` loop, instead of `Array.prototype.slice()`. This is due to the fact that the **number of chunks cannot be determined in advance**.

Each value iterated is added to the current `chunk`, using `Array.prototype.push()`. Once the `chunk` reaches the specified `size`, you can `yield` the value and reset the `chunk` to an empty array. Finally, you can check if the final `chunk` is non-empty and `yield` it as well.

```js
const chunkify = function* (itr, size) {
  let chunk = [];
  for (const v of itr) {
    chunk.push(v);
    if (chunk.length === size) {
      yield chunk;
      chunk = [];
    }
  }
  if (chunk.length) yield chunk;
};

const x = new Set([1, 2, 1, 3, 4, 1, 2, 5]);

[...chunkify(x, 2)]; // [[1, 2], [3, 4], [5]]
```
