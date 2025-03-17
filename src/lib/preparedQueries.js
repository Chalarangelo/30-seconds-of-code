import { globSync } from 'glob';
import yaml from 'js-yaml';
import fs from 'fs';
import CoverPresenter from '#src/presenters/coverPresenter.js';
import Collection from '#src/models/collection.js';
import Snippet from '#src/models/snippet.js';
import PerformanceTracking from '#src/lib/performanceTracking.js';
import DocumentIndex from '#src/lib/search/documentIndex.js';
import search from '#src/lib/search/documentSearch.js';
import settings from '#src/config/settings.js';

export default class PreparedQueries {
  static documentIndex;

  static snippetPerformance(...slugs) {
    if (slugs.length === 1) {
      const snippet = Snippet.search(slugs[0]);

      return PerformanceTracking.for(snippet.slug);
    } else {
      const snippets = Snippet.searchAll(...slugs)
        .map(snippet => [
          snippet.slug,
          PreparedQueries.snippetPerformance(snippet.slug),
        ])
        .sort((a, b) => b[1].clicks - a[1].clicks);

      return Object.fromEntries(snippets);
    }
  }

  static collectionSnippetsPerformance(slug) {
    const collection = Collection.search(slug);

    return PreparedQueries.snippetPerformance(
      ...collection.snippets.pluck('slug')
    );
  }

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

  static zeroImpressionSnippets() {
    return Snippet.all
      .filter(
        snippet =>
          PreparedQueries.snippetPerformance(snippet.slug).impressions === 0
      )
      .map(snippet => snippet.slug);
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
    const frequencies = Snippet.all
      .map(snippet =>
        snippet.searchTokensArray.filter(token => token.length >= minLength)
      )
      .flat()
      .reduce((acc, token) => {
        if (!acc[token]) acc[token] = 0;
        acc[token]++;
        return acc;
      }, {});

    return Object.fromEntries(
      Object.entries(frequencies).sort((a, b) => b[1] - a[1])
    );
  }

  static prepareDocumentIndex() {
    const documents = [
      ...Snippet.scope('listed').map(snippet => ({
        id: snippet.id,
        content: snippet.docTokens,
      })),
      ...Collection.scope('listed').map(collection => ({
        id: collection.id,
        content: collection.docTokens,
      })),
    ];
    PreparedQueries.documentIndex = new DocumentIndex(documents);
  }

  static searchForTerm(term, limit) {
    if (!PreparedQueries.documentIndex) PreparedQueries.prepareDocumentIndex();
    return search(PreparedQueries.documentIndex)(term, limit);
    // return PreparedQueries.documentIndex.search(term, limit);
  }
}
