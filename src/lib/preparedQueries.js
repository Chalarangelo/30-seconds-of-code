import { globSync } from 'glob';
import yaml from 'js-yaml';
import fs from 'fs';
import CoverPresenter from '#src/presenters/coverPresenter.js';
import Collection from '#src/models/collection.js';
import Snippet from '#src/models/snippet.js';
import DocumentIndex from '#src/lib/search/documentIndex.js';
import search from '#src/lib/search/documentSearch.js';
import settings from '#src/config/settings.js';

export default class PreparedQueries {
  static documentIndex;

  static snippetCoverUsage() {
    const coverUsage = CoverPresenter.allSnippetCovers
      .map(cover => [cover, Snippet.where({ cover }).length])
      .sort((a, b) => b[1] - a[1]);

    return Object.fromEntries(coverUsage);
  }

  static collectionCoverUsage() {
    const coverUsage = CoverPresenter.allCollectionCovers
      .map(cover => [cover, Collection.where({ cover }).length])
      .sort((a, b) => b[1] - a[1]);

    return Object.fromEntries(coverUsage);
  }

  static snippetHasFormatting(slug) {
    const snippet = Snippet.search(slug);

    return {
      bold: snippet.content.includes('<strong'),
      heading: snippet.content.includes('<h'),
    };
  }

  static duplicateReferences() {
    const references = globSync(settings.paths.languagesGlob)
      .map(file => yaml.load(fs.readFileSync(file, 'utf8')))
      .filter(language => language.references && language.references.length > 1)
      .reduce((acc, language) => {
        Object.keys(language.references).forEach(([reference]) => {
          if (!acc[reference]) acc[reference] = [];
          acc[reference].push(language.short);
        });
        return acc;
      }, {});

    return Object.fromEntries(
      Object.entries(references).filter(([, languages]) => languages.length > 1)
    );
  }

  static searchTokensFrequency(minLength = 3) {
    if (!PreparedQueries.documentIndex) PreparedQueries.prepareDocumentIndex();
    return PreparedQueries.documentIndex.termsByFrequency.filter(
      x => x[0].length >= minLength
    );
  }

  static prepareDocumentIndex() {
    const documents = [
      ...Snippet.scope('published', 'listed').map(snippet => ({
        id: snippet.id,
        content: snippet.docTokensMap,
        rawContent: snippet.docTokens,
      })),
      ...Collection.scope('listed').map(collection => ({
        id: collection.id,
        content: collection.docTokensMap,
        rawContent: collection.docTokens,
      })),
    ];
    PreparedQueries.documentIndex = new DocumentIndex(documents);
  }

  static searchForTerm(term, limit) {
    if (!PreparedQueries.documentIndex) PreparedQueries.prepareDocumentIndex();
    return search(PreparedQueries.documentIndex)(term, limit).map(x => ({
      id: x.id,
      score: x.score,
    }));
  }
}
