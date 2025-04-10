import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';

export default class PrismHighlighter {
  static setup(grammars) {
    loadLanguages(Object.keys(grammars));
  }

  static get name() {
    return 'prism';
  }

  static highlightCode(code, language) {
    const grammar = Prism.languages[language];
    return Promise.resolve(Prism.highlight(code, grammar, language));
  }
}
