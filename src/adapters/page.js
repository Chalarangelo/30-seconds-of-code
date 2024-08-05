import PageSerializer from '#src/serializers/pageSerializer.js';

export default class Page {
  static pageTypes = {};

  static register(pageType) {
    this.pageTypes[pageType.name] = pageType;
  }

  static from(object, options = {}) {
    const pageName = `${object.constructor.name}Page`;
    return new this.pageTypes[pageName](object, options);
  }

  static get home() {
    return new this.pageTypes.HomePage();
  }

  constructor(object, options = {}) {
    this.object = object;
    this.options = options;
  }

  get serialize() {
    return PageSerializer.serialize(this);
  }

  get key() {
    return Object.values(this.params).flat().join('/');
  }

  get params() {
    throw new Error('Not implemented');
  }

  get props() {
    throw new Error('Not implemented');
  }

  get schemaData() {
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': this.object.isSnippet ? 'TechArticle' : 'ItemList',
      url: this.object.fullUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': this.object.fullUrl,
      },
    };

    if (this.additionalSchemaData) {
      Object.assign(schemaData, this.additionalSchemaData);
    }

    return schemaData;
  }

  get slugSegments() {
    return this.object.slug.slice(1).split('/');
  }
}
