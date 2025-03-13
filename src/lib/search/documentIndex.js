import DocumentFrequencies from '#src/lib/search/documentFrequencies.js';

export default class DocumentIndex {
  static documents = new Map();
  static invertedIndex = new Map();
  static documentCount = 0;

  static addDocument(content, docId) {
    const terms = DocumentFrequencies.tokenize(content);

    // Store original document
    this.documents.set(docId, {
      content,
      terms,
      length: terms.length,
    });

    // Update inverted index
    terms.forEach(term => {
      if (!this.invertedIndex.has(term)) {
        this.invertedIndex.set(term, new Map());
      }
      const docMap = this.invertedIndex.get(term);

      // Store term frequency
      docMap.set(docId, terms.filter(t => t === term).length);
    });

    return docId;
  }

  static search(query) {
    const terms = DocumentFrequencies.tokenize(query);
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

    // Sort documents by score
    return Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([docId, score]) => ({
        id: docId,
        score,
      }));
  }

  static getDocument(id) {
    return this.documents.get(id);
  }
}
