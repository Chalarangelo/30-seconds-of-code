import { InstanceCache } from 'blocks/utilities/instanceCache';
import { ArgsError } from 'blocks/utilities/error';

/**
 * A content configuration (i.e. the data and metadata from a content/configs JSON file).
 */
export class ContentConfig {
  /**
   * Cretea a content configuration from the JSON data given.
   * @param {object} config - Content configuration data. Must contain:
   *   - `name` - The name of the configuration.
   *   - `dirName` - Directory for the content source.
   *   - `snippetPath` - Directory for snippets inside the content source.
   *   - `featured` - > 0 if the content is listed, -1 if it's not.
   *   - `repoUrl` - Base url for the GitHub repository.
   *   - `slug` - Base url for the content pages.
   * @throws Will throw an error if any of the necessary keys is not present.
   */
  constructor({
    name,
    dirName,
    repoUrl,
    snippetPath,
    slug,
    featured,
    theme = null,
    biasPenaltyMultiplier = 1.0,
    cardTemplate = 'StandardSnippetCard',
    isBlog = false,
    ...rest
  }) {
    if (!name || !dirName || !repoUrl || !snippetPath || !slug || !featured) {
      throw new ArgsError(
        "Missing required keys. One or more of the following keys were not specified: 'name', 'dirName', 'repoUrl', 'snippetPath', 'slug', 'featured'"
      );
    }

    this.name = name;
    this.dirName = dirName;
    this.repoUrl = repoUrl;
    this.snippetPath = snippetPath;
    this.slug = slug;
    this.featured = featured;
    this.theme = theme;
    this.biasPenaltyMultiplier = biasPenaltyMultiplier;
    this.cardTemplate = cardTemplate;
    this.isBlog = Boolean(isBlog);
    Object.keys(rest).forEach(key => {
      this[key] = rest[key];
    });

    this._loadLangData();
    ContentConfig.instances.add(this.id, this);

    return this;
  }

  static instances = new InstanceCache();

  static langData = [
    {
      shortCode: 'html',
      languageLiteral: 'HTML',
    },
  ];

  _loadLangData = () => {
    if (
      !this.language ||
      !this.language.long ||
      !this.theme ||
      !this.theme.iconName
    )
      return;
    ContentConfig.langData.push({
      language: this.language.long.toLowerCase(),
      shortCode: this.language.short,
      languageLiteral: this.language.long,
      icon: this.theme.iconName,
    });
  };

  get id() {
    return `${this.name}`;
  }

  get slugPrefix() {
    return `${this.slug}/s`;
  }

  get repoUrlPrefix() {
    return `${this.repoUrl}/blob/master/${this.snippetPath}`;
  }

  get vscodeUrlPrefix() {
    return `${global.settings.paths.rawContentPath}/sources/${this.sourceDir}`;
  }

  get isCSS() {
    return this.dirName === '30css';
  }

  get hasOptionalLanguage() {
    if (!this._hasOptionalLanguage) {
      this._hasOptionalLanguage = Boolean(
        !this.isCSS &&
          !this.isBlog &&
          this.optionalLanguage &&
          this.optionalLanguage.short
      );
    }
    return this._hasOptionalLanguage;
  }

  get languages() {
    if (!this._languages) {
      this._languages = this.isBlog
        ? []
        : [
            this.language.short,
            this.isCSS ? this.secondLanguage.short : null,
            this.hasOptionalLanguage || this.isCSS
              ? this.optionalLanguage.short
              : null,
          ]
            .filter(Boolean)
            .join('|');
    }
    return this._languages;
  }

  get authors() {
    // TODO: Consider parsing this via a new parser or similar
    // The argument against is that it's a single case and might not extend to other repos in the future
    if (!this._authors) {
      this._authors = this.isBlog
        ? {
            ...require('../../../../content/sources/30blog/blog_data/blog_authors'),
          }
        : [];
    }
    return this._authors;
  }

  get icon() {
    return this.theme ? this.theme.iconName : null;
  }

  get sourceDir() {
    return `${this.dirName}/${this.snippetPath}`;
  }

  get langData() {
    return ContentConfig.langData;
  }

  get commonData() {
    if (!this._commonData) {
      const language = this.language || {};
      let otherLanguages = [];
      if (this.secondLanguage) otherLanguages.push(this.secondLanguage);
      if (this.optionalLanguage) otherLanguages.push(this.optionalLanguage);
      if (otherLanguages.length) language.otherLanguages = otherLanguages;

      this._commonData = {
        blog: Boolean(this.isBlog),
        language,
      };
    }

    return this._commonData;
  }

  get assetPath() {
    return `/${global.settings.paths.staticAssetPath}`;
  }

  get outPath() {
    return global.settings.paths.contentPath;
  }
}
