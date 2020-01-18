import { transformTagName } from 'functions/transformers';

/** Chunks an array into smaller arrays of a specified size. */
export const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

/** Transform the indexed snippets to appropriate format */
export const transformSnippetIndex = edges =>
  edges
    .map(edge => edge.node)
    .map(node => ({
      title: node.title,
      expertise: transformTagName(node.expertise),
      primaryTag: transformTagName(node.tags.primary),
      language: node.language.long,
      description: node.html.description.trim(),
      url: node.slug,
      searchTokens: node.searchTokens,
    }));

/** Returns all unique values of an array. */
export const uniqueElements = arr => [...new Set(arr)];

/** Returns an array of elements that appear in both arrays. */
export const similarity = (arr, values) => arr.filter(v => values.includes(v));

/** Returns a random element from an array, using the provided weights as the probabilities for each element. */
export const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce((acc, w, i) =>
        i === 0 ? [w] : [...acc, acc[acc.length - 1] + w],
      []
      )
      .findIndex((v, i, s) =>
        roll >= (i === 0 ? 0 : s[i - 1]) && roll < v
      )
  ];
};
