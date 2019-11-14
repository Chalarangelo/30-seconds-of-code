import * as porterStemmerData from './searchIndexingEngineData/porterStemmerData';
import stopWords from './searchIndexingEngineData/stopWordsData';

/**
 * Tokenizes a string:
 * - Split into words using a regular expression.
 * - Filter words that are under 2 characters long
 */
const tokenize = str =>
  str
    .split(/[^a-z0-9\-']+/i)
    .filter(tkn => !tkn.length < 2)
    .map(tkn => tkn.toLowerCase());

/**
 * Stems a string:
 * - Return as-is if under 3 characters long
 * - Use porter stemmer otherwise
 */
const stem = str => {
  // Exit early
  if(str.length < 3) return str;

  let firstCharacterWasLowerCaseY;
  let match;

  // Detect initial `y`, make sure it never matches.
  if (str.startsWith('y')) {
    firstCharacterWasLowerCaseY = true;
    str = 'Y' + str.slice(1);
  }

  // Step 1a.
  if (porterStemmerData.sfxSsesOrIes.test(str)) {
    // Remove last two characters.
    str = str.slice(0, -2);
  } else if (porterStemmerData.sfxS.test(str)) {
    // Remove last character.
    str = str.slice(0, -1);
  }

  // Step 1b.
  if ((match = porterStemmerData.sfxEED.exec(str))) {
    if (porterStemmerData.gt0.test(match[1])) {
      // Remove last character.
      str = str.slice(0, -1);
    }
  } else if ((match = porterStemmerData.sfxEdOrIng.exec(str)) && porterStemmerData.vowelInStem.test(match[1])) {
    str = match[1];

    if (porterStemmerData.sfxAtOrBlOrIz.test(str)) {
      // Append `e`.
      str += 'e';
    } else if (porterStemmerData.sfxMultiConsonantLike.test(str)) {
      // Remove last character.
      str = str.slice(0, -1);
    } else if (porterStemmerData.consonantLike.test(str)) {
      // Append `e`.
      str += 'e';
    }
  }

  // Step 1c.
  if ((match = porterStemmerData.sfxY.exec(str)) && porterStemmerData.vowelInStem.test(match[1])) {
    // Remove suffixing `y` and append `i`.
    str = match[1] + 'i';
  }

  // Step 2.
  if ((match = porterStemmerData.step2.exec(str)) && porterStemmerData.gt0.test(match[1]))
    str = match[1] + porterStemmerData.step2list[match[2]];

  // Step 3.
  if ((match = porterStemmerData.step3.exec(str)) && porterStemmerData.gt0.test(match[1]))
    str = match[1] + porterStemmerData.step3list[match[2]];

  // Step 4.
  if ((match = porterStemmerData.step4.exec(str))) {
    if (porterStemmerData.gt1.test(match[1]))
      str = match[1];

  } else if ((match = porterStemmerData.sfxIon.exec(str)) && porterStemmerData.gt1.test(match[1]))
    str = match[1];

  // Step 5.
  if (
    (match = porterStemmerData.sfxE.exec(str)) &&
    (porterStemmerData.gt1.test(match[1]) ||
      (porterStemmerData.eq1.test(match[1]) && !porterStemmerData.consonantLike.test(match[1])))
  )
    str = match[1];

  if (porterStemmerData.sfxLl.test(str) && porterStemmerData.gt1.test(str))
    str = str.slice(0, -1);

  // Turn initial `Y` back to `y`.
  if (firstCharacterWasLowerCaseY)
    str = 'y' + str.slice(1);

  return str;
};

/**
 * Removes stop words from an array of words:
 * - Use the list of stop words to remove stop words from the given array
 */
const cleanStopWords = words =>
  words
    .filter(tkn => !stopWords.includes(tkn));

/**
 * Deduplicates a list of tokens.
 */
const deduplicateTokens = tokens => [...new Set(tokens)];

/**
 * Given a string, produce a list of tokens.
 */
const parseTokens = str =>
  deduplicateTokens(
    cleanStopWords(tokenize(str)).map(tkn => stem(tkn))
  ).filter(tkn =>
    !!tkn && !/^-?\d+$/i.test(tkn) && !/^[()[\]$^.;:|\\/%&*#@!%,"'~`\-+=]+$/i.test(tkn)
  );

export default parseTokens;
