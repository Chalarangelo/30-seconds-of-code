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

const { rawContentPath: contentDir } = pathSettings;

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
    Extractor.extractLanguageData();
    Extractor.extractCollectionConfigs();
    await Extractor.extractSnippets();
    Extractor.extractCollectionsHubConfig();
    Extractor.prepared = true;
  };

  static extract = async () => {
    if (!Extractor.prepared) await Extractor.prepare();

    await Extractor.writeData();
    return Extractor.data;
  };

  static extractCollectionConfigs = () => {
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

  static extractLanguageData = () => {
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
    MarkdownParser.loadLanguageData([...Extractor.languageData.values()]);
  };

  static extractSnippets = async () => {
    const logger = new Logger('Extractor.extractSnippets');
    logger.log('Extracting snippets');

    const snippetsGlob = `${contentDir}/snippets/**/s/*.md`;
    let snippets = [];

    await TextParser.fromGlob(snippetsGlob).then(snippetData => {
      const parsedData = snippetData.map(snippet =>
        Extractor.parseSnippet(snippet)
      );

      snippets = parsedData;
    });
    logger.success('Finished extracting snippets');
    Extractor.data.snippets = snippets;
  };

  static extractSnippet = async snippetPath => {
    const logger = new Logger('Extractor.extractSnippet');
    logger.log(`Extracting snippet ${snippetPath}`);

    let snippet = {};

    await TextParser.fromPath(snippetPath).then(snippetData => {
      snippet = Extractor.parseSnippet(snippetData);
    });

    Extractor.updateSnippetData(snippet.id, snippet);
    logger.success(`Finished extracting snippet ${snippetPath}`);

    return [snippet.id, snippet];
  };

  static updateSnippetData = (id, snippetData) => {
    const logger = new Logger('Extractor.updateSnippetData');
    logger.log(`Updating data for snippet ${id}`);

    const index = Extractor.data.snippets.findIndex(
      snippet => snippet.id === id
    );

    if (index === -1) {
      Extractor.data.snippets.push(snippetData);
      logger.success(`Finished creating snippet ${id}`);
    } else {
      Extractor.data.snippets[index] = snippetData;
      logger.success(`Finished updating snippet ${id}`);
    }
  };

  static unlinkSnippetData = id => {
    const logger = new Logger('Extractor.unlinkSnippetData');
    logger.log(`Unlinking data for snippet ${id}`);

    const index = Extractor.data.snippets.findIndex(
      snippet => snippet.id === id
    );

    if (index === -1) {
      logger.warn(`Snippet ${id} not found in data`);
    } else {
      Extractor.data.snippets.splice(index, 1);
      logger.success(`Finished unlinking snippet ${id}`);
    }
  };

  static parseSnippet = snippet => {
    const logger = new Logger('Extractor.parseSnippet');

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

    const language = Extractor.languageData.get(languageKey) || undefined;
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
  };

  static extractCollectionsHubConfig = () => {
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
