import fs from 'fs-extra/esm';
import Page from '#src/adapters/page.js';
import Collection from '#src/models/collection.js';
import Snippet from '#src/models/snippet.js';
import settings from '#src/config/settings.js';

export default class AstroContent {
  static get outputParams() {
    return [({ spaces: 2 }, () => {})];
  }

  static generate() {
    this.prepare();

    this.generateHomePage();
    this.generateCollectionPages();
    this.generateSnippetPages();
  }

  static prepare() {
    // Ensure dir exists
    fs.ensureDirSync(settings.paths.out.pages);
  }

  static generateHomePage() {
    const page = Page.home.serialize;

    // Write to file
    fs.writeJson(settings.paths.out.home, page, ...this.outputParams);
  }

  static generateCollectionPages() {
    const pages = Collection.all.reduce((acc, collection) => {
      collection.pages.forEach(page => {
        acc[page.key] = page.serialize;
      });

      return acc;
    }, {});

    // Write to file
    fs.writeJson(settings.paths.out.collections, pages, ...this.outputParams);
  }

  static generateSnippetPages() {
    const snippets =
      process.env.NODE_ENV === 'development'
        ? Snippet.all
        : Snippet.scope('published');
    const pages = snippets.reduce((acc, snippet) => {
      const page = snippet.page;
      acc[page.key] = page.serialize;
      return acc;
    }, {});

    // Write to file
    fs.writeJson(settings.paths.out.snippets, pages, ...this.outputParams);
  }
}
