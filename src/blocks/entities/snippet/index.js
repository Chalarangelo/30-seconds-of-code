import path from 'path';
import { InstanceCache } from 'blocks/utilities/instanceCache';
import { ArgsError } from 'blocks/utilities/error';
import { Tag } from 'blocks/utilities/tag';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { MarkdownParser } from 'blocks/parsers/markdown';
import { convertToSeoSlug, uniqueElements, stripMarkdownFormat } from 'utils';
import { Ranker } from 'blocks/utilities/ranker';
import tokenizeSnippet from 'utils/search';
import sass from 'node-sass';
import literals from 'lang/en/snippet';
import clientLiterals from 'lang/en/client/common';

const mdCodeFence = '```';
const codeMatcher = new RegExp(
  `${mdCodeFence}.*\r?\n(?<code>[\\S\\s]*?)${mdCodeFence}`,
  'g'
);

/**
 * An object representing a single snippet's data.
 * Note: Do not use directly for page serialization.
 */
export class Snippet {
  /**
   * Creates a new snippet instance from the given data (i.e. a parsed MD file).
   * @param {object} snippet - Snippet data. Keys:
   *  - `fileName` - Name of the snippet (markdown) file.
   *  - `title` - Snippet title.
   *  - `tags` - Snippet tags as a comma-separated string.
   *  - `type` (optional) - Snippet type. Required if the snippet is a blog.
   *  - `firstSeen` - Snippet creation date as a string (from git).
   *  - `lastUpdated` - Last update date as a string (from git).
   *  - `body` - Snippet textual content as a markdown string.
   *  - `excerpt` (optional) - Snippet excerpt. Required if the snippet is a blog.
   *  - `cover` (optional) - Snippet cover image filename. Required if the snippet is a blog.
   *  - `authors` (optional) - Snippet authors as a comma-separated string. Required if the snippet is a blog.
   *  - `restMeta` (optional) - Remaining snippet metadata, if any.
   * @param {ContentConfig} config - The content configuration for the file's source repo.
   * @throws Will throw an error if any of the necessary keys is not present or `config`
   *   is not of the correct type.
   */
  constructor(
    {
      fileName,
      title,
      tags,
      type,
      excerpt,
      cover,
      authors,
      firstSeen,
      lastUpdated,
      body,
      ...restMeta
    },
    config
  ) {
    if (!fileName || !title || !tags || !firstSeen || !lastUpdated || !body) {
      throw new ArgsError(
        "Missing required keys. One or more of the following keys were not specified: 'fileName', 'title', 'tags', 'firstSeen', 'lastUpdated', 'body'"
      );
    }

    if (!(config instanceof ContentConfig)) {
      throw new ArgsError(
        "Invalid arguments. 'config' must be an instance of 'ContentConfig'."
      );
    }

    this.config = config;
    this.fileName = fileName;
    this.title = title;
    this.type = config.isBlog ? `blog.${type}` : 'snippet';
    this.firstSeen = firstSeen;
    this.lastUpdated = lastUpdated;
    this._frontmatterMetadata = restMeta;

    const allTags = [...new Set(tags.toLowerCase().split(','))];
    this.tags = {
      all: allTags,
      primary: allTags[0],
    };

    this._initTextContent(body, excerpt);
    this._initCodeContent(body);

    if (config.isBlog) {
      this.authors = [...new Set(authors.toLowerCase().split(','))].map(
        a => config.authors[a]
      );
      this.cover = `${this.config.assetPath}/${cover}`;
    }

    Object.keys(config.commonData).forEach(key => {
      this[key] = config.commonData[key];
    });

    Snippet.instances.add(this.id, this);
    return this;
  }

  static instances = new InstanceCache();

  get id() {
    if (!this._id) {
      this._id = `${this.config.slugPrefix}${convertToSeoSlug(
        this.fileName.slice(0, -3)
      )}`;
    }
    return this._id;
  }

  get slug() {
    if (!this._slug) {
      this._slug = `/${this.config.slugPrefix}${convertToSeoSlug(
        this.fileName.slice(0, -3)
      )}`;
    }
    return this._slug;
  }

  get titleSlug() {
    if (!this._titleSlug) {
      this._titleSlug = convertToSeoSlug(this.title);
    }
    return this._titleSlug;
  }

  get url() {
    return `${this.config.repoUrlPrefix}/${this.fileName}`;
  }

  get vscodeUrl() {
    if (!this._vscodeUrl) {
      this._vscodeUrl = `vscode://file/${path.resolve(
        this.config.vscodeUrlPrefix,
        this.fileName
      )}`;
    }
    return this._vscodeUrl;
  }

  get expertise() {
    if (!this._expertise) {
      this._expertise = this.config.isBlog
        ? 'article'
        : Tag.determineExpertise(this.tags.all);
    }
    return this._expertise;
  }

  get isListed() {
    if (!this._isListed) {
      const isUnlistedSnippet =
        this._frontmatterMetadata && this._frontmatterMetadata.unlisted
          ? this._frontmatterMetadata.unlisted
          : false;
      this._isListed =
        this.config.featured > 0 && !isUnlistedSnippet && !this.isScheduled;
    }
    return this._isListed;
  }

  get isScheduled() {
    if (!this._isScheduled) {
      this._isScheduled = this.firstSeen > new Date();
    }
    return this._isScheduled;
  }

  get icon() {
    if (!this._icon) {
      let mapped;
      if (this.config.isBlog) {
        const lang = this.config.langData.find(l =>
          this.tags.all.includes(l.language)
        );
        if (lang) {
          const tag = this.tags.all.find(t => lang.tags[t]);
          mapped = tag ? tag : lang.icon;
        }
      }
      this._icon = mapped
        ? mapped
        : this.config.tagIcons[this.tags.primary]
        ? this.config.tagIcons[this.tags.primary]
        : this.config.icon;
    }
    return this._icon;
  }

  get ranking() {
    if (!this._ranking) {
      this._ranking = Ranker.rankSnippet(this);
    }
    return this._ranking;
  }

  get searchTokens() {
    if (!this._searchTokens) {
      this._searchTokens = uniqueElements(
        this.config.isBlog
          ? [
              ...Tag.stripExpertise(this.tags.all),
              ...tokenizeSnippet(`${this.text.short} ${this.title}`),
            ].map(v => v.toLowerCase())
          : [
              this.title,
              this.config.language.short,
              this.config.language.long,
              ...Tag.stripExpertise(this.tags.all),
              ...tokenizeSnippet(this.text.short),
            ].map(v => v.toLowerCase())
      ).join(' ');
    }
    return this._searchTokens;
  }

  get html() {
    return MarkdownParser.parseSegments(
      {
        texts: {
          fullDescription: this.text.full,
          description: this.text.short,
        },
        codeBlocks: this.rawCode,
      },
      {
        isBlog: this.config.isBlog,
        type: this.type,
        assetPath: this.config.assetPath,
        langData: this.config.langData,
      }
    );
  }

  get breadcrumbs() {
    if (!this._breadcrumbs) {
      const slugParts = this.slug.split('/').filter(Boolean).slice(0, -2);
      this._breadcrumbs = [
        {
          url: '/',
          name: clientLiterals.home,
        },
        {
          url: `/${slugParts[0]}/p/1`,
          name:
            this.config.cardTemplate === 'BlogSnippetCard'
              ? Tag.format('article')
              : this.language.long,
        },
      ];

      if (this.config.cardTemplate !== 'BlogSnippetCard')
        this._breadcrumbs.push({
          url: `/${slugParts[0]}/t/${this.tags.primary.toLowerCase()}/p/1`,
          name: `${Tag.format(this.tags.primary)}`,
        });

      this._breadcrumbs.push({
        url: this.slug,
        name: this.title,
      });
    }
    return this._breadcrumbs;
  }

  _initTextContent(body, excerpt) {
    let shortSliceIndex, shortText;
    const text = body
      .slice(0, body.indexOf(mdCodeFence))
      .replace(/\r\n/g, '\n');

    if (this.config.isBlog) {
      shortSliceIndex =
        text.indexOf('\n\n') <= 180
          ? text.indexOf('\n\n')
          : text.indexOf(' ', 160);
      shortText =
        excerpt && excerpt.trim().length !== 0
          ? excerpt
          : `${text.slice(0, shortSliceIndex)}...`;
    } else shortText = text.slice(0, text.indexOf('\n\n'));
    const parsedDescription = stripMarkdownFormat(shortText);

    this.text = {
      full: this.config.isBlog ? body : text,
      short: shortText,
    };

    this.seoDescription =
      this.config.cardTemplate === 'BlogSnippetCard' ||
      parsedDescription.length <= 160
        ? parsedDescription
        : literals.pageDescription(this.title, this.config.language.long);
  }

  _initCodeContent(body) {
    this.rawCode = {};
    if (!this.config.isBlog) {
      this.code = {};
      const codeBlocks = [...body.matchAll(codeMatcher)].map(v => ({
        raw: v[0].trim(),
        code: v.groups.code.trim(),
      }));

      if (this.config.isCSS) {
        this.code.html = codeBlocks[0].code;
        this.rawCode.html = codeBlocks[0].raw;
        this.code.css = codeBlocks[1].code;
        this.rawCode.css = codeBlocks[1].raw;
        this.code.scopedCss = sass
          .renderSync({
            data: `[data-scope="${this.fileName.slice(0, -3)}"] { ${
              codeBlocks[1].code
            } }`,
          })
          .css.toString();
        if (codeBlocks.length > 2) {
          this.code.js = codeBlocks[2].code;
          this.rawCode.js = codeBlocks[2].raw;
        }
      } else if (this.config.hasOptionalLanguage && codeBlocks.length > 2) {
        this.code.style = codeBlocks[0].code;
        this.rawCode.style = codeBlocks[0].raw;
        this.code.src = codeBlocks[1].code;
        this.rawCode.code = codeBlocks[1].raw;
        this.code.example = codeBlocks[2].code;
        this.rawCode.example = codeBlocks[2].raw;
      } else {
        if (codeBlocks.length === 0) console.log(this.id);
        if (this.config.hasOptionalLanguage) {
          this.code.style = '';
          this.rawCode.style = '';
        }
        this.code.src = codeBlocks[0].code;
        this.rawCode.code = codeBlocks[0].raw;
        this.code.example = codeBlocks[1].code;
        this.rawCode.example = codeBlocks[1].raw;
      }
    }
  }
}
