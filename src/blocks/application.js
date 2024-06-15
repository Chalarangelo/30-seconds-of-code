import { Glob } from 'glob';
import chalk from 'chalk';
import repl from 'node:repl';
import util from 'node:util';
import jsiqle from '@jsiqle/core';
import { Logger } from '#blocks/utilities/logger';
import { JSONHandler } from '#blocks/utilities/jsonHandler';
import { YAMLHandler } from '#blocks/utilities/yamlHandler';
import { Extractor } from '#blocks/extractor/extractor';
import { Content } from '#blocks/utilities/content';
import { PreparedQueries } from '#blocks/utilities/preparedQueries';
import { FileWatcher } from '#blocks/utilities/fileWatcher';
import { TextOutputter } from '#blocks/utilities/textOutputter';
import schema from '#blocks/schema';
import settings from '#settings/settings';
import writers from '#blocks/writers/writers';
import { shuffle } from '#utils';

/**
 * The application class acts much like a monolith for all the shared logic and
 * functionality of the Node.js backend. It is responsible for creating the
 * schema, loading the data and instrumenting module loading and updates so that
 * other modules can access data from it whenever necessary.
 *
 * This is also the entry point for the console script, which is responsible for
 * setting up an interactive REPL for the user to interact with the application.
 *
 * Finally, this will also house the Express application we plan to develop
 * in some future iteration.
 */
export class Application {
  // -------------------------------------------------------------
  // Static module getters
  // -------------------------------------------------------------
  // These modules are not expected to change during the lifetime of the
  // application, not even while developing in a REPL environment.

  /**
   * Returns the Logger class.
   */
  static get Logger() {
    return Logger;
  }

  /**
   * Returns the JSONHandler class.
   */
  static get JSONHandler() {
    return JSONHandler;
  }

  /**
   * Returns the YAMLHandler class.
   */
  static get YAMLHandler() {
    return YAMLHandler;
  }

  /**
   * Returns the Content class.
   */
  static get Content() {
    return Content;
  }

  static _writers = Object.keys(writers).reduce((modules, module) => {
    const write = () => writers[module].write(Application);
    modules[module] = { write };
    return modules;
  }, {});

  /**
   * Returns the application's writers, with their `write()` method bound to the
   * application instance.
   */
  static get writers() {
    return Application._writers;
  }

  /**
   * Returns the settings object.
   */
  static get settings() {
    return settings;
  }

  /**
   * Returns the raw schema object.
   */
  static get schemaObject() {
    return schema;
  }

  /**
   * Returns an array of raw model objects.
   */
  static get modelsArray() {
    return schema.models;
  }

  /**
   * Returns the names of the models in the application.
   */
  static get modelNames() {
    return Application.modelsArray.map(model => model.name);
  }

  /**
   * Returns an array of raw serializer objects.
   */
  static get serializersArray() {
    return schema.serializers;
  }
  /**
   * Returns the names of the serializers in the application.
   */
  static get serializerNames() {
    return Application.serializersArray.map(serializer => serializer.name);
  }

  // -------------------------------------------------------------
  // Schema setup and dataset initialization methods
  // -------------------------------------------------------------
  static _schema = null;
  static _rawDataset = {};

  /**
   * Creates/recreates the schema object.
   */
  static setupSchema({ quiet = false } = {}) {
    const logger = new Logger('Application.setupSchema', { muted: quiet });
    const schemaObject = Application.schemaObject;
    if (!Application._schema) {
      logger.log('Setting up schema...');
      Application._schema = jsiqle.create(schemaObject);
      logger.success('Schema setup complete.');
    } else logger.log('Schema already exists!');
  }

  /**
   * Returns the jsiqle dataset object.
   */
  static get dataset() {
    if (!Application._schema) Application.setupSchema();
    return Application._schema;
  }

  /**
   * Returns an object with the jsiqle dataset's models mapped to their names.
   */
  static get models() {
    const dataset = Application.dataset;
    const modelNames = Application.modelNames;
    return modelNames.reduce((models, modelName) => {
      models[modelName] = dataset.getModel(modelName);
      return models;
    }, {});
  }

  /**
   * Returns an object with the jsiqle dataset's serializers mapped to
   * their names.
   */
  static get serializers() {
    const dataset = Application.dataset;
    const serializerNames = Application.serializerNames;
    return serializerNames.reduce((serializers, serializerName) => {
      serializers[serializerName] = dataset.getModel(serializerName);
      return serializers;
    }, {});
  }

  /**
   * Returns the jsiqle model from the dataset.
   * @param {string} modelName The name of the model to get.
   * @returns {Model} The jsiqle model.
   */
  static getModel(modelName) {
    return Application.dataset.getModel(modelName);
  }

  /**
   * Returns the jsiqle serializer from the dataset.
   * @param {string} serializerName The name of the serializer to get.
   * @returns {Serializer} The jsiqle serializer.
   */
  static getSerializer(serializerName) {
    return Application.dataset.getSerializer(serializerName);
  }

  /**
   * Fetches the raw dataset from the JSON storage.
   */
  static fetchDataset() {
    const datasetPath = `${Application.settings.paths.contentPath}/content.json`;
    const logger = new Logger('Application.fetchDataset');
    logger.log(`Fetching dataset from ${datasetPath}...`);
    Application._rawDataset = JSONHandler.fromFile(
      `${Application.settings.paths.contentPath}/content.json`
    );
    logger.success('Fetching dataset complete.');
  }

  /**
   * Returns the raw dataset object.
   */
  static get datasetObject() {
    if (!Object.keys(Application._rawDataset).length)
      Application.fetchDataset();
    return Application._rawDataset;
  }

  /**
   * Populates the dataset with the raw dataset object.
   */
  static populateDataset({ quiet = false } = {}) {
    const logger = new Logger('Application.populateDataset', { muted: quiet });
    logger.log('Populating dataset...');
    const {
      Snippet,
      Collection,
      Language,
      SnippetPage,
      CollectionPage,
      CollectionsPage,
      HomePage,
    } = Application.models;
    const { snippets, collections, languages, collectionsHub } =
      Application.datasetObject;
    const { featuredListings } = collectionsHub;
    const {
      cardsPerPage,
      collectionCardsPerPage,
      newSnippetCards,
      topSnippetCards,
      topCollectionChips,
    } = Application.settings.presentation;

    // Populate languages, snippets
    languages.forEach(language => Language.createRecord(language));
    snippets.forEach(snippet => Snippet.createRecord(snippet));

    // Populate collections
    collections.forEach(collection => {
      const { snippetIds, languageMatcher, tagMatcher, parent, ...rest } =
        collection;
      const collectionRec = Collection.createRecord({
        parent,
        featuredIndex: featuredListings.indexOf(collection.id),
        ...rest,
      });
      if (snippetIds && snippetIds.length) collectionRec.snippets = snippetIds;
      else if (collection.id === 'snippets') {
        // Use listedBy in main listing to exclude unlisted snippets
        collectionRec.snippets = Snippet.records.listedByPopularity.pluck('id');
      } else {
        const queryMatchers = [];
        // Use publishedBy in other listings to include unlisted snippets in order
        // to allow for proper breadcrumbs to form for them
        let queryScope = 'publishedByPopularity';
        if (languageMatcher)
          queryMatchers.push(
            snippet =>
              snippet.language && snippet.language.id === languageMatcher
          );
        if (tagMatcher)
          queryMatchers.push(snippet => snippet.tags.includes(tagMatcher));

        collectionRec.snippets = Snippet.records[queryScope]
          .where(snippet => queryMatchers.every(matcher => matcher(snippet)))
          .pluck('id');
      }
    });
    Snippet.records.forEach(snippet => {
      const { id } = snippet;
      SnippetPage.createRecord({
        id: `$${id}`,
        slug: snippet.slug,
        snippet: id,
      });
    });
    // Populate collection pages
    Collection.records.forEach(collection => {
      const { id: collectionId } = collection;
      let pageCounter = 1;
      const snippetIterator =
        collection.listedSnippets.batchIterator(cardsPerPage);
      for (let pageSnippets of snippetIterator) {
        const id = `${collectionId}/p/${pageCounter}`;
        CollectionPage.createRecord({
          id: `$${id}`,
          collection: collectionId,
          slug: `/${id}`,
          snippets: pageSnippets.pluck('id'),
          pageNumber: pageCounter,
        });
        pageCounter++;
      }
    });
    // Populate collections list pages
    {
      const collectionId = 'collections';
      let pageCounter = 1;
      const collections = Collection.records.featured;
      const totalPages = Math.ceil(collections.length / collectionCardsPerPage);
      const collectionIterator = collections.batchIterator(
        collectionCardsPerPage
      );
      for (let pageCollections of collectionIterator) {
        const id = `${collectionId}/p/${pageCounter}`;
        CollectionsPage.createRecord({
          id: `$${id}`,
          slug: `/${id}`,
          name: collectionsHub.name,
          description: collectionsHub.description,
          shortDescription: collectionsHub.shortDescription,
          splash: collectionsHub.splash,
          collections: pageCollections.pluck('id'),
          pageCount: totalPages,
          collectionCount: collections.length,
          pageNumber: pageCounter,
        });
        pageCounter++;
      }
    }
    // Populate home page
    {
      const id = 'index';
      const collections = Collection.records.featured
        .slice(0, topCollectionChips)
        .pluck('id');
      const newSnippets = Snippet.records.listedByNew
        .slice(0, newSnippetCards)
        .pluck('id');
      const topSnippets = shuffle(
        Snippet.records.listedByPopularity
          .slice(0, topSnippetCards * 5)
          .pluck('id')
      );
      HomePage.createRecord({
        id: `$${id}`,
        slug: `/${id}`,
        snippetCount: Snippet.records.published.length,
        collections,
        snippets: [...new Set([...newSnippets, ...topSnippets])].slice(
          0,
          newSnippetCards + topSnippetCards
        ),
      });
    }
    logger.success('Populating dataset complete.');
  }

  /**
   * Empties the current jsiqle dataset, removing all models from it.
   */
  static clearDataset({ quiet = false } = {}) {
    const logger = new Logger('Application.clearDataset', { muted: quiet });
    logger.log('Clearing dataset...');
    const dataset = Application.dataset;
    if (dataset && dataset.name) {
      Application.modelNames.forEach(modelName => {
        const model = Application.getModel(modelName);
        model.records.forEach(record => model.removeRecord(record.id));
      });
    } else logger.warn('Dataset not found!');
    logger.success('Clearing dataset complete.');
  }

  /**
   * Resets the current jsiqle dataset, removing all models from it and
   * repopulating it with new data.
   * @param {Object} data The data to populate the dataset with.
   */
  static resetDataset(data, { quiet = false } = {}) {
    const logger = new Logger('Application.resetDataset', { muted: quiet });
    logger.log('Resetting dataset...');
    Application.clearDataset({ quiet });
    Application.initialize(data, { quiet });
    logger.success('Resetting dataset complete.');
  }

  // -------------------------------------------------------------
  // Environment setup
  // -------------------------------------------------------------

  /**
   * Initializes the application environment.
   * @param {Object} data The data to populate the dataset with.
   */
  static initialize(data, { quiet = false } = {}) {
    const logger = new Logger('Application.initialize', { muted: quiet });
    logger.log(`Starting application in "${process.env.NODE_ENV}" mode.`);
    Application.setupSchema({ quiet });
    if (data) {
      logger.log('Using provided dataset.');
      Application._rawDataset = data;
    } else Application.fetchDataset({ quiet });
    Application.populateDataset({ quiet });
    logger.success('Application initialization complete.');
  }

  /**
   * Extracts the dataset and initializes the application.
   * @returns {Promise} A promise that resolves as soon as the extraction is
   * complete and the application has been initialized.
   */
  static extractAndInitialize({ quiet = false, force = false } = {}) {
    // By design, we do not have a logger here. The extractor and the initalize
    // methods should suffice for the time being.
    return Extractor.extract({ quiet, force }).then(parsed =>
      Application.initialize(parsed)
    );
  }

  /**
   * Alias method for calling Extractor's extract method.
   * @returns {Promise} A promise that resolves as soon as the extraction is
   * complete.
   */
  static extract({ quiet = false, force = false } = {}) {
    // NOTE: The Extractor is strictly only accessible via the Application
    // module, so this is the only way to access its extraction method.
    return Extractor.extract({ quiet, force });
  }

  /**
   * Watches the content files for changes and updates the dataset accordingly.
   * Pages are regenerated as well, via the use of the PageWriter.
   * Currently only supports snippets.
   */
  static watch() {
    const logger = new Logger('Application.watch');
    logger.log('Watching content files...');

    const contentDirectoryPath = `${Application.settings.paths.rawContentPath}`;

    FileWatcher.watch(contentDirectoryPath, /.*\.(md|yaml)$/, () => {
      try {
        Extractor.extract({ quiet: true, force: true }).then(parsed => {
          Application.resetDataset(parsed, { quiet: true });
          writers.PageWriter.write(Application, { quiet: true });
          logger.success('Content files updated.');
        });
      } catch (err) {
        logger.error(err);
      }
    });
  }

  // -------------------------------------------------------------
  // REPL setup and methods
  // -------------------------------------------------------------
  static _replServer = null;
  static _replHistoryPath = 'console.log';

  /**
   * Writer function for the repl.
   * Reference: https://nodejs.org/api/repl.html#replstartoptions
   */
  static _replWriter(object) {
    const utilResult = util.inspect(object, { colors: true });
    return utilResult
      .replace(/^Record\s+\[(.*?)#(.*?)]\s\{.*?}$/gm, (m, p1, p2) => {
        // Single record query replacer
        return `${chalk.reset('{')} ${chalk.green(`${p1}#${p2}`)} ${chalk.reset(
          '}'
        )}`;
      })
      .replace(
        /'.*?'.*?=>\s+Record\s+\[(.*?)#(.*?)]\s\{.*?}(,?)/gm,
        (m, p1, p2, p3) => {
          // Multiple record query replacer
          return `${chalk.reset('{')} ${chalk.green(
            `${p1}#${p2}`
          )} ${chalk.reset(`}${p3}`)}`;
        }
      )
      .replace(/RecordSet\((\d+)\)\s+\[(.*?)]/gm, (m, p1, p2) => {
        // RecordSet prettifier
        return 'RecordSet(' + chalk.blue(p2) + ')[' + chalk.yellow(p1) + ']';
      });
  }

  /**
   * Sets up the context for the REPL server.
   */
  static setupReplContext() {
    const logger = new Logger('Application.setupReplContext');
    logger.log('Setting up REPL context...');
    const context = Application._replServer.context;
    context.Application = Application;
    context.settings = Application.settings;
    context.glob = Glob;
    context.chalk = chalk;
    // NOTE: We are not exactly clearing existing context, so there
    // might be leftovers from a previous context. This is fine, as
    // long as the users knows what they're doing. In theory, calling
    // `.clear` in the REPL should clear the context anyways.
    Application.modelNames.forEach(model => {
      context[model] = Application.dataset.getModel(model);
    });
    Application.serializerNames.forEach(serializer => {
      context[serializer] = Application.dataset.getSerializer(serializer);
    });
    const $ = {};
    Object.getOwnPropertyNames(PreparedQueries).forEach(queryName => {
      if (!['name', 'length', 'prototype'].includes(queryName))
        $[queryName] = PreparedQueries[queryName](Application, $);
    });
    context['$'] = $;
    context.toLogFile = TextOutputter.makeLog;
    context.rawDataset = Application.datasetObject;
    logger.success('Setting up REPL context complete.');
  }

  /**
   * Sets up the commands for the REPL server.
   */
  static setupReplCommands() {
    const logger = new Logger('Application.setupReplCommands');
    logger.log('Setting up REPL commands...');

    const replServer = Application._replServer;

    replServer.defineCommand('resetDataset', {
      help: 'Resets the dataset and updates the context.',
      action: () => {
        Logger.debug('Resetting dataset and REPL context...');
        Application.resetDataset();
        Application.setupReplContext();
        replServer.displayPrompt();
      },
    });

    replServer.defineCommand('recreateDataset', {
      help: 'Extracts data and recreates the schema.',
      action: () => {
        Extractor.extract().then(parsed => {
          Application.resetDataset(parsed);
          Application.setupReplContext();
          replServer.displayPrompt();
        });
      },
    });

    replServer.defineCommand('createContent', {
      help: [
        'Creates a new snippet or collection with the given arguments.',
        'Usage: createContent <directoryName> <type> <name>',
        'Example: createContent css snippet my-new-snippet',
      ].join('\n                   '),
      action(input) {
        const [directoryName, type, snippetName] = input.trim().split(' ');
        Content.create(directoryName, type, snippetName);
        replServer.displayPrompt();
      },
    });

    logger.success('Setting up REPL commands complete.');
  }

  /**
   * Sets up the REPL server. Needs the server to be started first.
   */
  static setupRepl() {
    const logger = new Logger('Application.setupRepl');
    logger.log('Setting up REPL...');
    Application.setupReplContext();
    Application.setupReplCommands();
    logger.success('Setting up REPL complete.');
  }

  /**
   * Starts and sets up the REPL server.
   */
  static startRepl() {
    const logger = new Logger('Application.startRepl');
    logger.log('Starting REPL...');

    Application._replServer = repl.start({
      prompt: '30s > ',
      writer: Application._replWriter,
    });
    Application._replServer.setupHistory(
      Application._replHistoryPath,
      () => {}
    );
    console.log('\n'); // By design, to remove the prompt from the line start.
    Logger.logProcessInfo();

    // If `npm run -- --extract` is called, extract the data first
    const forceExtractFlag =
      process.argv.indexOf('--extract') !== -1 ||
      process.argv.indexOf('-e') !== -1;
    if (forceExtractFlag) logger.log('Force extraction flag detected.');

    const initializer = forceExtractFlag
      ? () =>
          Extractor.extract().then(parsed => {
            Application.initialize(parsed);
            Application.setupRepl();
          })
      : () =>
          new Promise(resolve => {
            Application.initialize();
            Application.setupRepl();
            resolve();
          });

    initializer().then(() => {
      logger.success('Starting REPL complete.');
      Application._replServer.displayPrompt();
    });
  }
}

// Hacky way to expose writers without the `.writers` part on
// Application. We can revisit this eventually.
Object.entries(Application.writers).forEach(([writerName, writerModule]) => {
  Object.defineProperty(Application, writerName, {
    configurable: true, // Allows for redefinition, if need be
    get: () => writerModule,
  });
});
