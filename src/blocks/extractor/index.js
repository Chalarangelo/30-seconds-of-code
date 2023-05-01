/* eslint-disable no-unused-vars */
import pathSettings from 'settings/paths';
import JSX_SNIPPET_PRESETS from 'settings/jsxSnippetPresets';
import { Logger } from 'blocks/utilities/logger';
import { Content } from 'blocks/utilities/content';
import { TextParser } from 'blocks/extractor/textParser';
import { MarkdownParser } from 'blocks/extractor/markdownParser';
import { JSONHandler } from 'blocks/utilities/jsonHandler';
import { YAMLHandler } from 'blocks/utilities/yamlHandler';
import {
  convertToSeoSlug,
  uniqueElements,
  stripMarkdownFormat,
  capitalize,
} from 'utils';
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
    const languageData = Extractor.extractLanguageData(contentDir);
    const contentConfigs = Extractor.extractContentConfigs(
      contentDir,
      languageData
    );
    const collectionConfigs = Extractor.extractCollectionConfigs(contentDir);
    const authors = Extractor.extractAuthors(contentDir);
    const snippets = await Extractor.extractSnippets(
      contentDir,
      contentConfigs,
      [...languageData.values()]
    );
    const { mainListing, collectionListing } =
      Extractor.extractHubConfig(contentDir);
    // Language data not passed here by design, pass only if needed
    const data = {
      repositories: contentConfigs.map(config => {
        // Exclude specific keys
        const {
          dirName,
          tagIcons,
          slugPrefix,
          language: rawLanguage,
          tagMetadata,
          references,
          ...rest
        } = config;
        const language =
          rawLanguage && rawLanguage.long
            ? rawLanguage.long.toLowerCase()
            : null;
        return {
          ...rest,
          language,
        };
      }),
      collections: collectionConfigs,
      snippets,
      authors,
      languages: [...languageData].map(([id, data]) => {
        const { references, ...restData } = data;
        return { ...restData };
      }),
      collectionListingConfig: Object.entries(collectionListing).reduce(
        (acc, [key, value]) => ({ ...acc, [`data${capitalize(key)}`]: value }),
        {}
      ),
      mainListingConfig: Object.entries(mainListing).reduce(
        (acc, [key, value]) => ({ ...acc, [`data${capitalize(key)}`]: value }),
        {}
      ),
    };
    await Extractor.writeData(data);
    return data;
  };

  static extractContentConfigs = (contentDir, languageData) => {
    const logger = new Logger('Extractor.extractContentConfigs');
    logger.log('Extracting content configurations');
    const configs = YAMLHandler.fromGlob(
      `${contentDir}/configs/repos/*.yaml`
    ).map(config => {
      const language = languageData.get(config.language) || {};

      return {
        ...config,
        language,
        id: `${config.dirName}`,
        slugPrefix: `${config.slug}/s`,
      };
    });
    logger.success('Finished extracting content configurations');
    return configs;
  };

  static extractCollectionConfigs = contentDir => {
    const logger = new Logger('Extractor.extractCollectionConfigs');
    logger.log('Extracting collection configurations');
    const configs = YAMLHandler.fromGlob(
      `${contentDir}/configs/collections/**/*.yaml`,
      { withNames: true }
    ).map(([path, config]) => {
      const {
        snippetIds = [],
        name,
        shortName = name,
        topLevel = false,
        ...rest
      } = config;
      const id = path
        .replace(`${contentDir}/configs/collections/`, '')
        .split('.')[0];
      return {
        name,
        shortName,
        topLevel,
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
      YAMLHandler.fromFile(`${contentDir}/configs/authors.yaml`)
    ).map(([id, author]) => {
      return {
        ...author,
        id,
      };
    });
    logger.success('Finished extracting authors');
    return authors;
  };

  static extractLanguageData = contentDir => {
    const logger = new Logger('Extractor.extractLanguageData');
    logger.log('Extracting language data');
    const languageData = YAMLHandler.fromGlob(
      `${contentDir}/configs/languages/*.yaml`
    ).reduce((acc, language) => {
      const { short, long, name, references = {} } = language;
      acc.set(long, {
        id: long,
        long,
        short,
        name,
        references: new Map(Object.entries(references)),
      });
      return acc;
    }, new Map());
    logger.success('Finished extracting language data');
    return languageData;
  };

  static extractSnippets = async (contentDir, contentConfigs, languageData) => {
    const logger = new Logger('Extractor.extractSnippets');
    logger.log('Extracting snippets');

    MarkdownParser.loadLanguageData(languageData);
    let snippets = [];

    await Promise.all(
      contentConfigs.map(config => {
        const isBlog = config.isBlog;
        const isCSS = config.id === '30css';
        const isReact = config.id === '30react';
        const snippetsPath = `${contentDir}/sources/${config.dirName}/snippets`;
        const languageKeys = isBlog
          ? []
          : isCSS
          ? ['js', 'html', 'css']
          : isReact
          ? ['js', 'jsx']
          : [config.language.short];

        return TextParser.fromDir(snippetsPath).then(snippetData => {
          const parsedData = snippetData.map(snippet => {
            const {
              fileName,
              title,
              shortTitle = title,
              tags: rawTags,
              type = 'snippet',
              excerpt,
              cover,
              author,
              dateModified,
              body,
              unlisted,
            } = snippet;

            const id = `${config.slugPrefix}${convertToSeoSlug(
              fileName.slice(0, -3)
            )}`;
            const tags = rawTags.map(tag => tag.toLowerCase());

            const bodyText = body
              .slice(0, body.indexOf(mdCodeFence))
              .replace(/\r\n/g, '\n');
            const isLongBlog = isBlog && bodyText.indexOf('\n\n') > 180;
            const shortSliceIndex = isLongBlog
              ? bodyText.indexOf(' ', 160)
              : bodyText.indexOf('\n\n');
            const shortText =
              excerpt && excerpt.trim().length !== 0
                ? excerpt
                : `${bodyText.slice(0, shortSliceIndex)}${
                    isLongBlog ? '...' : ''
                  }`;

            const fullText = body;
            const seoDescription = stripMarkdownFormat(shortText);

            if (seoDescription.length > 140 && unlisted !== true) {
              logger.warn(`Snippet ${id} has a long SEO description.`);
            }

            let code = null;

            if (isCSS || isReact) {
              const codeBlocks = [...body.matchAll(codeMatcher)].map(v =>
                v.groups.code.trim()
              );

              if (isCSS) {
                code = {
                  html: codeBlocks[0],
                  css: codeBlocks[1],
                  js: codeBlocks[2] || '',
                };
              }

              if (isReact) {
                code =
                  codeBlocks.length > 2
                    ? {
                        js: `${codeBlocks[1]}\n\n${codeBlocks[2]}`,
                        css: codeBlocks[0],
                      }
                    : {
                        js: `${codeBlocks[0]}\n\n${codeBlocks[1]}`,
                        css: '',
                      };
                /* eslint-disable camelcase */
                code = {
                  ...code,
                  html: JSX_SNIPPET_PRESETS.envHtml,
                  js_pre_processor: JSX_SNIPPET_PRESETS.jsPreProcessor,
                  js_external: JSX_SNIPPET_PRESETS.jsImports.join(';'),
                };
                /* eslint-enable camelcase */
              }
            }

            const html = MarkdownParser.parseSegments(
              {
                fullDescription: fullText,
                description: shortText,
              },
              languageKeys
            );

            return {
              id,
              fileName,
              title,
              shortTitle,
              tags,
              dateModified,
              listed: unlisted === true ? false : true,
              type,
              shortText,
              fullText,
              ...html,
              code,
              cover,
              author,
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

  static extractHubConfig = contentDir => {
    const logger = new Logger('Extractor.extractHubConfig');
    logger.log('Extracting hub pages configuration');
    const hubConfig = YAMLHandler.fromFile(`${contentDir}/configs/hub.yaml`);
    logger.log('Finished extracting hub pages configuration');
    return hubConfig;
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
