import { generateNgrams } from '#src/lib/search/utils.js';

export default class DocumentIndex {
  constructor(documents) {
    this.documents = new Map();
    this.invertedIndex = new Map();
    this.ngramsInvertedIndex = new Map();

    if (documents)
      documents.forEach(({ id, content, ...data }) =>
        this.addDocument(id, content, data)
      );
  }

  get terms() {
    return Array.from(this.invertedIndex.keys());
  }

  get termsByFrequency() {
    return Array.from(this.invertedIndex.entries())
      .sort((a, b) => b[1].size - a[1].size)
      .map(([term, docs]) => [term, docs.size]);
  }

  addDocument(docId, terms, data) {
    // Generate n-grams (n = 3)
    const ngrams = [...terms.keys()].reduce((ngrams, term) => {
      ngrams.push(...generateNgrams(term));
      return ngrams;
    }, []);

    // Store original document
    this.documents.set(docId, {
      terms,
      ngrams,
      length: [...terms.values()].reduce((a, b) => a + b),
      ...data,
    });

    // Update inverted index
    terms.forEach((freq, term) => {
      if (!this.invertedIndex.has(term))
        this.invertedIndex.set(term, new Map());

      const docMap = this.invertedIndex.get(term);

      // Store term frequency
      docMap.set(docId, freq);
    });

    // Update n-grams inverted index
    ngrams.forEach(term => {
      if (!this.ngramsInvertedIndex.has(term))
        this.ngramsInvertedIndex.set(term, new Map());

      const docMap = this.ngramsInvertedIndex.get(term);

      // Store term frequency
      docMap.set(docId, 1);
    });

    return docId;
  }
}
