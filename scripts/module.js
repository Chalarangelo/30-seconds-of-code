/**
 * Builds the `_30s` module in UMD and ESM formats.
 * Also builds the test module file for testing snippets.
 */
const fs = require('fs-extra');
const path = require('path');
const { green, red } = require('kleur');
const util = require('./util');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const minify = require('rollup-plugin-babel-minify');
const config = require('../config');

const MODULE_NAME = `./${config.moduleName}`;
const SNIPPETS_PATH = `./${config.snippetPath}`;
const SNIPPETS_ARCHIVE_PATH = `./${config.snippetArchivePath}`;
const DIST_PATH = `./${config.distPath}`;
const ROLLUP_INPUT_FILE = `./${config.rollupInputFile}`;
const TEST_MODULE_FILE = `./${config.testModuleFile}`;
const CODE_RE = /```\s*js([\s\S]*?)```/;

/**
 * Builds the UMD + ESM files to the ./dist directory.
 */
async function doRollup() {
  // Plugins
  const es5 = babel({ presets: ['@babel/preset-env'], plugins: ['transform-object-rest-spread'] });
  const min = minify({ comments: false });

  const output = format => file => ({
    format,
    file,
    name: MODULE_NAME
  });

  const umd = output('umd');
  const esm = output('es');

  const bundle = await rollup({ input: ROLLUP_INPUT_FILE });
  const bundleES5 = await rollup({ input: ROLLUP_INPUT_FILE, plugins: [es5] });
  const bundleES5Min = await rollup({
    input: ROLLUP_INPUT_FILE,
    plugins: [es5, min]
  });

  const baseName = `${DIST_PATH}/${MODULE_NAME}`;

  // UMD ES2018
  await bundle.write(umd(`${baseName}.js`));
  // ESM ES2018
  await bundle.write(esm(`${baseName}.esm.js`));
  // UMD ES5
  await bundleES5.write(umd(`${baseName}.es5.js`));
  // UMD ES5 min
  await bundleES5Min.write(umd(`${baseName}.es5.min.js`));
}

/**
 * Starts the build process.
 */
async function build() {
  console.time('Packager');

  let requires = [];
  let esmExportString = '';
  let cjsExportString = '';

  try {
    if (!fs.existsSync(DIST_PATH)) fs.mkdirSync(DIST_PATH);
    fs.writeFileSync(ROLLUP_INPUT_FILE, '');
    fs.writeFileSync(TEST_MODULE_FILE, '');

    // Synchronously read all snippets from snippets folder and sort them as necessary (case-insensitive)
    snippets = util.readSnippets(SNIPPETS_PATH);
    snippetsArray = Object.keys(snippets).reduce((acc, key) => {
      acc.push(snippets[key]);
      return acc;
    }, []);
    archivedSnippets = util.readSnippets(SNIPPETS_ARCHIVE_PATH);
    archivedSnippetsArray = Object.keys(archivedSnippets).reduce((acc, key) => {
      acc.push(archivedSnippets[key]);
      return acc;
    }, []);

    [...snippetsArray, ...archivedSnippetsArray].forEach(snippet => {
      let code = `${snippet.attributes.codeBlocks.es6}\n`;
      if(snippet.attributes.tags.includes('node')) {
        requires.push(code.match(/const.*=.*require\(([^\)]*)\);/g));
        code = code.replace(/const.*=.*require\(([^\)]*)\);/g, '');
      }
      esmExportString += `export ${code}`;
      cjsExportString += code;
    });

    requires = [
      ...new Set(
        requires
          .filter(Boolean)
          .map(v =>
            v[0].replace(
              'require(',
              'typeof require !== "undefined" && require('
            )
          )
      )
    ].join('\n');

    fs.writeFileSync(ROLLUP_INPUT_FILE, `${requires}\n\n${esmExportString}`);

    const testExports = `module.exports = {${[...snippetsArray, ...archivedSnippetsArray]
      .map(v => v.id)
      .join(',')}}`;

    fs.writeFileSync(
      TEST_MODULE_FILE,
      `${requires}\n\n${cjsExportString}\n\n${testExports}`
    );

    // Check Travis builds - Will skip builds on Travis if not CRON/API
    if (util.isTravisCI() && util.isNotTravisCronOrAPI()) {
      fs.unlink(ROLLUP_INPUT_FILE);
      console.log(
        `${green(
          'NOBUILD'
        )} Module build terminated, not a cron job or a custom build!`
      );
      console.timeEnd('Packager');
      process.exit(0);
    }

    await doRollup();

    // Clean up the temporary input file Rollup used for building the module
    fs.unlink(ROLLUP_INPUT_FILE);

    console.log(`${green('SUCCESS!')} Snippet module built!`);
    console.timeEnd('Packager');
  } catch (err) {
    console.log(`${red('ERROR!')} During module creation: ${err}`);
    process.exit(1);
  }
}

build();
