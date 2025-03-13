import tokenize from '#src/lib/search/search.js';

export default class DocumentIndex {
  static snippets = new Map();
  static vocabulary = new Map();
  static idfValues = new Map();

  // Add a snippet to the corpus
  static addSnippet(snippet) {
    const terms = this.tokenize(snippet.content);
    this.snippets.set(snippet.id, terms);

    // Update vocabulary counts
    terms.forEach(term => {
      this.vocabulary.set(term, (this.vocabulary.get(term) || 0) + 1);
    });

    return this;
  }

  // Tokenize text into individual terms
  static tokenize(text) {
    return tokenize(this.stripHtml(text)).filter(term => term);
  }

  // Strip HTML tags from a string
  static stripHtml(str) {
    return str
      .replace(/<.*?>/gms, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<');
  }

  // Calculate Term Frequency for a term in a snippet
  static calculateTF(term, snippetId) {
    const docTerms = this.snippets.get(snippetId);
    const termCount = docTerms.filter(t => t === term).length;
    return termCount / docTerms.length;
  }

  // Calculate Inverse Document Frequency for a term
  static calculateIDF(term) {
    const totalDocs = this.snippets.size;
    const docsWithTerm = this.vocabulary.get(term) || 0;

    // Use standard IDF formula with smoothing
    return Math.log((totalDocs + 1) / (docsWithTerm + 1)) + 1;
  }

  // Calculate TF-IDF score for a term in a snippet
  static calculateTFIDF(term, snippetId) {
    const tf = this.calculateTF(term, snippetId);
    const idf = this.calculateIDF(term);
    return tf * idf;
  }

  // Get TF-IDF scores for all terms in a snippet
  static getDocumentScores(snippetId) {
    const scores = new Map();

    this.snippets.get(snippetId).forEach(term => {
      scores.set(term, this.calculateTFIDF(term, snippetId));
    });

    return Object.fromEntries(
      [...scores.entries()].sort((a, b) => b[1] - a[1])
    );
  }

  // Get TF-IDF scores for multiple terms across all snippets
  static getTermScores(term) {
    return [...this.snippets].reduce((acc, [snippetId]) => {
      const score = this.calculateTFIDF(term, snippetId);
      if (score) acc[snippetId] = score;
      return acc;
    }, {});
  }
}
