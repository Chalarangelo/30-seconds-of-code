import { parseTokensWithDuplicates } from '#src/lib/search/search.js';
import StringUtils from '#src/lib/stringUtils.js';

export default class DocumentTokenizer {
  static documents = new Map();
  static vocabulary = new Map();
  static idfValues = new Map();

  static tokenize(contents) {
    return Object.entries(contents)
      .reduce((acc, [contentType, content]) => {
        if (contentType === 'html') {
          return acc.concat(this.tokenizeHtml(content));
        } else if (contentType === 'text') {
          return acc.concat(this.tokenizePlainText(content));
        } else if (contentType === 'tokens') {
          return acc.concat(this.tokenizeTokens(content));
        } else if (contentType === 'copy') {
          return acc.concat(this.tokenizeCopy(content));
        }
        return acc;
      }, [])
      .filter(term => term);
  }

  // Tokenize content progressively (used for search queries)
  static progressiveTokenize(content) {
    let tokens = [];
    tokens = this.tokenizePlainText(content);
    if (tokens.length) return tokens;

    tokens = this.tokenizeTokens(content);
    if (tokens.length) return tokens;

    tokens = this.tokenizeCopy(content);
    return tokens;
  }

  // Tokenize HTML into individual terms
  static tokenizeHtml(html) {
    return parseTokensWithDuplicates(StringUtils.stripHtmlMultiline(html));
  }

  // Tokenize plain text into individual terms
  static tokenizePlainText(text) {
    return parseTokensWithDuplicates(text);
  }

  // Normalize tokens for storage and comparison
  static tokenizeTokens(tokens) {
    return StringUtils.normalizedTokens(tokens);
  }

  // Copy tokens directly
  static tokenizeCopy(copy) {
    return copy;
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
