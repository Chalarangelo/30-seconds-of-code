import path from 'path';
import { InstanceCache } from 'build/utilities/instanceCache';
import { ArgsError } from 'build/utilities/error';
import { Tag } from 'build/utilities/tag';
import { ContentConfig } from 'build/entities/contentConfig';
import { MarkdownParser } from 'build/parsers/markdown';
import { convertToSeoSlug, uniqueElements, stripMarkdownFormat } from 'utils';
import rankSnippet from 'engines/rankingEngine';
import tokenizeSnippet from 'engines/searchIndexingEngine';
import sass from 'node-sass';
import literals from 'lang/en/snippet';

const mdCodeFence = '```';
const codeMatcher = new RegExp(
  `${mdCodeFence}.*\r?\n(?<code>[\\S\\s]*?)${mdCodeFence}`,
  'g'
);

export class Snippet {
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
    },
    config
  ) {
    if (!title || !tags || !firstSeen || !lastUpdated || !body) {
      throw new ArgsError(
        "Missing required keys. One or more of the following keys were not specified: 'name', 'dirName', 'repoUrl', 'snippetPath', 'slug', 'featured'"
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
    return `${this.config.sourceDir}/${this.fileName.slice(0, -3)}`;
  }

  get slug() {
    if (!this._slug) {
      // TODO: verify if this util can be moved under `build/utilities`
      this._slug = `/${this.config.slugPrefix}${convertToSeoSlug(
        this.fileName.slice(0, -3)
      )}`;
    }
    return this._slug;
  }

  get titleSlug() {
    if (!this._titleSlug) {
      // TODO: verify if this util can be moved under `build/utilities`
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
        ? 'blog'
        : Tag.determineExpertise(this.tags.all);
    }
    return this._expertise;
  }

  get isListed() {
    return this.config.featured > 0;
  }

  get icon() {
    if (!this._icon) {
      let langIcon;
      if (this.config.isBlog) {
        langIcon = this.config.langData.find(l =>
          this.tags.all.includes(l.language)
        );
      }
      this._icon = langIcon ? langIcon.icon : this.config.icon;
    }
    return this._icon;
  }

  get ranking() {
    // TODO: Update the ranker to be a util
    if (!this._ranking) {
      this._ranking = rankSnippet({
        title: this.title,
        tags: this.tags,
        type: this.type,
        text: this.text,
        code: this.code,
        firstSeen: this.firstSeen,
        language: this.config.language,
        biasPenaltyMultiplier: this.config.biasPenaltyMultiplier
          ? this.config.biasPenaltyMultiplier
          : 1.0,
      });
    }
    return this._ranking;
  }

  get searchTokens() {
    // TODO: Update searchEngine accordingly
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
