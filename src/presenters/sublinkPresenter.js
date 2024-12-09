import Collection from '#src/models/collection.js';
import settings from '#src/config/settings.js';

export default class SublinkPresenter {
  constructor(object, options = {}) {
    this.object = object;
    this.options = options;
  }

  get sublinks() {
    if (this.object.isMain) {
      return Collection.scope('primary', 'byRanking')
        .filter(collection => !collection.isUpdateLogs)
        .map(collection => this.toSublink(collection))
        .flat()
        .concat([settings.sublinks.moreCollections]);
    }

    if (!this.object.isPrimary && !this.object.hasParent) return [];

    if (this.object.isPrimary && this.object.children.length === 0) return [];

    let links = this.object.hasParent
      ? this.object.siblings
      : this.object.children;

    console;

    links = links
      .map(link => this.toSublink(link, link.id === this.object.id))
      .sort((a, b) => a.title.localeCompare(b.title));

    links.unshift({
      title: settings.sublinks.parentTitle,
      url: `${this.object.rootUrl}/p/1`,
      selected: this.object.isPrimary,
    });

    return links;
  }

  toSublink(collection, selected = false) {
    return {
      title: collection.miniTitle,
      url: collection.firstPageSlug,
      selected,
    };
  }
}
