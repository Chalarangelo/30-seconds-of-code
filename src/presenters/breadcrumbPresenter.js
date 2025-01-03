import settings from '#src/config/settings.js';

export default class BreadcrumbPresenter {
  constructor(object, options = {}) {
    this.object = object;
    this.options = options;
  }

  get breadcrumbs() {
    return [
      settings.breadcrumbs.home,
      ...this.collectionBreadcrumbs,
      this.snippetBreadcrumb,
    ].filter(Boolean);
  }

  get recommendedCollection() {
    return this.allCollections
      .filter(
        collection =>
          !this.collectionsForBreadcrumbs.includes(collection) &&
          this.object.journeyId !== collection.id
      )
      .sort((a, b) => b.ranking - a.ranking)[0];
  }

  get allCollections() {
    if (!this.allCollectionsData) {
      this.allCollectionsData = this.object.collections.filter(
        collection => !collection.isMain && !collection.isCollections
      );
    }

    return this.allCollectionsData;
  }

  get orderedCollections() {
    const primaryCollection = this.allCollections.find(
      collection => collection.isPrimary
    );
    const allSecondaryCollections = this.allCollections.filter(
      collection => collection.isSecondary
    );

    const mainSecondaryCollection = allSecondaryCollections.find(collection =>
      collection.matchesTag(this.object.primaryTag)
    );

    const secondaryCollections = allSecondaryCollections.filter(
      collection => collection !== mainSecondaryCollection
    );

    const otherCollections = this.object.collections.filter(
      collection =>
        !collection.isMain &&
        collection !== primaryCollection &&
        !allSecondaryCollections.includes(collection)
    );

    return [
      primaryCollection,
      mainSecondaryCollection,
      ...secondaryCollections,
      ...otherCollections,
    ].filter(Boolean);
  }

  // TODO: There's some fiddly logic with this here, second pass please!
  get collectionsForBreadcrumbs() {
    if (!this.object.hasCollection) return [];

    const collectionsForBreadcrumbs = [];

    if (this.orderedCollections[0].isPrimary)
      collectionsForBreadcrumbs.push(this.orderedCollections[0]);

    if (this.orderedCollections[1])
      collectionsForBreadcrumbs.push(this.orderedCollections[1]);

    return collectionsForBreadcrumbs;
  }

  get collectionBreadcrumbs() {
    return this.collectionsForBreadcrumbs.map(collection => ({
      url: collection.firstPageSlug,
      name: collection.miniTitle,
    }));
  }

  get snippetBreadcrumb() {
    return {
      url: this.object.slug,
      name: this.object.shortTitle,
    };
  }
}
