import stopWords from '#src/lib/search/settings/client.js';
import {
  cleanStopWords,
  cleanTokenPunctuation,
  splitTokens,
} from '#src/lib/search/utils.js';
import { stem } from '#src/lib/search/porterStemmer.js';

// TODO: Is stopword even really necessary for the client side?
const stopWordFilter = cleanStopWords(stopWords);

const tokenize = str =>
  splitTokens(str).filter(stopWordFilter).map(stem).map(cleanTokenPunctuation);

export default tokenize;
