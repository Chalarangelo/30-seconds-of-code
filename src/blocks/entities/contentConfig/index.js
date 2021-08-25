import pathSettings from 'settings/paths';
import { ArgsError } from 'blocks/utilities/error';
import { convertToSeoSlug } from 'utils';

/**
 * A content configuration (i.e. the data and metadata from a content/configs JSON file).
 */
export class ContentConfig {
  /**
   * Create a content configuration from the JSON data given.
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
    iconName = null,
    biasPenaltyMultiplier = 1.0,
    cardTemplate = 'StandardSnippetCard',
    isBlog = false,
    ...rest
  }) {
    if (!name || !dirName || !repoUrl || !snippetPath || !slug) {
      throw new ArgsError(
        "Missing required keys. One or more of the following keys were not specified: 'name', 'dirName', 'repoUrl', 'snippetPath', 'slug', 'featured'"
      );
    }

    this.name = name;
    this.dirName = dirName;
    this.repoUrl = repoUrl;
    this.snippetPath = snippetPath;
    this.slug = slug;
    this.featured = Boolean(featured);
    this.iconName = iconName;
    this.biasPenaltyMultiplier = biasPenaltyMultiplier;
    this.cardTemplate = cardTemplate;
    this.isBlog = Boolean(isBlog);
    Object.keys(rest).forEach(key => {
      this[key] = rest[key];
    });

    ContentConfig.instances.set(this.id, this);
    if (
      this.language &&
      this.language.long &&
      this.iconName &&
      !ContentConfig.languageData.has(this.language.long.toLowerCase())
    ) {
      ContentConfig.languageData.set(this.language.long.toLowerCase(), {
        language: this.language.long.toLowerCase(),
        shortCode: this.language.short,
        languageLiteral: this.language.long,
        icon: this.iconName,
        tags: Object.keys(this.tagIcons).length ? this.tagIcons : {},
      });
    }

    return this;
  }

  static instances = new Map();

  static languageData = new Map([
    [
      'html',
      {
        shortCode: 'html',
        languageLiteral: 'HTML',
      },
    ],
  ]);

  /**
   * Given a raw snippet file path, returns the matching config.
   * @param {string} snippetPath - The path of the raw snippet file.
   */
  static findContentConfigFromRawSnippet = snippetPath => {
    const snippetDirName = snippetPath.split('/').slice(-3, -2)[0];
    return [...ContentConfig.instances.values()].find(
      cfg => cfg.dirName === snippetDirName
    );
  };

  /**
   * Given a raw snippet file path, returns the matching page slug.
   * @param {string} snippetPath - The path of the raw snippet file.
   */
  static findSlugFromRawSnippet = snippetPath => {
    const config = ContentConfig.findContentConfigFromRawSnippet(snippetPath);
    const snippetName = snippetPath.split('/').slice(-1)[0].split('.')[0];
    return `/${config.slugPrefix}${convertToSeoSlug(snippetName)}`;
  };

  get id() {
    return `${this.dirName}`;
  }

  get slugPrefix() {
    return `${this.slug}/s`;
  }

  get repoUrlPrefix() {
    return `${this.repoUrl}/blob/master/${this.snippetPath}`;
  }

  get vscodeUrlPrefix() {
    return `${pathSettings.rawContentPath}/sources/${this.sourceDir}`;
  }

  get isCSS() {
    return this.dirName === '30css';
  }

  get isReact() {
    return this.dirName === '30react';
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
    return this.iconName ? this.iconName : null;
  }

  get tagIcons() {
    if (!this._tagIcons) {
      this._tagIcons = this.tagMetadata
        ? Object.keys(this.tagMetadata).reduce((acc, key) => {
            if (this.tagMetadata[key].iconName)
              acc[key] = this.tagMetadata[key].iconName;
            return acc;
          }, {})
        : {};
    }
    return this._tagIcons;
  }

  get sourceDir() {
    return `${this.dirName}/${this.snippetPath}`;
  }

  get languageData() {
    return [...ContentConfig.languageData.values()];
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
}
