import { Tag } from 'blocks/utilities/tag';
import { ArgsError } from 'blocks/utilities/error';
import { Snippet } from 'blocks/entities/snippet';
import { stripMarkdownFormat } from 'utils';

/**
 * A context of a Snippet object.
 * Used in snippet pages to render full snippet cards.
 */
export class SnippetContext {
  /**
   * Creates a context from the given Snippet object.
   * @param {Snippet} snippet - A snippet to create a context from.
   * @param {object} options - Options object, containing the following:
   *  - `withVscodeUrl` - Should `vscodeUrl` be included? (default: `false`)
   * @throws Will throw an error if snippet is not a Snippet.
   */
  constructor(snippet, { withVscodeUrl = false } = {}) {
    if (!(snippet instanceof Snippet)) {
      throw new ArgsError(
        "Invalid arguments. 'snippet' must be an instance of 'Snippet'."
      );
    }

    this.snippet = snippet;
    this._options = {
      withVscodeUrl,
    };
  }

  get authors() {
    return this.snippet.config.cardTemplate === 'BlogSnippetCard'
      ? this.snippet.authors
      : undefined;
  }

  get type() {
    return this.snippet.config.cardTemplate === 'BlogSnippetCard'
      ? this.snippet.type
      : undefined;
  }

  get cover() {
    return this.snippet.config.cardTemplate === 'BlogSnippetCard'
      ? this.snippet.cover
      : undefined;
  }

  get id() {
    return this.snippet.id;
  }

  get title() {
    return this.snippet.title;
  }

  get description() {
    if (!this._description) {
      this._description = stripMarkdownFormat(this.snippet.text.short);
    }
    return this._description;
  }

  get url() {
    return this.snippet.url;
  }

  get slug() {
    return this.snippet.slug;
  }

  get firstSeen() {
    return this.snippet.firstSeen;
  }

  get lastUpdated() {
    return this.snippet.lastUpdated;
  }

  get expertise() {
    return this.snippet.expertise;
  }

  get language() {
    return this.snippet.language;
  }

  get icon() {
    return this.snippet.icon;
  }

  get tags() {
    if (!this._tags) {
      this._tags = {
        primary: Tag.format(this.snippet.tags.primary),
        all: Tag.stripExpertise(this.snippet.tags.all).map(Tag.format),
      };
    }
    return this._tags;
  }

  get html() {
    return this.snippet.html;
  }

  get code() {
    return this.snippet.code;
  }

  get vscodeUrl() {
    return this._options.withVscodeUrl ? this.snippet.vscodeUrl : undefined;
  }

  static serializableAttributes = [
    'id',
    'title',
    'description',
    'url',
    'slug',
    'firstSeen',
    'lastUpdated',
    'expertise',
    'language',
    'icon',
    'tags',
    'html',
    'code',
    'authors',
    'type',
    'cover',
    'vscodeUrl',
  ];

  /**
   * Creates a plain object for the given snippet context.
   * @param {object} options - Options object, containing the following:
   *  - `withVscodeUrl` - Should `vscodeUrl` be included? (default: `false`)
   */
  toObject = (
    { withVscodeUrl = this._options.withVscodeUrl } = this._options
  ) => {
    this._options.withVscodeUrl = withVscodeUrl;
    return SnippetContext.serializableAttributes.reduce((obj, attr) => {
      const val = this[attr];
      if (val !== undefined) obj[attr] = val;
      return obj;
    }, {});
  };
}
