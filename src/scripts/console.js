import repl from 'repl';
import path from 'path';
import glob from 'glob';
import { setupEnv } from 'build/utilities/env';

// Start repl
let replServer = repl.start({
  prompt: '30web > ',
});

// Set globals
replServer.context.global.settings = setupEnv('DEVELOPMENT');

replServer.setupHistory('console.log', () => {});

// Dynamically import modules from the build directory
const modules = glob
  .sync(
    `src/build/@(adapters|decorations|entities|parsers|utilities|serializers)/**/index.js`
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
