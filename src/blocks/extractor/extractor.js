/* eslint-disable no-unused-vars */
import pathSettings from '#settings/paths';
import { Logger } from '#blocks/utilities/logger';
import { TextParser } from '#blocks/extractor/textParser';
import { MarkdownParser } from '#blocks/extractor/markdownParser/markdownParser';
import { JSONHandler } from '#blocks/utilities/jsonHandler';
import { YAMLHandler } from '#blocks/utilities/yamlHandler';
import { stripMarkdownFormat } from '#utils';

const mdCodeFence = '```';

const { rawContentPath: contentDir } = pathSettings;

export class Extractor {
  static data = {
    collections: [],
    snippets: [],
    languages: [],
    collectionsHub: {},
  };
  static languageData = new Map();
  static grammars = {};

  static prepared = false;
  static quiet = false;

  static prepare = async () => {
    Extractor.extractLanguageData();
    Extractor.extractGrammars();
    MarkdownParser.setupProcessors({
      languageData: Extractor.languageData,
      grammars: Extractor.grammars,
    });
    Extractor.extractCollectionConfigs();
    await Extractor.extractSnippets();
    Extractor.extractCollectionsHubConfig();
    Extractor.prepared = true;
  };

  static extract = async ({ force = false, quiet = false } = {}) => {
    Extractor.quiet = quiet;
    if (!Extractor.prepared || force) await Extractor.prepare();

    await Extractor.writeData();
    return Extractor.data;
  };

  static extractCollectionConfigs = () => {
    const logger = new Logger('Extractor.extractCollectionConfigs', {
      muted: Extractor.quiet,
    });
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
        allowUnlisted = false,
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
        allowUnlisted,
        ...rest,
        snippetIds,
      };
    });
    logger.success('Finished extracting collection configurations');
    Extractor.data.collections = configs;
  };

  static extractLanguageData = () => {
    const logger = new Logger('Extractor.extractLanguageData', {
      muted: Extractor.quiet,
    });
    logger.log('Extracting language data');
    const languageData = YAMLHandler.fromGlob(
      `${contentDir}/languages/*.yaml`
    ).reduce((acc, language) => {
      const {
        short,
        long,
        name,
        references = {},
        additionalReferences = [],
      } = language;
      acc.set(long, {
        id: long,
        long,
        short,
        name,
        references,
        allLanguageReferences: [long, ...additionalReferences],
      });
      return acc;
    }, new Map());
    logger.success('Finished extracting language data');
    Extractor.languageData = languageData;
    Extractor.data.languages = [...languageData].map(([id, data]) => {
      const { references, allLanguageReferences, ...restData } = data;
      return { ...restData };
    });
  };

  static extractSnippets = async () => {
    const logger = new Logger('Extractor.extractSnippets', {
      muted: Extractor.quiet,
    });
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
    const logger = new Logger('Extractor.extractSnippet', {
      muted: Extractor.quiet,
    });
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
    const logger = new Logger('Extractor.updateSnippetData', {
      muted: Extractor.quiet,
    });
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
    const logger = new Logger('Extractor.parseSnippet', {
      muted: Extractor.quiet,
    });

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

    const language = Extractor.languageData.get(languageKey) || undefined;
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

    const html = MarkdownParser.parseSegments(
      {
        fullDescription: fullText,
        description: shortText,
      },
      language ? language.short : null
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
      cover,
      seoDescription,
      language: languageKey,
    };
  };

  static extractCollectionsHubConfig = () => {
    const logger = new Logger('Extractor.extractCollectionsHubConfig', {
      muted: Extractor.quiet,
    });
    logger.log('Extracting hub pages configuration');
    const hubConfig = YAMLHandler.fromFile(`${contentDir}/hub.yaml`);
    logger.log('Finished extracting hub pages configuration');
    Extractor.data.collectionsHub = hubConfig;
  };

  static extractGrammars = () => {
    const logger = new Logger('Extractor.extractGrammars', {
      muted: Extractor.quiet,
    });
    logger.log('Extracting grammars');
    const grammars = YAMLHandler.fromFile(`${contentDir}/grammars.yaml`);
    logger.log('Finished extracting grammars');
    Extractor.grammars = grammars;
  };

  static writeData = () => {
    const logger = new Logger('Extractor.writeData', {
      muted: Extractor.quiet,
    });
    logger.log('Writing data to disk');
    return JSONHandler.toFile(
      `${pathSettings.contentPath}/content.json`,
      Extractor.data
    ).then(() => logger.success('Finished writing data'));
  };
}
