import { Tag } from 'build/utilities/tag';

export class SnippetPreview {
  constructor(
    snippet,
    { withSearchTokens = false, injectIntoPrimaryTag = '' } = {}
  ) {
    this.snippet = snippet;
    this._options = {
      withSearchTokens,
      injectIntoPrimaryTag,
      forcePrimaryTagReeval: true,
    };
  }

  get title() {
    return this.snippet.title;
  }

  get expertise() {
    return Tag.format(this.snippet.expertise);
  }

  get primaryTag() {
    if (this._options.forcePrimaryTagReeval || !this._primaryTag) {
      this._primaryTag =
        this._options.injectIntoPrimaryTag.length &&
        this.snippet.tags.primary !== this._options.injectIntoPrimaryTag
          ? [
              Tag.format(this.snippet.tags.primary),
              Tag.format(this._options.injectIntoPrimaryTag),
            ].join(', ')
          : Tag.format(this.snippet.tags.primary);
      this._options.forcePrimaryTagReeval = false;
    }
    return this._primaryTag;
  }

  get language() {
    if (!this._language) {
      this._language =
        this.snippet.language && this.snippet.language.long
          ? this.snippet.language.long
          : undefined;
    }
    return this._language;
  }

  get icon() {
    return this.snippet.icon;
  }

  get description() {
    if (!this._description) {
      this._description = this.snippet.html.description.trim();
    }
    return this._description;
  }

  get url() {
    return this.snippet.slug;
  }

  get searchTokens() {
    return this._options.withSearchTokens
      ? this.snippet.searchTokens
      : undefined;
  }

  static serializableAttributes = [
    'title',
    'expertise',
    'primaryTag',
    'language',
    'icon',
    'description',
    'url',
    'searchTokens',
  ];

  toObject = (
    {
      withSearchTokens = this._options.withSearchTokens,
      injectIntoPrimaryTag = this._options.injectIntoPrimaryTag,
    } = this._options
  ) => {
    this._options.withSearchTokens = withSearchTokens;
    if (this._options.injectIntoPrimaryTag !== injectIntoPrimaryTag) {
      this._options.injectIntoPrimaryTag = injectIntoPrimaryTag;
      this._options.forcePrimaryTagReeval = true;
    }
    return SnippetPreview.serializableAttributes.reduce((obj, attr) => {
      const val = this[attr];
      if (val !== undefined) obj[attr] = val;
      return obj;
    }, {});
  };
}
