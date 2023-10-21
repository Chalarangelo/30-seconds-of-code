/* eslint-disable no-unused-vars */
import pathSettings from '#settings/paths';
import JSX_SNIPPET_PRESETS from '#settings/jsxSnippetPresets';
import { Logger } from '#blocks/utilities/logger';
import { TextParser } from '#blocks/extractor/textParser';
import { MarkdownParser } from '#blocks/extractor/markdownParser';
import { JSONHandler } from '#blocks/utilities/jsonHandler';
import { YAMLHandler } from '#blocks/utilities/yamlHandler';
import { stripMarkdownFormat } from '#utils';

const mdCodeFence = '```';
const codeMatcher = new RegExp(
  `${mdCodeFence}.*\r?\n(?<code>[\\S\\s]*?)${mdCodeFence}`,
  'g'
);

export class Extractor {
  static data = {
    collections: [],
    snippets: [],
    languages: [],
    collectionsHub: {},
  };
  static languageData = new Map();

  static prepared = false;

  static prepare = async () => {
    const { rawContentPath: contentDir } = pathSettings;
    Extractor.extractLanguageData(contentDir);
    Extractor.extractCollectionConfigs(contentDir);
    await Extractor.extractSnippets(contentDir, Extractor.languageData);
    Extractor.extractCollectionsHubConfig(contentDir);
    Extractor.prepared = true;
  };

  static extract = async () => {
    if (!Extractor.prepared) await Extractor.prepare();

    await Extractor.writeData();
    return Extractor.data;
  };

  static extractCollectionConfigs = contentDir => {
    const logger = new Logger('Extractor.extractCollectionConfigs');
    logger.log('Extracting collection configurations');
    const configs = YAMLHandler.fromGlob(
      `${contentDir}/collections/**/*.yaml`,
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
    Extractor.data.collections = configs;
  };

  static extractLanguageData = contentDir => {
    const logger = new Logger('Extractor.extractLanguageData');
    logger.log('Extracting language data');
    const languageData = YAMLHandler.fromGlob(
      `${contentDir}/languages/*.yaml`
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
    Extractor.languageData = languageData;
    Extractor.data.languages = [...languageData].map(([id, data]) => {
      const { references, ...restData } = data;
      return { ...restData };
    });
  };

  static extractSnippets = async (contentDir, languageData) => {
    const logger = new Logger('Extractor.extractSnippets');
    logger.log('Extracting snippets');

    const snippetsGlob = `${contentDir}/snippets/**/s/*.md`;

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
          dateModified,
          body,
          unlisted,
        } = snippet;

        // This check might be overkill, but better safe than sorry
        const isBlog = type !== 'snippet' && filePath.includes('/articles/');
        const isCSS = filePath.includes('/css/') && type === 'snippet';
        const isReact = filePath.includes('/react/') && type === 'snippet';

        const language = languageData.get(languageKey) || undefined;
        const languageKeys = isBlog
          ? []
          : isCSS
          ? ['js', 'html', 'css']
          : isReact
          ? ['js', 'jsx']
          : [language];

        const id = filePath.replace(`${contentDir}/snippets/`, '').slice(0, -3);
        const tags = rawTags.map(tag => tag.toLowerCase());

        const bodyText = body
          .slice(0, body.indexOf(mdCodeFence))
          .replace(/\r\n/g, '\n');
        const shortText =
          excerpt && excerpt.trim()
            ? excerpt
            : bodyText.slice(0, bodyText.indexOf('\n\n'));

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
          seoDescription,
          language: languageKey,
        };
      });

      snippets = parsedData;
    });
    logger.success('Finished extracting snippets');
    Extractor.data.snippets = snippets;
  };

  static extractCollectionsHubConfig = contentDir => {
    const logger = new Logger('Extractor.extractCollectionsHubConfig');
    logger.log('Extracting hub pages configuration');
    const hubConfig = YAMLHandler.fromFile(`${contentDir}/hub.yaml`);
    logger.log('Finished extracting hub pages configuration');
    Extractor.data.collectionsHub = hubConfig;
  };

  static writeData = () => {
    const logger = new Logger('Extractor.writeData');
    logger.log('Writing data to disk');
    return JSONHandler.toFile(
      `${pathSettings.contentPath}/content.json`,
      Extractor.data
    ).then(() => logger.success('Finished writing data'));
  };
}
