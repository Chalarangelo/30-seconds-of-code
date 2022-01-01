import repl from 'repl';
import path from 'path';
import util from 'util';
import glob from 'glob';
import chalk from 'chalk';
import { Env } from 'blocks/utilities/env';
import { Importer } from 'blocks/utilities/importer';
import { Extractor } from 'blocks/utilities/extractor';
import { Content } from 'blocks/utilities/content';
import { JSONHandler } from 'blocks/utilities/jsonHandler';

// TODO: Second pass, add a way to re import

// Console formatter
const writer = object => {
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
        return `${chalk.reset('{')} ${chalk.green(`${p1}#${p2}`)} ${chalk.reset(
          `}${p3}`
        )}`;
      }
    )
    .replace(/RecordSet\((\d+)\)\s+\[(.*?)]/gm, (m, p1, p2) => {
      // RecordSet prettifier
      return 'RecordSet(' + chalk.blue(p2) + ')[' + chalk.yellow(p1) + ']';
    });
};

// Start repl
let replServer = repl.start({
  prompt: '30web > ',
  writer,
});
replServer.setupHistory('console.log', () => {});

// If `npm run -- --extract` is called, extract the data first
const forceExtractFlag =
  process.argv.indexOf('--extract') !== -1 || process.argv.indexOf('-e') !== -1;

const modelNames = Importer.modelNames;
const serializerNames = Importer.serializerNames;

// Utilities and commands
const clearSchema = () => {
  const schema = Env.schema;
  if (schema && schema.name) {
    modelNames.forEach(model => {
      if (schema.models.has(model)) schema.removeModel(model);
    });
  }
};

const resetSchema = data => {
  clearSchema();
  Env.init(data);
};

const clearContext = () => {
  const context = replServer.context;
  modelNames.forEach(model => {
    if (context[model]) delete context[model];
  });
  serializerNames.forEach(serializer => {
    if (context[serializer]) delete context[serializer];
  });
  if (context.rawData) delete context.rawData;
};

const setContext = data => {
  const schema = Env.schema;
  if (schema && schema.name) {
    modelNames.forEach(model => {
      replServer.context[model] = schema.getModel(model);
    });
    serializerNames.forEach(serializer => {
      replServer.context[serializer] = schema.getSerializer(serializer);
    });
  }
  if (data) replServer.context.rawData = data;
  if (!replServer.context.rawData) replServer.context.rawData = Env.webData;
  replServer.Schema = schema;
};

const resetContext = data => {
  clearContext();
  setContext(data);
};

const prepare = data => {
  resetSchema(data);
  resetContext(data);
};

// Initializer function for the repl context
const initialize = forceExtractFlag
  ? () =>
      Extractor.extract().then(parsed => {
        prepare(parsed);
      })
  : () =>
      new Promise(resolve => {
        prepare();
        resolve();
      });

// Define commands (`.reset`, `.recreate`, `.update` etc.)
replServer.defineCommand('reset', {
  help: 'Resets the schema.',
  action: () => {
    prepare();
    console.log('Schema has been reset.');
    replServer.displayPrompt();
  },
});

replServer.defineCommand('recreate', {
  help: 'Extracts data and recreates the schema.',
  action: () => {
    Extractor.extract().then(parsed => {
      prepare(parsed);
      console.log('Data has been extracted and schema recreated.');
      replServer.displayPrompt();
    });
  },
});

replServer.defineCommand('update', {
  help:
    'Updates content sources. Does not trigger extraction or recreate the schema.',
  action: () => {
    Content.update().then(() => {
      console.log('Content sources have been updated.');
      replServer.displayPrompt();
    });
  },
});

// Set up the repl context and load modules
initialize().then(() => {
  // TODO:
  // Dynamically import modules from the blocks directory
  // const modules = glob
  //   .sync(`src/blocks/@(parsers|utilities)/**/index.js`)
  //   .map(file => require(path.resolve(file)))
  //   .reduce(
  //     (mA, m) => ({
  //       ...mA,
  //       ...m,
  //     }),
  //     {}
  //   );

  // // Dynamically add modules to the repl context
  // Object.keys(modules).forEach(m => {
  //   replServer.context[m] = modules[m];
  // });

  replServer.displayPrompt();
});
