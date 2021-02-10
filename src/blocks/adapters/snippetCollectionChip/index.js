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
   *  - `withDescription` - Should `description` be included?
   * @throws Will throw an error if snippetCollection is not a SnippetCollection.
   */
  constructor(snippetCollection, { withDescription = false } = {}) {
    if (!(snippetCollection instanceof SnippetCollection)) {
      throw new ArgsError(
        "Invalid arguments. 'snippetCollection' must be an instance of 'SnippetCollection'."
      );
    }

    this.snippetCollection = snippetCollection;
    this._options = {
      withDescription,
    };
  }

  get url() {
    return this.snippetCollection.url;
  }

  get name() {
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

  static serializableAttributes = ['url', 'name', 'icon', 'description'];

  /**
   * Creates a plain object for the given snippet collection chip.
   * @param {object} options - Options object, containing the following:
   *  - `withDescription` - Should `description` be included?
   */
  toObject = (
    { withDescription = this._options.withDescription } = this._options
  ) => {
    this._options.withDescription = withDescription;
    return SnippetCollectionChip.serializableAttributes.reduce((obj, attr) => {
      const val = this[attr];
      if (val !== undefined) obj[attr] = val;
      return obj;
    }, {});
  };
}
