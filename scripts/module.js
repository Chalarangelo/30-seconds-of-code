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
// Set variables for paths
const SNIPPETS_PATH = './snippets';
const SNIPPETS_ARCHIVE_PATH = './snippets_archive';
const IMPORTS = './imports.js';
const TEST_PACKAGE = './test/_30s.js';
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
    const snippetExports = `module.exports = {${snippets.map(v => v.replace('.md', '')).join(',')}}`;
    let requires = [];
    let importData = '';
    const archivedSnippets = fs.readdirSync(SNIPPETS_ARCHIVE_PATH).filter(v => v !== 'README.md');
    const testExports = `module.exports = {${[...snippets,...archivedSnippets].map(v => v.replace('.md', '')).join(',')}}`;
    // Create `temp` and `dist` folders if they don't already exist.
    if (!fs.existsSync(DIST)) fs.mkdirSync(DIST);
    // Write `imports.js`
    fs.writeFileSync(IMPORTS, '');
    fs.writeFileSync(TEST_PACKAGE, '');

    snippets.forEach(snippet => {
      const snippetData = fs.readFileSync(path.join(SNIPPETS_PATH, snippet), 'utf8');
      const snippetName = snippet.replace('.md', '');
      let code = snippetData.match(codeRE)[1].replace('\n', '');
      if (nodeSnippets.includes(snippetName)) {
        requires.push(code.match(/const.*=.*require\(([^\)]*)\);/g));
        code = code.replace(/const.*=.*require\(([^\)]*)\);/g,'');
      }
      importData += code;
    });
    // Write the data to the imports file
    requires = [...new Set(requires.filter(Boolean).map(v => v[0].replace('require(', 'typeof require !== "undefined" && require(')))].join('\n');
    fs.writeFileSync(IMPORTS, `${requires}\n\n${importData}\n\n${snippetExports}`)

    archivedSnippets.forEach(snippet => {
      const snippetData = fs.readFileSync(path.join(SNIPPETS_ARCHIVE_PATH, snippet), 'utf8');
      let code = snippetData.match(codeRE)[1].replace('\n', '');
      importData += code;
    });
    fs.writeFileSync(TEST_PACKAGE, `${requires}\n\n${importData}\n\n${testExports}`);

    // Check Travis builds - Will skip builds on Travis if not CRON/API
    if (util.isTravisCI() && util.isNotTravisCronOrAPI()) {
      fs.unlink(IMPORTS);
      console.log(
        `${chalk.green('NOBUILD')} Module build terminated, not a cron job or a custom build!`
      );
      console.timeEnd('Packager');
      process.exit(0);
    }

    // Write to the proper files and start the `rollup` script
    const es5 = babel({
      presets: ['@babel/preset-env']
    });
    const min = minify({ comments: false });
    const bundle = await rollup({ input: IMPORTS });
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
    const bundleES5 = await rollup({ input: IMPORTS, plugins: [es5] });
    await bundleES5.write({
      file: `${DIST}/${MODULE_NAME}.es5.js`,
      name: MODULE_NAME,
      format: 'umd'
    });
    // UMD ES5 min
    const bundleES5Min = await rollup({
      input: IMPORTS,
      plugins: [es5, min]
    });
    await bundleES5Min.write({
      file: `${DIST}/${MODULE_NAME}.es5.min.js`,
      name: MODULE_NAME,
      format: 'umd'
    });

    // Clean up temporary data
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
