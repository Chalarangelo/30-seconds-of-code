import fs from 'fs-extra';
import {
  createSingletonShorthands,
  createdBundledHighlighter,
} from '@shikijs/core';
import { createOnigurumaEngine } from '@shikijs/engine-oniguruma';

import { transformerColorizedBrackets } from '@shikijs/colorized-brackets';
import { transformerColorSwatches } from './transformers/colorSwatches.js';
import { transformerLineHighlights } from './transformers/lineHighlights.js';
import { transformerSectionFolding } from './transformers/sectionFolding.js';

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

  static get name() {
    return 'shiki';
  }

  static async highlightCode(code, language, metadata) {
    const highlightedCode = await this.codeToHtml(code, {
      lang: language,
      theme: 'cosmos',
      transformers: [
        transformerColorSwatches(),
        transformerLineHighlights(metadata),
        transformerSectionFolding(metadata),
        transformerColorizedBrackets({
          themes: {
            cosmos: [
              'var(--color-code-highlight-blue)',
              'var(--color-code-highlight-brown)',
              'var(--color-code-highlight-purple)',
              'var(--color-code-highlight-orange)',
            ],
          },
        }),
      ],
    });

    return highlightedCode
      .trim()
      .replace(/^<pre [^>]+><code>/g, '')
      .replace(/<\/code><\/pre>$/, '');
  }
}
