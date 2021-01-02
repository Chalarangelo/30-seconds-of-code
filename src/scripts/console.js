import repl from 'repl';
import path from 'path';
import glob from 'glob';
import { Env } from 'blocks/utilities/env';

// Start repl
let replServer = repl.start({
  prompt: '30web > ',
});

// Set globals
Env.init('DEVELOPMENT').then(data => {
  replServer.context.global.settings = data;

  replServer.setupHistory('console.log', () => {});

  // Dynamically import modules from the blocks directory
  const modules = glob
    .sync(
      `src/blocks/@(adapters|decorations|entities|parsers|utilities|serializers)/**/index.js`
    )
    .map(file => require(path.resolve(file)))
    .reduce(
      (mA, m) => ({
        ...mA,
        ...m,
      }),
      {}
    );

  // Dynamically add modules to the repl context
  Object.keys(modules).forEach(m => {
    replServer.context[m] = modules[m];
  });
});
