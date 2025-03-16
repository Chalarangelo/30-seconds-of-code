import { tokenize } from '#src/lib/search/server.js';

export default class DocumentIndex {
  static documents = new Map();
  static invertedIndex = new Map();

  static get terms() {
    return Array.from(this.invertedIndex.keys());
  }

  static addDocument(docId, content) {
    const terms = tokenize(content);

    // Store original document
    this.documents.set(docId, { terms, length: terms.length });

    // Update inverted index
    terms.forEach(term => {
      if (!this.invertedIndex.has(term))
        this.invertedIndex.set(term, new Map());

      const docMap = this.invertedIndex.get(term);

      // Store term frequency
      docMap.set(docId, terms.filter(t => t === term).length);
    });

    return docId;
  }

  static search(query, limit = null) {
    let scores = this.searchForTerms(tokenize({ text: query }));
    if (!scores.size) this.searchForTerms(tokenize({ tokens: query }));

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
  }

  static searchForTerms(terms) {
    const scores = new Map();

    // Calculate scores for each document
    this.documents.forEach((doc, docId) => {
      let score = 0;

      terms.forEach(term => {
        if (this.invertedIndex.has(term)) {
          const indexEntry = this.invertedIndex.get(term).get(docId);
          if (indexEntry) {
            // Calculate TF-IDF score for this term in document
            const tf = indexEntry / doc.length;
            const idf = Math.log(
              this.documents.size / this.invertedIndex.get(term).size
            );
            score += tf * idf;
          }
        }
      });

      if (score > 0) scores.set(docId, score);
    });

    return scores;
  }
}
