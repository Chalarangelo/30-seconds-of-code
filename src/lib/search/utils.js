/**
 * Tokenizes a string:
 * - Split into words using a regular expression.
 * - Filter words that are under 2 characters long
 */
export const splitTokens = str =>
  str
    .toLowerCase()
    .trim()
    .split(/[^a-z0-9\-']+/i)
    .filter(x => x.length >= 2);

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
