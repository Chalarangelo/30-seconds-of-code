import { parseTokensWithDuplicates } from '#src/lib/search/search.js';
import StringUtils from '#src/lib/stringUtils.js';

export default class DocumentTokenizer {
  static documents = new Map();
  static vocabulary = new Map();
  static idfValues = new Map();

  static tokenize(contents) {
    return (
      Object.entries(contents)
        .reduce((acc, [contentType, content]) => {
          if (contentType === 'html') {
            return acc.concat(this.tokenizeHtml(content));
          } else if (contentType === 'text') {
            return acc.concat(this.tokenizePlainText(content));
          } else if (contentType === 'tokens') {
            return acc.concat(this.tokenizeTokens(content));
          }
          return acc;
        }, [])
        .map(term => term.replace(/^['-]+|['-]+$/g, '').replace("'", ''))
        // Filter out terms that are likely not useful
        // 1. Single characters
        // 2. Numeric values and hexadecimal strings
        // 3. Dates and datetimes, or `number x number`
        // 4. Values with units (e.g. `100px` or `30s`)
        // 5. Very long strings (likely to be a hash or UUID)
        // 6. Single character followed by a number, except `h` (e.g. `h1`)
        // 7. Potental plural terms that already exist in singular form
        .filter(
          (term, i, terms) =>
            term &&
            term.length > 1 &&
            !/^(0x)?[\da-f]+$/.test(term) &&
            !/^\d([\dt-]+|(\d*x\d+))$/.test(term) &&
            !/^\d+\-?[a-z]{1,4}$/.test(term) &&
            !/^[\da-z-]{25,}$/.test(term) &&
            !/^[^h]\d+$/.test(term) &&
            (!term.endsWith('s') || !terms.includes(term.replace(/s$/, '')))
        )
    );
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
