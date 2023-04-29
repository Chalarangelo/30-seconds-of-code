/* eslint-disable no-unused-vars */
import pathSettings from 'settings/paths';
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
    const tagData = Extractor.processTagData(contentConfigs, snippets);
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
      tags: tagData,
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
      `${contentDir}/configs/collections/*.yaml`,
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
        const slugPrefix = `/${configSlugPrefix}/t/${tag}`;
        return {
          id: `${config.id}_${tag}`,
          slugPrefix,
          name,
          shortName,
          description,
          shortDescription,
          splash,
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
        const snippetsPath = `${contentDir}/sources/${config.dirName}/snippets`;

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
            // TODO: Temporary fix to get rid of a previous workaround
            const hasOptionalLanguage = config.id === '30react';

            const languageKeys =
              config.id === '30blog'
                ? []
                : config.id === '30css'
                ? ['js', 'html', 'css']
                : config.id === '30react'
                ? ['js', 'jsx']
                : [config.language.short];

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
            const fullText = config.isBlog ? body : bodyText;
            const seoDescription = stripMarkdownFormat(shortText);

            let code = {
              html: null,
              css: null,
              js: null,
              style: null,
              src: null,
              example: null,
            };
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
                if (codeBlocks.length > 2) {
                  code.js = codeBlocks[2].code;
                  rawCode.js = codeBlocks[2].raw;
                }
              } else if (hasOptionalLanguage && codeBlocks.length > 2) {
                code.style = codeBlocks[0].code;
                rawCode.style = codeBlocks[0].raw;
                code.src = codeBlocks[1].code;
                rawCode.src = codeBlocks[1].raw;
                code.example = codeBlocks[2].code;
                rawCode.example = codeBlocks[2].raw;
              } else {
                if (codeBlocks.length === 0) console.log(id);
                if (hasOptionalLanguage) {
                  code.style = '';
                  rawCode.style = '';
                }
                code.src = codeBlocks[0].code;
                rawCode.src = codeBlocks[0].raw;
                code.example = codeBlocks[1].code;
                rawCode.example = codeBlocks[1].raw;
              }
            }

            const html = MarkdownParser.parseSegments(
              {
                texts: {
                  fullDescription: fullText,
                  description: shortText,
                },
                codeBlocks: rawCode,
              },
              {
                isBlog: config.isBlog,
                assetPath: `/${pathSettings.staticAssetPath}`,
                languageData,
                languageKeys,
              }
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
              htmlCode: code.html,
              cssCode: code.css,
              jsCode: code.js,
              styleCode: code.style,
              srcCode: code.src,
              exampleCode: code.example,
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
