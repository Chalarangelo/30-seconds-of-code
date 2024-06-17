/* eslint-disable camelcase */
import { exportLanguageData } from './modelWorkers/language.js';
import { exportSnippetData } from './modelWorkers/snippet.js';
import { exportCollectionData } from './modelWorkers/collection.js';
import { exportCollectionSnippetData } from './modelWorkers/collectionSnippet.js';
import { extractData } from './extractor.js';
import { FileHandler } from './fileHandler.js';
import { outputPath } from './config.js';

export class Parsley {
  static async exportContent() {
    const { collections, snippets, languages, collectionSnippets } =
      await extractData();

    const data = {
      collections: exportCollectionData(collections),
      snippets: exportSnippetData(snippets),
      languages: exportLanguageData(languages),
      collection_snippets: exportCollectionSnippetData(collectionSnippets),
    };

    return FileHandler.write(outputPath, data);
  }
}
