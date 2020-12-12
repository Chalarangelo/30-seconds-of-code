import { SnippetCollection } from 'build/entities/snippetCollection';
import literals from 'lang/en/listing';

export class SnippetCollectionListing {
  constructor(snippetCollection, { order = 'p' } = {}) {
    this.snippetCollection = snippetCollection;
    this._options = {
      order,
    };
  }

  get listingName() {
    return this.snippetCollection.name;
  }

  get listingTitle() {
    if (this.snippetCollection.type === 'tag')
      return this.snippetCollection.language;
    return this.snippetCollection.name;
  }

  get listingType() {
    return this.snippetCollection.type;
  }

  get listingSublinks() {
    if (this.snippetCollection.type === 'main') {
      return SnippetCollection.collectionMetas
        .filter(m => m.featured > 0)
        .sort((a, b) =>
          a.featured === b.featured ? a.name - b.name : a.featured - b.featured
        );
    } else if (this.snippetCollection.type === 'blog') {
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
    'listingType',
    'listingSublinks',
    'pageDescription',
  ];

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
