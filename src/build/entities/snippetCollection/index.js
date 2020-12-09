import { ArgsError } from 'build/utilities/error';
import { uniqueElements } from 'utils';
import literals from 'lang/en';

export class SnippetCollection {
  constructor({ type, slugPrefix, ...rest }, snippets) {
    if (!type || !slugPrefix) {
      throw new ArgsError(
        "Missing required keys. One or more of the following keys were not specified: 'type', 'slugPrefix'"
      );
    }

    if (!snippets || !snippets.length) {
      throw new ArgsError(
        "Missing required argument. 'snippets' must be a non-empty array."
      );
    }
    // TODO: Check - 'language' and 'tag' need to have a 'config'
    // TODO: Check - 'tag` needs to have a 'tag` and 'parentCollection' as well
    // 'main', 'blog', 'language', 'tag', 'collection'
    this.type = type;
    this.slugPrefix = slugPrefix;
    this.snippets = snippets.sort((a, b) => b.ranking - a.ranking);
    Object.keys(rest).forEach(key => {
      if (key === 'name') this._name = rest[key];
      else this[key] = rest[key];
    });

    this.loadCollectionMeta();
    return this;
  }

  static collectionMetas = [];

  loadCollectionMeta = () => {
    if (['language', 'blog'].includes(this.type)) {
      SnippetCollection.collectionMetas.push(this.meta);
    }
  };

  addSnippets = snippets => {
    this.snippets.push(...snippets);
    this.snippets.sort((a, b) => b.ranking - a.ranking);
  };

  get orders() {
    if (!this._orders) {
      this._orders = ['p'];
      if (this.type === 'blog') {
        this._orders.push('n');
      } else if (['tag', 'language'].includes(this.type)) {
        this._orders.push('a', 'e');
      }
    }
    return this._orders;
  }

  get meta() {
    return {
      name: this.name,
      tags: this.tags,
      url: this.url,
      slugPrefix: this.slugPrefix,
      featured: this.featured,
      blog: this.blog,
      icon: this.icon,
    };
  }

  get name() {
    if (!this._name) {
      switch (this.type) {
        case 'main':
          this._name = literals.listing.snippetList;
          break;
        case 'blog':
          this._name = literals.listing.blog;
          break;
        case 'language':
          this._name = literals.listing.codelang(this.config.language.long);
          break;
        case 'tag':
          this._name = literals.listing.codelangTag(
            this.config.language.long,
            this.tag
          );
          break;
        default:
          break;
      }
    }
    return this._name;
  }

  get seoDescription() {
    if (!this._seoDescription) {
      this._seoDescription = literals.listing.pageDescription(this.type, {
        snippetCount: this.snippets.length,
        listingLanguage: ['language', 'tag'].includes(this.type)
          ? this.config.language.long
          : '',
        listingTag: this.type === 'tag' ? this.tag : '',
      });
    }
    return this._seoDescription;
  }

  get tags() {
    if (!['language', 'tag', 'blog'].includes(this.type)) return undefined;
    if (!this._tags) {
      if (this.type === 'tag') return this.parentCollection.tags;
      this._tags = uniqueElements(
        this.snippets.map(snippet => snippet.tags.primary)
      ).sort((a, b) => a.localeCompare(b));
      if (this.config && this.config.language && this.config.language.long) {
        this._tags = this._tags.filter(
          t => t.toLowerCase() !== this.config.language.long.toLowerCase()
        );
      }
    }
    return this._tags;
  }

  get featured() {
    if (!['language', 'blog'].includes(this.type)) return 0;
    return this.config.featured;
  }

  get blog() {
    return this.type === 'blog';
  }

  get icon() {
    if (!['language', 'blog'].includes(this.type)) return undefined;
    return this.config.theme && this.config.theme.iconName;
  }

  get url() {
    return `${this.slugPrefix}/p/1`;
  }

  get rootUrl() {
    return this.type === 'tag'
      ? this.parentCollection.slugPrefix
      : this.slugPrefix;
  }

  get language() {
    if (!['language', 'tag'].includes(this.type)) return undefined;
    return literals.listing.codelang(this.config.language.long);
  }

  get isTopLevel() {
    return ['language', 'blog'].includes(this.type);
  }

  get isListed() {
    if (!this._isListed) {
      if (['blog', 'main'].includes(this.type)) {
        this._isListed = true;
      } else if (['language', 'tag'].includes(this.type)) {
        this._isListed = this.config.featured > 0;
      } else {
        this._isListed = false;
      }
    }
    return this._isListed;
  }
}
