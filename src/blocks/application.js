import path from 'path';
import glob from 'glob';
import chalk from 'chalk';
import repl from 'repl';
import util from 'util';
import jsiqle from '@jsiqle/core';
import { Logger } from 'blocks/utilities/logger';
import { JSONHandler } from 'blocks/utilities/jsonHandler';
import { YAMLHandler } from 'blocks/utilities/yamlHandler';
import { Extractor } from 'blocks/extractor';
import { Content } from 'blocks/utilities/content';

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

  // Writers are also not expected to change during the lifetime of the
  // application. However, they are easier to load in bulk dynamically.
  static _writers = {};

  /**
   * Dynamically loads/reloads writers from the src/blocks/writers directory.
   */
  static loadWriters() {
    // Muted logger by design to avoid spamming the console.
    const logger = new Logger('Application.loadWriters', { muted: true });
    logger.log('Loading writers from src/blocks/writers/*.js...');
    const maxTries = 5;
    Application._writers = glob
      .sync(`src/blocks/writers/*.js`)
      .map(file => {
        // FIXME: There's an issue when loading the 'webfonts-generator'
        // dependency that seems to stem from the 'ttf2woff2' dependency.
        // Currently, we retry loading the writers that depend on it up to
        // 5 times before giving up. This is not exactly ideal, but it seems
        // to work for now. We should find a better solution, such as
        // incorporating the 'webfonts-generator' dependency into the writer
        // and giving it a facelift to work with a newer version of 'ttf2woff2'.
        let module;
        let tries = 0;
        while (tries <= maxTries && !module) {
          try {
            module = require(path.resolve(file));
          } catch (e) {
            tries++;
            if (tries < maxTries)
              logger.warn(
                `Error loading writer ${file}: ${e.message}. Retrying...`
              );
            if (tries === maxTries) {
              logger.error(
                `Error loading writer ${file}: ${e.message}. Max tries reached, terminating...`
              );
              process.exit(1);
            }
          }
        }
        return module;
      })
      .reduce((modules, module) => {
        const [moduleName, moduleValue] = Object.entries(module)[0];
        // Note this only supports one export and will cause trouble otherwise
        // Supporting default exports could be an interesting option, too.
        modules[moduleName] = moduleValue;
        return modules;
      }, {});
    logger.success(
      `Found and loaded ${
        Object.keys(Application._writers).length
      } writers in src/blocks/writers/*.js.`
    );
  }

  /**
   * Returns the names of the writers in the application.
   */
  static get writers() {
    if (!Object.keys(Application._writers).length) Application.loadWriters();
    return Application._writers;
  }

  // -------------------------------------------------------------
  // Settings and literals dynamic loading methods and getters
  // -------------------------------------------------------------
  static _settings = {};
  static _literals = {};

  /**
   * Dynamically loads/reloads settings from the src/settings directory.
   */
  static loadSettings() {
    const logger = new Logger('Application.loadSettings');
    logger.log('Loading settings from src/settings/*.json...');
    Application._settings = glob
      .sync(`src/settings/*.json`)
      .map(file => {
        const name = file.split('/').slice(-1)[0].split('.')[0];
        return { name, settings: require(path.resolve(file)) };
      })
      .reduce((modules, { name, settings }) => {
        if (name.includes('global')) modules = { ...modules, ...settings };
        modules[name] = settings;
        return modules;
      }, {});
    logger.success('Settings loading complete.');
  }

  /**
   * Returns the settings object.
   */
  static get settings() {
    if (!Object.keys(Application._settings).length) Application.loadSettings();
    return Application._settings;
  }

  /**
   * Dynamically loads/reloads literals from the src/lang/en/index.js file.
   */
  static loadLiterals() {
    const logger = new Logger('Application.loadLiterals');
    logger.log('Loading literals from src/lang/en/index.js...');
    Application._literals = {
      ...require(path.resolve('src/lang/en/index.js')).default,
    };
    // TODO: Dynamically import and merge under client key all client literals
    logger.success('Settings loading complete.');
  }

  /**
   * Returns the literals object.
   */
  static get literals() {
    if (!Object.keys(Application._literals).length) Application.loadLiterals();
    return Application._literals;
  }

  // -------------------------------------------------------------
  // Schema, model, serializer dynamic loading methods and getters
  // -------------------------------------------------------------
  static _rawModels = [];
  static _rawSerializers = [];
  static _rawSchema = [];

  /**
   * Dynamically loads/reloads the schema from the src/blocks/schema.js file.
   */
  static loadSchema() {
    const logger = new Logger('Application.loadSchema');
    logger.log('Loading schema from src/blocks/schema.js...');
    Application._rawSchema = {
      ...Object.values(require(path.resolve('src/blocks/schema.js')))[0],
      models: Application.modelsArray,
      serializers: Application.serializersArray,
    };
    logger.success('Schema loading complete.');
  }

  /**
   * Returns the raw schema object.
   */
  static get schemaObject() {
    if (!Object.keys(Application._rawSchema).length) Application.loadSchema();
    return Application._rawSchema;
  }

  /**
   * Dynamically loads/reloads models from the src/blocks/models directory.
   */
  static loadModels() {
    const logger = new Logger('Application.loadModels');
    logger.log('Loading models from src/blocks/models/*.js...');
    Application._rawModels = glob
      .sync(`src/blocks/models/*.js`)
      .map(file => require(path.resolve(file)))
      .reduce((modules, module) => {
        // Note this only supports one export and will cause trouble otherwise
        // Supporting default exports could be an interesting option, too.
        modules.push(Object.values(module)[0]);
        return modules;
      }, []);
    logger.success(
      `Found and loaded ${Application._rawModels.length} models in src/blocks/models/*.js.`
    );
  }

  /**
   * Returns an array of raw model objects.
   */
  static get modelsArray() {
    if (Application._rawModels.length === 0) Application.loadModels();
    return Application._rawModels;
  }

  /**
   * Returns an object of model objects keyed by model name.
   */
  static get modelsObject() {
    return Application.modelsArray.reduce((m, model) => {
      m[model.name] = model;
      return m;
    }, {});
  }

  /**
   * Returns the names of the models in the application.
   */
  static get modelNames() {
    return Application.modelsArray.map(model => model.name);
  }

  /**
   * Dynamically loads/reloads serializers from the src/blocks/serializers
   * directory.
   */
  static loadSerializers() {
    const logger = new Logger('Application.loadSerializers');
    logger.log('Loading serializers from src/blocks/serializers/*.js...');
    Application._rawSerializers = glob
      .sync(`src/blocks/serializers/*.js`)
      .map(file => require(path.resolve(file)))
      .reduce((modules, module) => {
        // Note this only supports one export and will cause trouble otherwise
        // Supporting default exports could be an interesting option, too.
        modules.push(Object.values(module)[0]);
        return modules;
      }, []);
    logger.success(
      `Found and loaded ${Application._rawSerializers.length} serializers in src/blocks/serializers/*.js.`
    );
  }

  /**
   * Returns an array of raw serializer objects.
   */
  static get serializersArray() {
    if (Application._rawSerializers.length === 0) Application.loadSerializers();
    return Application._rawSerializers;
  }

  /**
   * Returns an object of serializer objects keyed by serializer name.
   */
  static get serializersObject() {
    return Application.serializersArray.reduce((m, serializer) => {
      m[serializer.name] = serializer;
      return m;
    }, {});
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
  static setupSchema() {
    const logger = new Logger('Application.setupSchema');
    const schemaObject = Application.schemaObject;
    logger.log('Setting up schema...');
    Application._schema = jsiqle.create(schemaObject);
    logger.success('Schema setup complete.');
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
  static populateDataset() {
    const logger = new Logger('Application.populateDataset');
    logger.log('Populating dataset...');
    const {
      Snippet,
      Repository,
      Collection,
      Listing,
      Language,
      Tag,
      Author,
      Page,
    } = Application.models;
    const {
      snippets,
      repositories,
      collections,
      tags,
      languages,
      authors,
      mainListingConfig,
      collectionListingConfig,
    } = Application.datasetObject;
    const { dataFeaturedListings: featuredListings } = collectionListingConfig;

    // Populate repos, languages, tags, authors, snippets
    repositories.forEach(repo => Repository.createRecord(repo));
    languages.forEach(language => Language.createRecord(language));
    tags.forEach(tag => Tag.createRecord(tag));
    authors.forEach(author => Author.createRecord(author));
    snippets.forEach(snippet => {
      const { dateModified, ...rest } = snippet;
      Snippet.createRecord({
        ...rest,
        dateModified: new Date(dateModified),
      });
    });
    // Populate listings and create relationships
    Repository.records.forEach(repo => {
      const type = repo.isBlog ? 'blog' : 'language';
      const slugPrefix = `/${repo.slug}`;
      const repoListingId = `${type}${slugPrefix}`;
      Listing.createRecord({
        id: repoListingId,
        relatedRecordId: repo.id,
        type,
        slugPrefix,
        featuredIndex: featuredListings.indexOf(repoListingId),
      });
      // Populate tag listings from repositories
      repo.tags.forEach(tag => {
        const tagSlugPrefix = tag.slugPrefix;
        const tagId = `tag${tagSlugPrefix}`;
        Listing.createRecord({
          id: tagId,
          relatedRecordId: `${tag.id}`,
          type: 'tag',
          slugPrefix: tagSlugPrefix,
          featuredIndex: featuredListings.indexOf(tagId),
          parent: repoListingId,
        });
      });
    });
    // Populate collections, collection listings and link to snippets and parent listings
    collections.forEach(collection => {
      const { snippetIds, typeMatcher, parent, ...rest } = collection;
      const collectionRec = Collection.createRecord(rest);
      if (snippetIds && snippetIds.length) collectionRec.snippets = snippetIds;
      if (typeMatcher)
        collectionRec.snippets = Snippet.records.listedByPopularity
          .where(snippet => snippet.type === typeMatcher)
          .flatPluck('id');
      const slugPrefix = `/${collection.slug}`;
      const listingId = `collection${slugPrefix}`;
      Listing.createRecord({
        id: listingId,
        relatedRecordId: collection.id,
        type: 'collection',
        slugPrefix,
        featuredIndex: featuredListings.indexOf(listingId),
        parent,
      });
    });
    // Populate the main listing
    Listing.createRecord({
      id: 'main',
      type: 'main',
      slugPrefix: '/list',
      featuredIndex: -1,
      ...mainListingConfig,
    });
    // Populate the collection listing
    Listing.createRecord({
      id: 'collections',
      type: 'collections',
      slugPrefix: '/collections',
      featuredIndex: -1,
      ...collectionListingConfig,
    });
    // Populate snipet pages
    Snippet.records.forEach(snippet => {
      const { id } = snippet;
      Page.createRecord({
        id: `snippet_${id}`,
        template: 'SnippetPage',
        relatedRecordId: id,
      });
    });
    // Populate listing pages
    Listing.records.forEach(listing => {
      const { id } = listing;
      const itemsName = listing.isCollections ? 'listings' : 'snippets';
      // TODO: Move this to settings and update listing!
      const CARDS_PER_PAGE = 15;
      let pageCounter = 1;
      const snippetIterator =
        listing.listedSnippets.batchIterator(CARDS_PER_PAGE);
      for (let pageSnippets of snippetIterator) {
        Page.createRecord({
          id: `listing_${id}_${pageCounter}`,
          template: 'ListingPage',
          relatedRecordId: id,
          [itemsName]: pageSnippets.flatPluck('id'),
          pageNumber: pageCounter,
        });
        pageCounter++;
      }
    });
    // Populate static pages
    Page.createRecord({
      id: 'static_404',
      template: 'NotFoundPage',
      slug: '/404',
      staticPriority: 0,
    });
    Page.createRecord({
      id: 'static_about',
      template: 'StaticPage',
      slug: '/about',
      staticPriority: 0.25,
    });
    Page.createRecord({
      id: 'static_cookies',
      template: 'StaticPage',
      slug: '/cookies',
      staticPriority: 0.25,
    });
    Page.createRecord({
      id: 'static_faq',
      template: 'StaticPage',
      slug: '/faq',
      staticPriority: 0.25,
    });
    Page.createRecord({
      id: 'static_search',
      template: 'SearchPage',
      slug: '/search',
      staticPriority: 0.25,
    });
    // Populate the home page
    Page.createRecord({ id: 'home', template: 'HomePage' });
    logger.success('Populating dataset complete.');
  }

  /**
   * Empties the current jsiqle dataset, removing all models from it.
   */
  static clearDataset() {
    const logger = new Logger('Application.clearDataset');
    logger.log('Clearing dataset...');
    const dataset = Application.dataset;
    // TODO: After jsiqle is ready, remove serialziers, too!
    if (dataset && dataset.name) {
      Application.modelNames.forEach(model => {
        dataset.removeModel(model);
      });
    } else logger.warn('Dataset not found!');
    logger.success('Clearing dataset complete.');
  }

  /**
   * Resets the current jsiqle dataset, removing all models from it and
   * repopulating it with new data.
   * @param {Object} data The data to populate the dataset with.
   */
  static resetDataset(data) {
    const logger = new Logger('Application.resetDataset');
    logger.log('Resetting dataset...');
    Application.clearDataset();
    Application.initialize(data);
    logger.success('Resetting dataset complete.');
  }

  // -------------------------------------------------------------
  // Environment setup
  // -------------------------------------------------------------

  /**
   * Initializes the application environment.
   * @param {Object} data The data to populate the dataset with.
   */
  static initialize(data) {
    const logger = new Logger('Application.initialize');
    logger.log(`Starting application in "${process.env.NODE_ENV}" mode.`);
    Application.loadSettings();
    Application.loadLiterals();
    Application.setupSchema();
    if (data) {
      logger.log('Using provided dataset.');
      Application._rawDataset = data;
    } else Application.fetchDataset();
    Application.populateDataset();
    logger.success('Application initialization complete.');
  }

  /**
   * Extracts the dataset and initializes the application.
   * @returns {Promise} A promise that resolves as soon as the extraction is
   * complete and the application has been initialized.
   */
  static extractAndInitialize() {
    // By design, we do not have a logger here. The extractor and the initalize
    // methods should suffice for the time being.
    return Extractor.extract().then(parsed => Application.initialize(parsed));
  }

  /**
   * Alias method for calling Extractor's extract method.
   * @returns {Promise} A promise that resolves as soon as the extraction is
   * complete.
   */
  static extract() {
    // NOTE: The Extractor is strictly only accessible via the Application
    // module, so this is the only way to access its extraction method.
    return Extractor.extract();
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
    // TODO: Improve highlighting of jsiqle objects
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
    context.literals = Application.literals;
    context.glob = glob;
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

    replServer.defineCommand('updateContent', {
      help: 'Updates content sources. Does not trigger extraction or recreate the schema.',
      action: () => {
        Content.update().then(() => {
          replServer.displayPrompt();
        });
      },
    });

    replServer.defineCommand('createSnippet', {
      help: [
        'Creates a new snippet with the given arguments.',
        'Usage: createSnippet <submoduleName> <snippetName>',
        'Example: createSnippet 30css my-new-snippet',
      ].join('\n                   '),
      action(input) {
        const [submoduleName, snippetName] = input.trim().split(' ');
        Content.createSnippet(submoduleName, snippetName);
        replServer.displayPrompt();
      },
    });

    // TODO: Content create content source

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
      prompt: '30web > ',
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
