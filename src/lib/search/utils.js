/**
 * Normalizes and tokenizs a string.
 */
export const splitTokens = str =>
  str
    .toLowerCase()
    .trim()
    .split(/[^a-z0-9\-']+/i);

/**
 * Remove leading and trailing punctuation (' and -) and leftover single quotes.
 */
export const cleanTokenPunctuation = tkn =>
  tkn.replace(/^['-]+|['-]+$/g, '').replace("'", '');

/**
 * Removes stop words from an array of words (curried):
 * - Use the list of stop words to remove stop words from the given array
 */
export const cleanStopWords = stopwords => {
  const stopWords = new Set(stopwords);
  return tkn => !stopWords.has(tkn);
};
