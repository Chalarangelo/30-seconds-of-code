import Page from '#src/adapters/page.js';
import settings from '#src/config/settings.js';

export default class SnippetPage extends Page {
  static {
    Page.register(this);
  }

  get key() {
    return `${this.slugSegments[0]}/s/${this.slugSegments.slice(-1)[0]}`;
  }

  get params() {
    return {
      lang: this.slugSegments[0],
      snippet: this.slugSegments.slice(-1)[0],
    };
  }

  get props() {
    return {
      breadcrumbs: this.object.breadcrumbs,
      pageDescription: this.object.seoDescription,
      snippet: this.object.context,
      journey: this.object.journeyPagination,
      recommendations: [
        this.object.recommendedCollection,
        ...this.object.recommendedSnippets,
      ]
        .filter(Boolean)
        .slice(0, 4)
        .map(rec => rec.preview),
    };
  }

  get additionalSchemaData() {
    return {
      name: this.object.seoTitle,
      headline: this.object.seoTitle,
      description: this.object.seoDescription,
      image: this.object.coverFullUrl,
      datePublished: this.object.dateShortString,
      dateModified: this.object.dateShortString,
      publisher: {
        '@type': 'Person',
        name: settings.owner.name,
        url: settings.owner.url,
      },
    };
  }
}
