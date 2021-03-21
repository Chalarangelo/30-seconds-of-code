import { InstanceCache } from 'blocks/utilities/instanceCache';
import { ArgsError } from 'blocks/utilities/error';
import { uniqueElements } from 'utils';
import tokenizeCollection from 'utils/search';
import literals from 'lang/en';

const ALLOWED_TYPES = ['main', 'blog', 'language', 'tag', 'collection'];

/**
 * A collection of snippets (e.g. snippets of the same language, tag etc.).
 * Note: Do not use directly for page serialization.
 */
export class SnippetCollection {
  /**
   * Creates a collection of snippets.
   * @param {object} collectionInfo - Collection data. Required keys:
   *  - `type`: One of ['main', 'blog', 'language', 'tag', 'collection']
   *  - `slugPrefix`: The prefix for listed slugs in the collection.
   *  - `config`: One of the following:
   *    - The ContentConfig of the collection. Required by 'language' and 'tag' types.
   *    - The CollectionConfig of the collection. Required by the collection' type.
   *  - `parentCollection`: The parent SnippetCollection. Required by the 'tag' type.
   *  - `tag`: The tag name (string) of the collection. Required by the 'tag' type.
   * @param {Array<Snippet>} snippets - An array of Snippet objects.
   * @throws Will throw an error if any of the necessary keys is invalid or `snippets`
   *   is not of the correct type.
   */
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

    if (!ALLOWED_TYPES.includes(type)) {
      throw new ArgsError(
        `Invalid argument. 'type' must be one of: [${ALLOWED_TYPES.map(
          v => `'${v}`
        ).join(', ')}].`
      );
    }

    if (['language', 'tag', 'collection'].includes(type) && !rest.config) {
      throw new ArgsError(
        `Missing required argument. 'config' must be a non-empty object when the type is '${type}'.`
      );
    }

    if (type === 'tag' && (!rest.parentCollection || !rest.tag)) {
      throw new ArgsError(
        "Missing required argument. 'tag' and 'parentCollection' must be a specified when the type is 'tag'."
      );
    }

    this.type = type;
    this.slugPrefix = slugPrefix;
    this.snippets =
      type === 'collection'
        ? snippets
        : snippets.sort((a, b) => b.ranking - a.ranking);
    Object.keys(rest).forEach(key => {
      if (key === 'name') this._name = rest[key];
      else this[key] = rest[key];
    });

    SnippetCollection.instances.add(this.id, this);
    return this;
  }

  static instances = new InstanceCache();

  /**
   * Injects additional snippets into an existing collection.
   * @param {Array<Snippet>} snippets - An array of snippets to be injected into the collection.
   * @returns The collection instance.
   */
  addSnippets = snippets => {
    this.snippets.push(...snippets);
    if (this.type !== 'collection')
      this.snippets.sort((a, b) => b.ranking - a.ranking);
    return this;
  };

  /**
   * Determines if the collection contains a snippet with the given id.
   * @param {String} snippetId - A snippet id.
   * @returns {Boolean} `true` if the collection includes the snippet, `false` otherwise.
   */
  hasSnippet = snippetId =>
    Boolean(this.snippets.find(s => s.id === snippetId));

  get id() {
    return `${this.type}${this.slugPrefix}`;
  }

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

  get tagMetadata() {
    if (!this._tagMetadata) {
      this._tagMetadata =
        this.tag &&
        this.config.tagMetadata &&
        this.config.tagMetadata[this.tag];
    }
    return this._tagMetadata;
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
        case 'collection':
          this._name = this.config.name;
          break;
        case 'language':
          this._name = literals.listing.codelang(this.config.language.long);
          break;
        case 'tag':
          this._name =
            this.tagMetadata && this.tagMetadata.name
              ? this.tagMetadata.name
              : literals.listing.codelangTag(
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

  /**
   * Short name. Used only in listing metas (e.g. sublink text).
   */
  get shortName() {
    if (!this._shortName) {
      switch (this.type) {
        case 'main':
          this._shortName = literals.listing.snippetList;
          break;
        case 'blog':
          this._shortName = literals.listing.blog;
          break;
        case 'collection':
          this._shortName = this.config.name;
          break;
        case 'language':
          this._shortName = literals.listing.shortCodelang(
            this.config.language.long
          );
          break;
        case 'tag':
          this._shortName =
            this.tagMetadata && this.tagMetadata.shortName
              ? this.tagMetadata.shortName
              : this.tagMetadata && this.tagMetadata.name
              ? this.tagMetadata.name
              : literals.listing.shortCodelangTag(
                  this.config.language.long,
                  this.tag
                );
          break;
        default:
          break;
      }
    }
    return this._shortName;
  }

  get description() {
    if (!this._description) {
      switch (this.type) {
        case 'main':
          this._description = null;
          break;
        case 'blog':
          this._description = null;
          break;
        case 'collection':
          this._description =
            this.config.description && this.config.description.length
              ? this.config.description
              : null;
          break;
        case 'language':
          this._description =
            this.config.description && this.config.description.length
              ? this.config.description
              : null;
          break;
        case 'tag':
          this._description =
            this.tagMetadata && this.tagMetadata.description
              ? this.tagMetadata.description
              : this.config.description && this.config.description.length
              ? this.config.description
              : null;
          break;
        default:
          break;
      }
    }
    return this._description;
  }

  get shortDescription() {
    if (!this._shortDescription) {
      switch (this.type) {
        case 'main':
          this._shortDescription = null;
          break;
        case 'blog':
        case 'collection':
        case 'language':
          this._shortDescription =
            this.config.shortDescription && this.config.shortDescription.length
              ? this.config.shortDescription
              : null;
          break;
        case 'tag':
          this._shortDescription =
            this.tagMetadata && this.tagMetadata.shortDescription
              ? this.tagMetadata.shortDescription
              : this.config.shortDescription &&
                this.config.shortDescription.length
              ? this.config.shortDescription
              : null;
          break;
        default:
          break;
      }
    }
    return this._shortDescription;
  }

  get splash() {
    if (!this._splash) {
      const assetPath = `/${global.settings.paths.staticAssetPath}`;
      switch (this.type) {
        case 'main':
          this._splash = null;
          break;
        case 'blog':
          this._splash = null;
          break;
        case 'language':
          this._splash = this.config.splash
            ? `${assetPath}/${this.config.splash}`
            : null;
          break;
        case 'tag':
          this._splash =
            this.tagMetadata && this.tagMetadata.splash
              ? `${assetPath}/${this.tagMetadata.splash}`
              : this.config.splash
              ? `${assetPath}/${this.config.splash}`
              : null;
          break;
        case 'collection':
          this._splash = this.config.splash
            ? `${assetPath}/${this.config.splash}`
            : null;
          break;
        default:
          break;
      }
    }
    return this._splash;
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
    return this.config ? this.config.featured : 0;
  }

  get blog() {
    return this.type === 'blog';
  }

  get icon() {
    if (!this._icon) {
      switch (this.type) {
        case 'language':
        case 'blog':
        case 'collection':
          this._icon = this.config && this.config.iconName;
          break;
        case 'tag':
          this._icon =
            this.tagMetadata && this.tagMetadata.iconName
              ? this.tagMetadata.iconName
              : this.config && this.config.iconName;
          break;
        default:
          this._icon = undefined;
          break;
      }
    }
    return this._icon;
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
      if (['blog', 'main', 'collection'].includes(this.type)) {
        this._isListed = true;
      } else if (['language', 'tag'].includes(this.type)) {
        this._isListed = this.config.featured > 0;
      } else {
        this._isListed = false;
      }
    }
    return this._isListed;
  }

  get isSearchable() {
    if (!this._isSearchable) {
      this._isSearchable = this.isListed && this.shortDescription;
    }
    return this._isSearchable;
  }

  get searchTokens() {
    if (!this._searchTokens) {
      const uniqueDescription =
        ['blog', 'collection', 'language'].includes(this.type) &&
        this.config.shortDescription &&
        this.config.shortDescription.length
          ? this.config.shortDescription
          : this.type === 'tag' &&
            this.tagMetadata &&
            this.tagMetadata.shortDescription
          ? this.tagMetadata.shortDescription
          : '';
      this._searchTokens = uniqueElements(
        tokenizeCollection(`${uniqueDescription} ${this.name}`).map(v =>
          v.toLowerCase()
        )
      ).join(' ');
    }
    return this._searchTokens;
  }
}
