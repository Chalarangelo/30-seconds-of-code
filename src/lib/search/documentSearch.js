import { cleanTokenPunctuation, splitTokens } from '#src/lib/search/utils.js';
import { stem } from '#src/lib/search/porterStemmer.js';

/**
 * Tokenizes tokens (copies after cleaning).
 */
const tokenizeTokens = str => splitTokens(str).map(cleanTokenPunctuation);

/**
 * Tokenizes plaintext (stemming and cleaning).
 */
const tokenizePlainText = str =>
  splitTokens(str).map(tkn => cleanTokenPunctuation(stem(tkn)));

export const tokenize = content =>
  content.tokens
    ? tokenizeTokens(content.tokens)
    : tokenizePlainText(content.text);

const searchForTerms = (documentIndex, terms) => {
  const scores = [];

  // Calculate scores for each document
  documentIndex.documents.forEach((doc, docId) => {
    let score = 0;

    terms.forEach(term => {
      if (documentIndex.invertedIndex.has(term)) {
        const indexEntry = documentIndex.invertedIndex.get(term).get(docId);
        if (indexEntry) {
          // Calculate TF-IDF score for this term in document
          const tf = indexEntry / doc.length;
          const idf = Math.log(
            documentIndex.documents.size /
              documentIndex.invertedIndex.get(term).size
          );
          score += tf * idf;
        }
      }
    });

    if (score > 0) scores.push([docId, score]);
  });

  return scores;
};

const search =
  documentIndex =>
  (query, limit = null) => {
    const scores = [
      ...searchForTerms(documentIndex, tokenize({ text: query })),
      ...searchForTerms(documentIndex, tokenize({ tokens: query })),
    ].reduce((acc, [docId, score]) => {
      if (!acc.has(docId)) acc.set(docId, 0);
      acc.set(docId, Math.max(acc.get(docId), score));
      return acc;
    }, new Map());

    // Sort documents by score
    const results = Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([docId, score]) => ({
        id: docId,
        score: parseFloat(score.toFixed(5)),
      }));

    // Limit results if requested
    if (limit) return results.slice(0, limit);
    return results;
  };

export default search;
