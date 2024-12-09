import Page from '#src/adapters/page.js';

export default class CollectionPage extends Page {
  static {
    Page.register(this);
  }

  get params() {
    return {
      lang: this.slugSegments[0],
      listing: [
        ...this.slugSegments.slice(1),
        'p',
        `${this.options.pageNumber}`,
      ],
    };
  }

  get props() {
    return {
      slug: this.pageSlug,
      pageDescription: this.object.seoDescription,
      collection: this.object.context,
      pagination: this.pagination,
      collectionItems: this.options.items.map(item => item.preview),
      largeImages: this.options.largeImages,
      singleColumn: this.options.singleColumn,
    };
  }

  get additionalSchemaData() {
    return {
      name: this.object.title,
      numberOfItems: this.options.items.length,
      itemListElement: this.options.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: item.fullUrl,
        name: item.previewTitle,
      })),
    };
  }

  get pageSlug() {
    return `${this.object.slug}/p/${this.options.pageNumber}`;
  }

  get pagination() {
    if (this.options.pageCount <= 1) return null;

    return {
      pageNumber: this.options.pageNumber,
      totalPages: this.options.pageCount,
      baseUrl: this.object.slug,
      hasPrevious: this.options.pageNumber > 1,
      hasNext: this.options.pageNumber < this.options.pageCount,
      totalItems: this.options.itemCount,
      itemType: this.options.itemType,
    };
  }
}
