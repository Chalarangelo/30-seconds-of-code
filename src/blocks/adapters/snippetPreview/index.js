import { Tag } from 'blocks/utilities/tag';
import { ArgsError } from 'blocks/utilities/error';
import { Snippet } from 'blocks/entities/snippet';

/**
 * A preview of a Snippet object.
 * Used in listing pages and snippet pages to render snippet previews.
 */
export class SnippetPreview {
  /**
   * Creates a preview from the given Snippet object.
   * @param {Snippet} snippet - A snippet to create a preview of.
   * @param {object} options - Options object, containing the following:
   *  - `withSearchTokens` - Should `searchTokens` be included? (default: `false`)
   *  - `injectIntoPrimaryTag` - A tag (string) to inject into the primary tag. (default: `''`)
   * @throws Will throw an error if snippet is not a Snippet.
   */
  constructor(
    snippet,
    { withSearchTokens = false, injectIntoPrimaryTag = '' } = {}
  ) {
    if (!(snippet instanceof Snippet)) {
      throw new ArgsError(
        "Invalid arguments. 'snippet' must be an instance of 'Snippet'."
      );
    }

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
    return this.snippet.expertise;
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
    'url',
    'icon',
    'description',
    'searchTokens',
    'expertise',
    'primaryTag',
    'language',
  ];

  /**
   * Creates a plain object for the given snippet preview.
   * @param {object} options - Options object, containing the following:
   *  - `withSearchTokens` - Should `searchTokens` be included? (default: `false`)
   *  - `injectIntoPrimaryTag` - A tag (string) to inject into the primary tag. (default: `''`)
   */
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
