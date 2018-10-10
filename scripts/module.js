/*
  Builds the `_30s` module.
*/
// Load modules
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const util = require('./util');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const minify = require('rollup-plugin-babel-minify');
// Check Travis builds - needs some extra work
if (util.isTravisCI() && util.isNotTravisCronOrAPI()) {
  console.log(
    `${chalk.green('NOBUILD')} Module build terminated, not a cron job or a custom build!`
  );
  process.exit(0);
}
// Set variables for paths
const SNIPPETS_PATH = './snippets';
const SNIPPETS_ARCHIVE_PATH = './snippets_archive';
const TEMP_PATH = './temp';
const IMPORTS = './imports.js';
const MODULE_NAME = '_30s';
const DIST = './dist';
// Regex for selecting code blocks
const codeRE = /```\s*js([\s\S]*?)```/;
// Read snippets, build packages 
(async () => {
  // Start the timer of the script
  console.time('Packager');
  try {
    const tagDatabase = fs.readFileSync('tag_database', 'utf8');
    const nodeSnippets = tagDatabase.split('\n').filter(v => v.search(/:.*node/g) !== -1).map(v => v.slice(0,v.indexOf(':')));
    const snippets = fs.readdirSync(SNIPPETS_PATH);
    const archivedSnippets = fs.readdirSync(SNIPPETS_ARCHIVE_PATH);
    // Create `temp` and `dist` folders if they don't already exist.
    if (!fs.existsSync(TEMP_PATH)) fs.mkdirSync(TEMP_PATH);
    if (!fs.existsSync(DIST)) fs.mkdirSync(DIST);
    // Write `imports.js`
    fs.writeFileSync(IMPORTS, '');

    snippets.forEach(snippet => {
      const snippetData = fs.readFileSync(path.join(SNIPPETS_PATH, snippet), 'utf8');
      const snippetName = snippet.replace('.md', '');
      const code = snippetData.match(codeRE)[1].replace('\n', '');
      const toWrite = nodeSnippets.includes(snippetName)
        ? `${code
          .replace(`const ${snippetName}`, `export const ${snippetName}`)
          // Prevents errors from being thrown in browser environment
          .replace('require(', 'typeof require !== "undefined" && require(')}`
        : `export ${code}`;
      // Write data to file and append to the imports file
      fs.writeFileSync(`${TEMP_PATH}/${snippetName}.js`, toWrite);
      fs.appendFileSync(IMPORTS, `\nexport { ${snippetName} } from './temp/${snippetName}.js'`);
    })
    
    // Write to the proper files and start the `rollup` script
    const es5 = babel({
      presets: ['@babel/preset-env']
    });
    const min = minify({ comments: false });
    const bundle = await rollup({ input: IMPORTS });
    const bundleES5 = await rollup({ input: IMPORTS, plugins: [es5] });
    const bundleES5Min = await rollup({
      input: IMPORTS,
      plugins: [es5, min]
    });
    // UMD ES2018
    await bundle.write({
      file: `${DIST}/${MODULE_NAME}.js`,
      name: MODULE_NAME,
      format: 'umd'
    });

    // ESM ES2018
    await bundle.write({
      file: `${DIST}/${MODULE_NAME}.esm.js`,
      name: MODULE_NAME,
      format: 'es'
    });

    // UMD ES5
    await bundleES5.write({
      file: `${DIST}/${MODULE_NAME}.es5.js`,
      name: MODULE_NAME,
      format: 'umd'
    });

    // UMD ES5 min
    await bundleES5Min.write({
      file: `${DIST}/${MODULE_NAME}.es5.min.js`,
      name: MODULE_NAME,
      format: 'umd'
    });

    // Clean up temporary data
    fs.removeSync(TEMP_PATH);
    fs.unlink(IMPORTS);
    // Log a success message
    console.log(`${chalk.green('SUCCESS!')} Snippet module built!`);
    // Log the time taken
    console.timeEnd('Packager');
  } catch (err) {
    // Handle errors (hopefully not!)
    console.log(`${chalk.red('ERROR!')} During module creation: ${err}`);
    process.exit(1);
  }
})();