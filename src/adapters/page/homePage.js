import Page from '#src/adapters/page.js';
import Collection from '#src/models/collection.js';
import Snippet from '#src/models/snippet.js';
import CoverPresenter from '#src/presenters/coverPresenter.js';
import settings from '#src/config/settings.js';

export default class HomePage extends Page {
  static {
    Page.register(this);
  }

  get params() {
    return null;
  }

  get props() {
    return {
      featuredCollections: this.featuredCollections,
      featuredSnippets: this.featuredSnippets,
      splashImage: this.coverUrl,
      splashImageSrcSet: this.coverSrcset,
      snippetListUrl: this.mainListingUrl,
      pageDescription: this.seoDescription,
      announcement: this.announcement,
    };
  }

  get schemaData() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: settings.website.url,
    };
  }

  get featuredCollections() {
    return Collection.scope('featured')
      .slice(0, settings.home.topCollectionChips)
      .map(collection => collection.preview)
      .concat([this.exploreCollections]);
  }

  get featuredSnippets() {
    const newSnippets = Snippet.scope('listed', 'published', 'byNew').slice(
      0,
      settings.home.newSnippetCards
    );

    const topSnippets = Snippet.scope('listed', 'published', 'byRanking')
      .slice(0, settings.home.topSnippetCards * 5)
      .shuffle();

    return [...new Set(newSnippets.concat(topSnippets))]
      .slice(0, settings.home.topSnippetCards + settings.home.newSnippetCards)
      .map(snippet => snippet.preview);
  }

  get seoDescription() {
    const snippetCount = Snippet.scope('published', 'listed').length;
    const websiteName = settings.website.name;
    return settings.website.seoDescription({ snippetCount, websiteName });
  }

  get mainListingUrl() {
    return Collection.main.firstPageSlug;
  }

  get exploreCollections() {
    return {
      title: 'Explore collections',
      url: Collection.collections.firstPageSlug,
      icon: 'arrow-right',
      selected: false,
    };
  }

  get announcement() {
    const latestUpdateLog = Snippet.scope(
      'updateLogs',
      'published',
      'byNew',
      'last30Days'
    )?.first;

    if (!latestUpdateLog) return null;

    return {
      text: 'Read the latest update log:',
      linkText: latestUpdateLog.previewTitle,
      linkUrl: latestUpdateLog.url,
    };
  }

  get coverPresenter() {
    return new CoverPresenter({ cover: settings.home.cover });
  }

  get coverUrl() {
    return this.coverPresenter.coverUrl();
  }

  get coverSrcset() {
    return this.coverPresenter.coverSrcset();
  }
}
