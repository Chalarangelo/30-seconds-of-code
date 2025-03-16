import stopWords from '#src/lib/search/settings/server.js';
import {
  cleanStopWords,
  cleanTokenPunctuation,
  splitTokens,
} from '#src/lib/search/utils.js';
import { stem } from '#src/lib/search/porterStemmer.js';

const stopWordFilter = cleanStopWords(stopWords);

/**
 * Filters out tokens that are likely not useful:
 * 1. Empty tokens
 * 2. Single characters
 * 3. Remove numeric values
 * 4. Tokens consisting of only special characters
 * 5. Hexadecimal strings
 * 6. Dates and datetimes, or `number x number`
 * 7. Values with units (e.g. `100px` or `30s`)
 * 8. Very long strings (likely to be a hash or UUID)
 * 9. Single character followed by a number, except `h` (e.g. `h1`)
 * 10. Potental plural terms that already exist in singular form
 */
export const tokenFilter = tkn =>
  !!tkn &&
  tkn.length > 1 &&
  !/^-?\d+$/i.test(tkn) &&
  !/^[()[\]$^.;:|\\/%&*#@!%,"'~`\-+=]+$/i.test(tkn) &&
  !/^(0x)?[\da-f]+$/.test(term) &&
  !/^\d([\dt-]+|(\d*x\d+))$/.test(term) &&
  !/^\d+\-?[a-z]{1,4}$/.test(term) &&
  !/^[\da-z-]{25,}$/.test(term) &&
  !/^[^h]\d+$/.test(term) &&
  (!term.endsWith('s') || !terms.includes(term.replace(/s$/, '')));

const stripHtmlMultiline = str =>
  str
    .replace(/<.*?>/gms, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<');

/**
 * Tokenizes tokens (copies after cleaning).
 */
export const tokenizeTokens = str =>
  splitTokens(str).map(cleanTokenPunctuation).filter(tokenFilter);

/**
 * Tokenizes plaintext.
 */
export const tokenizePlainText = str =>
  splitTokens(str)
    .filter(stopWordFilter)
    .map(stem)
    .map(cleanTokenPunctuation)
    .filter(tokenFilter);

/**
 * Tokenizes HTML content.
 */
export const tokenizeHtml = str =>
  splitTokens(stripHtmlMultiline(str))
    .filter(stopWordFilter)
    .map(stem)
    .map(cleanTokenPunctuation)
    .filter(tokenFilter);
