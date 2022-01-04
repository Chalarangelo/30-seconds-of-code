import sass from 'node-sass';
import pathSettings from 'settings/paths';
import { Logger } from 'blocks/utilities/logger';
import { Content } from 'blocks/utilities/content';
import { TextParser } from 'blocks/parsers/text';
import { MarkdownParser } from 'blocks/parsers/markdown';
import { JSONHandler } from 'blocks/utilities/jsonHandler';
import { convertToSeoSlug, uniqueElements, stripMarkdownFormat } from 'utils';
import literals from 'lang/en';

const mdCodeFence = '```';
const codeMatcher = new RegExp(
  `${mdCodeFence}.*\r?\n(?<code>[\\S\\s]*?)${mdCodeFence}`,
  'g'
);
export class Extractor {
  static extract = async () => {
    if (process.env.NODE_ENV === 'production') await Content.update();
    const { rawContentPath: contentDir } = pathSettings;
    const contentConfigs = Extractor.extractContentConfigs(contentDir);
    const collectionConfigs = Extractor.extractCollectionConfigs(contentDir);
    const authors = Extractor.extractAuthors(contentDir);
    const languageData = Extractor.processLanguageData(contentConfigs);
    const snippets = await Extractor.extractSnippets(
      contentDir,
      contentConfigs,
      languageData
    );
    const tagData = Extractor.processTagData(contentConfigs, snippets);
    // TODO: Rename the configs file to actually name this key properly
    const featuredListings = Extractor.extractFeaturedListings(contentDir);
    // Language data not passed here by design, pass only if needed
    const data = {
      repositories: contentConfigs.map(config => {
        // Exclude specific keys
        /* eslint-disable no-unused-vars */
        const {
          tagIcons,
          slugPrefix,
          secondLanguage,
          optionalLanguage,
          language: rawLanguage,
          otherLanguages: rawOtherLanguages,
          iconName,
          tagMetadata,
          ...rest
        } = config;
        /* eslint-enable no-unused-vars */
        const language =
          rawLanguage && rawLanguage.long
            ? rawLanguage.long.toLowerCase()
            : null;
        const otherLanguages = rawOtherLanguages.length
          ? rawOtherLanguages.map(lang => lang.long.toLowerCase())
          : null;
        const icon = iconName ? iconName : null;
        return { ...rest, language, otherLanguages, icon };
      }),
      collections: collectionConfigs.map(config => {
        const { iconName, ...rest } = config;
        return { ...rest, icon: iconName };
      }),
      snippets: snippets.map(snippet => {
        // Exclude specific keys
        // eslint-disable-next-line no-unused-vars
        const { rawCode, ...rest } = snippet;
        return { ...rest };
      }),
      authors,
      languages: [...languageData].map(([id, data]) => {
        const { language, shortCode, languageLiteral, iconName, tags } = data;
        return {
          id,
          long: language,
          short: shortCode,
          name: languageLiteral,
          icon: iconName,
          tagIcons: tags,
        };
      }),
      tags: tagData,
      featuredListings,
    };
    await Extractor.writeData(data);
    return data;
  };

  static extractContentConfigs = contentDir => {
    const logger = new Logger('Extractor.extractContentConfigs');
    logger.log('Extracting content configurations');
    const configs = JSONHandler.fromGlob(
      `${contentDir}/configs/repos/*.json`
    ).map(config => {
      const tagIcons = config.tagMetadata
        ? Object.keys(config.tagMetadata || {}).reduce((acc, key) => {
            if (config.tagMetadata[key].iconName)
              acc[key] = config.tagMetadata[key].iconName;
            return acc;
          }, {})
        : {};

      const language = config.language || {};
      let otherLanguages = [];
      if (config.secondLanguage) otherLanguages.push(config.secondLanguage);
      if (config.optionalLanguage) otherLanguages.push(config.optionalLanguage);
      if (otherLanguages.length) language.otherLanguages = otherLanguages;

      return {
        ...config,
        language,
        otherLanguages,
        id: `${config.dirName}`,
        slugPrefix: `${config.slug}/s`,
        tagIcons,
      };
    });
    logger.success('Finished extracting content configurations');
    return configs;
  };

  static extractCollectionConfigs = contentDir => {
    const logger = new Logger('Extractor.extractCollectionConfigs');
    logger.log('Extracting collection configurations');
    const configs = JSONHandler.fromGlob(
      `${contentDir}/configs/collections/*.json`,
      { withNames: true }
    ).map(([path, config]) => {
      const { snippetIds = [], ...rest } = config;
      const id = path.split('/').slice(-1)[0].split('.')[0];
      return {
        ...rest,
        snippetIds,
        id,
      };
    });
    logger.success('Finished extracting collection configurations');
    return configs;
  };

  static extractAuthors = contentDir => {
    const logger = new Logger('Extractor.extractAuthors');
    logger.log('Extracting authors');
    const authors = Object.entries(
      JSONHandler.fromFile(
        `${contentDir}/sources/30blog/blog_data/blog_authors.json`
      )
    ).map(([id, author]) => {
      return {
        ...author,
        id,
      };
    });
    logger.success('Finished extracting authors');
    return authors;
  };

  static processLanguageData = contentConfigs => {
    const logger = new Logger('Extractor.extractLanguageData');
    logger.log('Processing language data');
    const languageData = contentConfigs.reduce(
      (acc, config) => {
        if (
          config.language &&
          config.language.long &&
          config.iconName &&
          !acc.has(config.language.long)
        ) {
          acc.set(config.language.long.toLowerCase(), {
            language: config.language.long.toLowerCase(),
            shortCode: config.language.short,
            languageLiteral: config.language.long,
            iconName: config.iconName,
            tags: Object.keys(config.tagIcons).length ? config.tagIcons : {},
          });
        }
        return acc;
      },
      new Map([
        [
          'html',
          {
            language: 'html',
            shortCode: 'html',
            languageLiteral: 'HTML',
          },
        ],
      ])
    );
    logger.success('Finished processing language data');
    return languageData;
  };

  static processTagData = (contentConfigs, snippetData) => {
    const logger = new Logger('Extractor.processTagData');
    logger.log('Processing tag data');
    const tagData = contentConfigs.reduce((acc, config) => {
      const { isBlog, slug: configSlugPrefix, language } = config;
      const snippets = snippetData.filter(
        snippet => snippet.repository === config.id
      );
      let snippetTags = uniqueElements(
        snippets
          .map(snippet => snippet.tags[0])
          .sort((a, b) => a.localeCompare(b))
      );
      if (config.isBlog)
        snippetTags = snippetTags.filter(
          tag => snippets.filter(s => s.tags.includes(tag)).length >= 10
        );

      const tagData = snippetTags.map(tag => {
        // TODO: Potentially configurable to resolve to an empty object instead
        // of undefined to simplify checks using `||`
        const tagMetadata = config.tagMetadata
          ? config.tagMetadata[tag]
          : undefined;
        const name =
          tagMetadata && tagMetadata.name
            ? tagMetadata.name
            : isBlog
            ? literals.blogTag(tag)
            : literals.codelangTag(language.long, tag);
        const shortName =
          tagMetadata && tagMetadata.shortName
            ? tagMetadata.shortName
            : tagMetadata && tagMetadata.name
            ? tagMetadata.name
            : isBlog
            ? literals.shortBlogTag(tag)
            : literals.shortCodelangTag(language.long, tag);
        const description =
          tagMetadata && tagMetadata.description
            ? tagMetadata.description
            : config.description;
        const shortDescription =
          tagMetadata && tagMetadata.shortDescription
            ? tagMetadata.shortDescription
            : config.shortDescription;
        const splash =
          tagMetadata && tagMetadata.splash
            ? tagMetadata.splash
            : config.splash;
        const icon =
          tagMetadata && tagMetadata.iconName
            ? tagMetadata.iconName
            : config.iconName;
        const slugPrefix = `/${configSlugPrefix}/t/${tag}`;
        return {
          id: `${config.id}_${tag}`,
          slugPrefix,
          name,
          shortName,
          description,
          shortDescription,
          splash,
          icon,
          repository: config.id,
        };
      });
      return [...acc, ...tagData];
    }, []);
    logger.success('Finished processing tag data');
    return tagData;
  };

  static extractSnippets = async (contentDir, contentConfigs, languageData) => {
    const logger = new Logger('Extractor.extractSnippets');
    logger.log('Extracting snippets');
    let snippets = [];
    await Promise.all(
      contentConfigs.map(config => {
        const snippetsPath = `${contentDir}/sources/${config.dirName}/${config.snippetPath}`;

        return TextParser.fromDir(snippetsPath).then(snippetData => {
          const parsedData = snippetData.map(snippet => {
            const {
              fileName,
              title,
              tags: rawTags,
              type: rawType,
              excerpt,
              cover,
              authors: rawAuthors,
              firstSeen,
              lastUpdated,
              body,
              unlisted,
            } = snippet;

            const id = `${config.slugPrefix}${convertToSeoSlug(
              fileName.slice(0, -3)
            )}`;
            const tags = [...new Set(rawTags.toLowerCase().split(','))];
            const type = config.isBlog ? `blog.${rawType}` : 'snippet';
            const hasOptionalLanguage = Boolean(
              config.id !== '30css' &&
                !config.isBlog &&
                config.optionalLanguage &&
                config.optionalLanguage.short
            );

            const bodyText = body
              .slice(0, body.indexOf(mdCodeFence))
              .replace(/\r\n/g, '\n');
            const isLongBlog = config.isBlog && bodyText.indexOf('\n\n') > 180;
            const shortSliceIndex = isLongBlog
              ? bodyText.indexOf(' ', 160)
              : bodyText.indexOf('\n\n');
            const shortText =
              excerpt && excerpt.trim().length !== 0
                ? excerpt
                : `${bodyText.slice(0, shortSliceIndex)}${
                    isLongBlog ? '...' : ''
                  }`;
            const parsedDescription = stripMarkdownFormat(shortText);
            const seoDescription =
              config.isBlog || parsedDescription.length <= 160
                ? parsedDescription
                : literals.pageDescription('snippet', {
                    snippetName: title,
                    language: config.language.long,
                  });

            let code = {};
            let rawCode = {};
            if (!config.isBlog) {
              const codeBlocks = [...body.matchAll(codeMatcher)].map(v => ({
                raw: v[0].trim(),
                code: v.groups.code.trim(),
              }));

              if (config.id === '30css') {
                code.html = codeBlocks[0].code;
                rawCode.html = codeBlocks[0].raw;
                code.css = codeBlocks[1].code;
                rawCode.css = codeBlocks[1].raw;
                try {
                  code.scopedCss = sass
                    .renderSync({
                      data: `[data-scope="${fileName.slice(0, -3)}"] { ${
                        codeBlocks[1].code
                      } }`,
                    })
                    .css.toString();
                } catch (e) {
                  console.warn(
                    `Scoped CSS generation for snippet ${id} failed with error "${e.message}". Falling back to unsafe raw CSS injection!`,
                    'warning'
                  );
                  code.scopedCss = `${codeBlocks[1].code}`;
                }
                if (codeBlocks.length > 2) {
                  code.js = codeBlocks[2].code;
                  rawCode.js = codeBlocks[2].raw;
                }
              } else if (hasOptionalLanguage && codeBlocks.length > 2) {
                code.style = codeBlocks[0].code;
                rawCode.style = codeBlocks[0].raw;
                code.src = codeBlocks[1].code;
                rawCode.code = codeBlocks[1].raw;
                code.example = codeBlocks[2].code;
                rawCode.example = codeBlocks[2].raw;
              } else {
                if (codeBlocks.length === 0) console.log(id);
                if (hasOptionalLanguage) {
                  code.style = '';
                  rawCode.style = '';
                }
                code.src = codeBlocks[0].code;
                rawCode.code = codeBlocks[0].raw;
                code.example = codeBlocks[1].code;
                rawCode.example = codeBlocks[1].raw;
              }
            }

            const text = {
              full: config.isBlog ? body : bodyText,
              short: shortText,
            };

            const html = MarkdownParser.parseSegments(
              {
                texts: {
                  fullDescription: text.full,
                  description: text.short,
                },
                codeBlocks: rawCode,
              },
              {
                isBlog: config.isBlog,
                type,
                assetPath: `/${pathSettings.staticAssetPath}`,
                languageData,
              }
            );

            const authors = rawAuthors ? rawAuthors.split(',') : [];

            return {
              id,
              fileName,
              title,
              tags,
              firstSeen,
              lastUpdated,
              listed: unlisted === true ? false : true,
              type,
              text,
              html,
              code,
              rawCode,
              cover,
              authors,
              seoDescription,
              repository: config.id,
            };
          });
          snippets.push(...parsedData);
        });
      })
    );
    logger.success('Finished extracting snippets');
    return snippets;
  };

  static extractFeaturedListings = contentDir => {
    const logger = new Logger('Extractor.extractFeaturedListings');
    logger.log('Extracting featured listings');
    const featured = JSONHandler.fromFile(`${contentDir}/configs/featured.json`)
      .featuredCollections;
    logger.log('Finished extracting featured listings');
    return featured;
  };

  static writeData = data => {
    const logger = new Logger('Extractor.writeData');
    logger.log('Writing data to disk');
    return JSONHandler.toFile(
      `${pathSettings.contentPath}/content.json`,
      data
    ).then(() => logger.success('Finished writing data'));
  };
}
