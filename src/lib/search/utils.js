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
