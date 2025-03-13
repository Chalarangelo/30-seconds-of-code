import { parseTokensWithDuplicates } from '#src/lib/search/search.js';

export default class DocumentFrequencies {
  static documents = new Map();
  static vocabulary = new Map();
  static idfValues = new Map();

  // Tokenize text into individual terms
  static tokenize(text) {
    return parseTokensWithDuplicates(this.stripHtml(text)).filter(term => term);
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

  // Calculate Term Frequency for a term in a document
  static calculateTF(term, documentId) {
    const docTerms = this.documents.get(documentId);
    const termCount = docTerms.filter(t => t === term).length;
    return termCount / docTerms.length;
  }

  // Calculate Inverse Document Frequency for a term
  static calculateIDF(term) {
    const totalDocs = this.documents.size;
    const docsWithTerm = this.vocabulary.get(term) || 0;

    // Use standard IDF formula with smoothing
    return Math.log((totalDocs + 1) / (docsWithTerm + 1)) + 1;
  }

  // Calculate TF-IDF score for a term in a document
  static calculateTFIDF(term, documentId) {
    const tf = this.calculateTF(term, documentId);
    const idf = this.calculateIDF(term);
    return tf * idf;
  }
}
