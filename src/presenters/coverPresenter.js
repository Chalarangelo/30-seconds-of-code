import fs from 'fs';
import path from 'path';
import settings from '#src/config/settings.js';

export default class CoverPresenter {
  constructor(object, options = {}) {
    this.object = object;
    this.options = options;
  }

  coverUrl(full = false) {
    return `${this.coverPrefix}${this.coverName}${this.coverSuffix(full)}${
      settings.covers.extension
    }`;
  }

  coverFullUrl() {
    return `${settings.website.url}${this.coverUrl(false)}`;
  }

  coverSrcset(full = false) {
    return this.coverSizes(full).map(size => {
      const suffix = size.replace('w', '');
      return `${this.coverPrefix}${this.coverName}-${suffix}${settings.covers.extension} ${size}`;
    });
  }

  static get allSnippetCovers() {
    if (!this.snippetCovers)
      this.snippetCovers = fs
        .readdirSync(settings.paths.coverDirectory)
        .slice(2)
        .map(cover => {
          return path.basename(cover, settings.covers.originalExtension);
        });

    return this.snippetCovers;
  }

  get coverName() {
    return this.object.cover;
  }

  get coverPrefix() {
    return this.object.isSnippet
      ? settings.covers.prefix.snippet
      : settings.covers.prefix.collection;
  }

  coverSizes(full = false) {
    return this.object.isSnippet
      ? full
        ? settings.covers.size.snippetFull
        : settings.covers.size.snippet
      : settings.covers.size.collection;
  }

  coverSuffix(full = false) {
    return this.object.isSnippet
      ? full
        ? settings.covers.suffix.snippetFull
        : settings.covers.suffix.snippet
      : settings.covers.suffix.collection;
  }
}
