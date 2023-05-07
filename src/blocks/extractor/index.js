/* eslint-disable no-unused-vars */
import pathSettings from 'settings/paths';
import JSX_SNIPPET_PRESETS from 'settings/jsxSnippetPresets';
import { Logger } from 'blocks/utilities/logger';
import { Content } from 'blocks/utilities/content';
import { TextParser } from 'blocks/extractor/textParser';
import { MarkdownParser } from 'blocks/extractor/markdownParser';
import { JSONHandler } from 'blocks/utilities/jsonHandler';
import { YAMLHandler } from 'blocks/utilities/yamlHandler';
import { stripMarkdownFormat } from 'utils';

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
    const collectionConfigs = Extractor.extractCollectionConfigs(contentDir);
    const authors = Extractor.extractAuthors(contentDir);
    const snippets = await Extractor.extractSnippets(contentDir, languageData);
    const collectionsHubConfig =
      Extractor.extractCollectionsHubConfig(contentDir);
    // Language data not passed here by design, pass only if needed
    const data = {
      collections: collectionConfigs,
      snippets,
      authors,
      languages: [...languageData].map(([id, data]) => {
        const { references, ...restData } = data;
        return { ...restData };
      }),
      collectionsHub: collectionsHubConfig,
    };
    await Extractor.writeData(data);
    return data;
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
        slug: id,
        name,
        shortName = name,
        miniName = shortName,
        shortDescription,
        topLevel = false,
        ...rest
      } = config;
      const slug = `/${id}`;
      const seoDescription = stripMarkdownFormat(shortDescription);

      if (seoDescription.length > 140) {
        logger.warn(`Collection ${id} has a long SEO description.`);
      }

      return {
        id,
        name,
        slug,
        shortName,
        miniName,
        topLevel,
        shortDescription,
        seoDescription,
        ...rest,
        snippetIds,
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

  static extractSnippets = async (contentDir, languageData) => {
    const logger = new Logger('Extractor.extractSnippets');
    logger.log('Extracting snippets');

    const snippetsGlob = `${contentDir}/sources/30code/**/s/*.md`;

    MarkdownParser.loadLanguageData([...languageData.values()]);
    let snippets = [];

    await TextParser.fromGlob(snippetsGlob).then(snippetData => {
      const parsedData = snippetData.map(snippet => {
        const {
          filePath,
          fileName,
          title,
          shortTitle = title,
          tags: rawTags,
          type = 'snippet',
          language: languageKey,
          excerpt,
          cover,
          author,
          dateModified,
          body,
          unlisted,
        } = snippet;

        // This check might be overkill, but better safe than sorry
        const isBlog = type !== 'snippet' && filePath.includes('/articles/');
        const isCSS = filePath.includes('/css/');
        const isReact = filePath.includes('/react/');

        const language = languageData.get(languageKey) || undefined;
        const languageKeys = isBlog
          ? []
          : isCSS
          ? ['js', 'html', 'css']
          : isReact
          ? ['js', 'jsx']
          : [language];

        const id = filePath
          .replace(`${contentDir}/sources/30code/`, '')
          .slice(0, -3);
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
            : `${bodyText.slice(0, shortSliceIndex)}${isLongBlog ? '...' : ''}`;

        const fullText = body;
        const seoDescription = stripMarkdownFormat(shortText);

        if (seoDescription.length > 140) {
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
          language: languageKey,
        };
      });

      snippets = parsedData;
    });
    logger.success('Finished extracting snippets');
    return snippets;
  };

  static extractCollectionsHubConfig = contentDir => {
    const logger = new Logger('Extractor.extractCollectionsHubConfig');
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
