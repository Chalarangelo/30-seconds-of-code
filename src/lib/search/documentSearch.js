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

const searchForTerms = (documentIndex, terms, partialMatchLastTerm = false) => {
  const scores = [];

  // Only calculate partial matches for the last term iff its length is >= 2.
  const lastTerm = terms[terms.length - 1];
  const lastTermIndex =
    partialMatchLastTerm && lastTerm.length >= 2 ? terms.length - 1 : -1;
  // Precalculate a simulated IDF score for the last term.
  const lastTermIdf =
    lastTermIndex !== -1
      ? Math.log(
          documentIndex.documents.size /
            (documentIndex.documents.size - lastTerm.length ** 2)
        )
      : 1;

  // Calculate scores for each document
  documentIndex.documents.forEach((doc, docId) => {
    let score = 0;

    terms.forEach((term, i) => {
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
      } else if (i === lastTermIndex) {
        // If the term is not in the inverted index, check for raw term match.
        const tf =
          doc?.rawContent?.match(new RegExp(`\\b${term}`, 'gi'))?.length ?? 0;
        score += tf * lastTermIdf;
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
      ...searchForTerms(documentIndex, tokenizePlainText(query)),
      ...searchForTerms(documentIndex, tokenizeTokens(query), true),
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
        ...documentIndex.documents.get(docId),
      }));

    // Limit results if requested
    if (limit) return results.slice(0, limit);
    return results;
  };

export default search;
