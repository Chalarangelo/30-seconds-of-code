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

  get listingName() {
    return this.snippetCollection.name;
  }

  get listingTitle() {
    if (
      this.snippetCollection.type === 'tag' &&
      !this.snippetCollection.tagMetadata
    )
      return this.snippetCollection.language
        ? this.snippetCollection.language
        : literals.blogTag(this.snippetCollection.tag);
    return this.snippetCollection.name;
  }

  get listingDescription() {
    return this.snippetCollection.description;
  }

  get listingImage() {
    return this.snippetCollection.splash;
  }

  get listingSublinks() {
    if (['blog', 'language', 'tag'].includes(this.snippetCollection.type)) {
      return [
        {
          name: literals.tag('all'),
          url: `${this.snippetCollection.rootUrl}/p/1`,
          selected: this.snippetCollection.type === 'language',
        },
        ...this.snippetCollection.tags.map(tag => ({
          name: literals.tag(tag),
          url: `${this.snippetCollection.rootUrl}/t/${tag}/p/1`,
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
    'listingSublinks',
    'pageDescription',
  ];

  /**
   * Creates a plain object for the given snippet collection listing.
   */
  toObject = () => {
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
