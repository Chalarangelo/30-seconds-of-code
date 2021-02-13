import { SnippetCollection } from 'blocks/entities/snippetCollection';
import { ArgsError } from 'blocks/utilities/error';

/**
 * A chip of a SnippetCollection object.
 * Used in the home and collection pages.
 */
export class SnippetCollectionChip {
  /**
   * Creates a chip from the given SnippetCollection object.
   * @param {SnippetCollection} snippetCollection - A snippet collection to create a chip from.
   * @param {object} options - Options object, containing the following:
   *  - `withDescription` - Should `description` be included? (default: `false`)
   *  - `withSearchTokens` - Should `searchTokens` be included? (default: `false`)
   * @throws Will throw an error if snippetCollection is not a SnippetCollection.
   */
  constructor(
    snippetCollection,
    { withDescription = false, withSearchTokens = false } = {}
  ) {
    if (!(snippetCollection instanceof SnippetCollection)) {
      throw new ArgsError(
        "Invalid arguments. 'snippetCollection' must be an instance of 'SnippetCollection'."
      );
    }

    this.snippetCollection = snippetCollection;
    this._options = {
      withDescription,
      withSearchTokens,
    };
  }

  get url() {
    return this.snippetCollection.url;
  }

  get title() {
    return this.snippetCollection.shortName;
  }

  get icon() {
    return this.snippetCollection.icon;
  }

  get description() {
    return this._options.withDescription
      ? this.snippetCollection.shortDescription
      : undefined;
  }

  get searchTokens() {
    return this._options.withSearchTokens
      ? this.snippetCollection.searchTokens
      : undefined;
  }

  static serializableAttributes = [
    'title',
    'url',
    'icon',
    'description',
    'searchTokens',
  ];

  /**
   * Creates a plain object for the given snippet collection chip.
   * @param {object} options - Options object, containing the following:
   *  - `withDescription` - Should `description` be included?
   *  - `withSearchTokens` - Should `searchTokens` be included?
   */
  toObject = (
    {
      withDescription = this._options.withDescription,
      withSearchTokens = this._options.withSearchTokens,
    } = this._options
  ) => {
    this._options.withDescription = withDescription;
    this._options.withSearchTokens = withSearchTokens;
    return SnippetCollectionChip.serializableAttributes.reduce((obj, attr) => {
      const val = this[attr];
      if (val !== undefined) obj[attr] = val;
      return obj;
    }, {});
  };
}
