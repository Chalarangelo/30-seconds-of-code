/* eslint-disable camelcase */
import { exportLanguageData } from '#src/lib/contentUtils/modelWorkers/language.js';
import { exportSnippetData } from '#src/lib/contentUtils/modelWorkers/snippet.js';
import { exportCollectionData } from '#src/lib/contentUtils/modelWorkers/collection.js';
import { exportCollectionSnippetData } from '#src/lib/contentUtils/modelWorkers/collectionSnippet.js';
import { extractData } from '#src/lib/contentUtils/extractor.js';
import FileHandler from '#src/lib/contentUtils/fileHandler.js';
import AssetHandler from '#src/lib/contentUtils/assetHandler.js';
import ContentCreator from '#src/lib/contentUtils/contentCreator.js';
import FileWatcher from '#src/lib/contentUtils/fileWatcher.js';
import { outputPath } from '#src/lib/contentUtils/config.js';

export default class ContentUtils {
  static async prepareContent() {
    const { collections, snippets, languages, collectionSnippets } =
      await extractData();

    const data = {
      collections: exportCollectionData(collections),
      snippets: exportSnippetData(snippets),
      languages: exportLanguageData(languages),
      collectionSnippets: exportCollectionSnippetData(collectionSnippets),
    };

    return FileHandler.write(outputPath, data);
  }

  static async prepareAssets({ force = false } = {}) {
    return await AssetHandler.processAssets({ force });
  }

  static createContent(...args) {
    return ContentCreator.create(...args);
  }

  static watchContent(callback) {
    return FileWatcher.watch(callback);
  }
}
