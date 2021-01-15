import { SnippetCollection } from 'blocks/entities/snippetCollection';
import { ArgsError } from 'blocks/utilities/error';

/**
 * A chip of a SnippetCollection object.
 * Used in the home and collection pages.
 */
export class SnippetCollectionChip {
  /**
   * Creates a chip from the given SnippetCollection object.
   * @param {Snippet} snippetCollection - A snippet collection to create a chip from.
   * @throws Will throw an error if snippetCollection is not a SnippetCollection.
   */
  constructor(snippetCollection) {
    if (!(snippetCollection instanceof SnippetCollection)) {
      throw new ArgsError(
        "Invalid arguments. 'snippetCollection' must be an instance of 'SnippetCollection'."
      );
    }

    this.snippetCollection = snippetCollection;
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

  static serializableAttributes = ['url', 'name', 'icon'];

  /**
   * Creates a plain object for the given snippet collection chip.
   */
  toObject = () => {
    return SnippetCollectionChip.serializableAttributes.reduce((obj, attr) => {
      const val = this[attr];
      if (val !== undefined) obj[attr] = val;
      return obj;
    }, {});
  };
}
