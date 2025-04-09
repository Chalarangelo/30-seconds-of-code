import fs from 'fs-extra';
import {
  createSingletonShorthands,
  createdBundledHighlighter,
} from '@shikijs/core';
import { createOnigurumaEngine } from '@shikijs/engine-oniguruma';

const loadBundledThemes = () => {
  return {
    cosmos: () => {
      return JSON.parse(
        fs.readFileSync(
          './src/lib/contentUtils/markdownParser/codeHighlighters/themes/cosmos.json',
          'utf-8'
        )
      );
    },
  };
};

const loadBundledLanguages = grammars => {
  const bundledLanguages = Object.keys(grammars).reduce((acc, lang) => {
    acc[lang] = () => import(`@shikijs/langs/${lang}`);
    return acc;
  }, {});
  return bundledLanguages;
};

export default class ShikiHighlighter {
  static setup(grammars) {
    const bundledLanguages = loadBundledLanguages(grammars);
    const bundledThemes = loadBundledThemes();
    const createHighlighter = createdBundledHighlighter({
      langs: bundledLanguages,
      themes: bundledThemes,
      engine: () => createOnigurumaEngine(import('shiki/wasm')),
    });

    const {
      codeToHtml,
      codeToHast,
      codeToTokensBase,
      codeToTokens,
      codeToTokensWithThemes,
      getSingletonHighlighter,
      getLastGrammarState,
    } = createSingletonShorthands(createHighlighter);

    this.codeToHtml = codeToHtml;
    this.codeToHast = codeToHast;
    this.codeToTokensBase = codeToTokensBase;
    this.codeToTokens = codeToTokens;
    this.codeToTokensWithThemes = codeToTokensWithThemes;
    this.getSingletonHighlighter = getSingletonHighlighter;
    this.getLastGrammarState = getLastGrammarState;
    this.highlighter = createHighlighter;
    this.bundledLanguages = bundledLanguages;
    this.bundledThemes = bundledThemes;
  }

  static async highlightCode(code, language) {
    const highlightedCode = await this.codeToHtml(code, {
      lang: language,
      theme: 'cosmos',
    });

    return highlightedCode
      .trim()
      .replace(/^<pre [^>]+><code>/g, '')
      .replace(/<\/code><\/pre>$/, '');
  }
}
