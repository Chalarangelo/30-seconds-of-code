import { SnippetCollection } from 'blocks/entities/snippetCollection';
import { ArgsError } from 'blocks/utilities/error';
import literals from 'lang/en/listing';

/**
 * A listing of a SnippetCollection object.
 * Used in listing pages.
 */
export class SnippetCollectionListing {
  /**
   * Creates a listing from the given SnippetCollection object.
   * @param {Snippet} snippet - A snippet to create a context from.
   * @param {object} options - Options object, containing the following:
   *  - `order` - Order segment of the page slug. (default: `'p'`)
   * @throws Will throw an error if snippetCollection is not a SnippetCollection.
   */
  constructor(snippetCollection, { order = 'p' } = {}) {
    if (!(snippetCollection instanceof SnippetCollection)) {
      throw new ArgsError(
        "Invalid arguments. 'snippetCollection' must be an instance of 'SnippetCollection'."
      );
    }

    this.snippetCollection = snippetCollection;
    this._options = {
      order,
    };
  }

  get listingName() {
    return this.snippetCollection.name;
  }

  get listingTitle() {
    if (
      this.snippetCollection.type === 'tag' &&
      !this.snippetCollection.tagMetadata
    )
      return this.snippetCollection.language;
    return this.snippetCollection.name;
  }

  get listingType() {
    return this.snippetCollection.type;
  }

  get listingDescription() {
    return this.snippetCollection.description;
  }

  get listingImage() {
    return this.snippetCollection.splash;
  }

  get listingSublinks() {
    if (this.snippetCollection.type === 'blog') {
      return [];
    } else if (['language', 'tag'].includes(this.snippetCollection.type)) {
      const order = this._options.order;
      return [
        {
          name: literals.tag('all'),
          url: `${this.snippetCollection.rootUrl}/${order}/1`,
          selected: this.snippetCollection.type === 'language',
        },
        ...this.snippetCollection.tags.map(tag => ({
          name: literals.tag(tag),
          url: `${this.snippetCollection.rootUrl}/t/${tag}/${order}/1`,
          selected:
            this.snippetCollection.type === 'tag'
              ? tag === this.snippetCollection.tag
              : false,
        })),
      ];
    }
    return [];
  }

  get pageDescription() {
    return this.snippetCollection.seoDescription;
  }

  static serializableAttributes = [
    'listingName',
    'listingTitle',
    'listingDescription',
    'listingImage',
    'listingType',
    'listingSublinks',
    'pageDescription',
  ];

  /**
   * Creates a plain object for the given snippet collection listing.
   * @param {object} options - Options object, containing the following:
   *  - `order` - Order segment of the page slug. (default: `'p'`)
   */
  toObject = ({ order = this._options.order } = this._options) => {
    this._options.order = order;
    return SnippetCollectionListing.serializableAttributes.reduce(
      (obj, attr) => {
        const val = this[attr];
        if (val !== undefined) obj[attr] = val;
        return obj;
      },
      {}
    );
  };
}
