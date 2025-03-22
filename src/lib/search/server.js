import stopWords from '#src/lib/search/settings.js';
import { cleanTokenPunctuation, splitTokens } from '#src/lib/search/utils.js';
import { stem } from '#src/lib/search/porterStemmer.js';

const stopWordFilter = tkn => !stopWords.has(tkn);

/**
 * Filters out tokens that are likely not useful:
 * 1. Empty tokens
 * 2. Tokens with only one or two characters
 * 3. Remove numeric values or values starting with a number
 * 4. Tokens consisting of only special characters
 * 5. Hexadecimal strings
 * 6. Dates and datetimes, or `number x number`
 * 7. Values with units (e.g. `100px` or `30s`)
 * 8. Very long strings (likely to be a hash or UUID)
 * 9. Single character followed by a number, except `h` (e.g. `h1`)
 * 10. Regexp-like matchers (e.g. `a-z` or `a-z0-9`)
 * 11. Encoded HTML entities (e.g. `x3c`)
 * 12. Variable names (e.g. `str`, `str1`)
 * 13. Common variable names with a number (e.g. `string1`, `array2`)
 * 14. 3-letter stop words (e.g. `the`)
 * 15. Potental plural terms that already exist in singular form
 */
const tokenFilter = (tkn, tokenSet) =>
  !!tkn &&
  (tkn === 'js' || tkn.length > 2) &&
  !/^-?\d+/i.test(tkn) &&
  !/^[()[\]$^.;:|\\/%&*#@!%,"'~`\-+=]+$/i.test(tkn) &&
  !/^(0x)?[\da-f]+$/.test(tkn) &&
  !/^\d([\dt-]+|(\d*x\d+))$/.test(tkn) &&
  !/^\d+\-?[a-z]{1,4}$/.test(tkn) &&
  !/^[\da-z-]{25,}$/.test(tkn) &&
  !/^[^h]\d+$/.test(tkn) &&
  !/^(?:.-.){1,}$/.test(tkn) &&
  !/^x\d.$/.test(tkn) &&
  !/^(?:str|obj|arr|num|var|let|col)\d{0,}$/.test(tkn) &&
  !/^(?:string|array|pattern|commit-|patch-|image)\d{1,}$/.test(tkn) &&
  (tkn.length > 3 || !stopWords.has(tkn)) &&
  (!tkn.endsWith('s') || !tokenSet.has(tkn.replace(/s$/, '')));

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
const tokenizeTokens = str => splitTokens(str).map(cleanTokenPunctuation);

/**
 * Tokenizes plaintext (stemming and cleaning).
 */
const tokenizePlainText = str =>
  splitTokens(str)
    .filter(stopWordFilter)
    .map(tkn => cleanTokenPunctuation(stem(tkn)));

/**
 * Tokenizes HTML content (strips tags and tokenizes plaintext).
 */
const tokenizeHtml = str => tokenizePlainText(stripHtmlMultiline(str));

const tokenizerByContentType = {
  html: tokenizeHtml,
  text: tokenizePlainText,
  tokens: tokenizeTokens,
};

const tokenizeByContentType = (contentType, content) =>
  tokenizerByContentType[contentType](content);

export const tokenize = contents => {
  const tokenized = Object.entries(contents).reduce(
    (acc, [contentType, content]) =>
      acc.concat(tokenizeByContentType(contentType, content)),
    []
  );

  const tokenSet = new Set(tokenized);

  const tokenizedMapped = tokenized.reduce((acc, tkn) => {
    if (tokenFilter(tkn, tokenSet)) {
      if (!acc.has(tkn)) acc.set(tkn, 0);
      acc.set(tkn, acc.get(tkn) + 1);
    }
    return acc;
  }, new Map());

  return [...tokenizedMapped.entries()]
    .map(([token, count]) => {
      if (count === 1) return token;
      else return `${token}:${count}`;
    })
    .join(' ');
};
