/**
 * Builds the `_30s` module in UMD and ESM formats.
 * Also builds the test module file for testing snippets.
 */
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const util = require('./util');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const minify = require('rollup-plugin-babel-minify');

const MODULE_NAME = '_30s';
const SNIPPETS_PATH = './snippets';
const SNIPPETS_ARCHIVE_PATH = './snippets_archive';
const DIST_PATH = './dist';
const ROLLUP_INPUT_FILE = './imports.temp.js';
const TEST_MODULE_FILE = './test/_30s.js';
const CODE_RE = /```\s*js([\s\S]*?)```/;

/**
 * Returns the raw markdown string.
 */
function getRawSnippetString(snippetPath, snippet) {
  return fs.readFileSync(path.join(snippetPath, snippet), 'utf8');
}

/**
 * Returns the JavaScript code from the raw markdown string.
 */
function getCode(rawSnippetString) {
  return rawSnippetString.match(CODE_RE)[1].replace('\n', '');
}

/**
 * Builds the UMD + ESM files to the ./dist directory.
 */
async function doRollup() {
  // Plugins
  const es5 = babel({ presets: ['@babel/preset-env'] });
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

    // All the snippets that are Node.js-based and will break in a browser
    // environment
    const nodeSnippets = fs
      .readFileSync('tag_database', 'utf8')
      .split('\n')
      .filter(v => v.search(/:.*node/g) !== -1)
      .map(v => v.slice(0, v.indexOf(':')));

    const snippets = fs.readdirSync(SNIPPETS_PATH);
    const archivedSnippets = fs
      .readdirSync(SNIPPETS_ARCHIVE_PATH)
      .filter(v => v !== 'README.md');

    snippets.forEach(snippet => {
      const rawSnippetString = getRawSnippetString(SNIPPETS_PATH, snippet);
      const snippetName = snippet.replace('.md', '');
      let code = getCode(rawSnippetString);
      if (nodeSnippets.includes(snippetName)) {
        requires.push(code.match(/const.*=.*require\(([^\)]*)\);/g));
        code = code.replace(/const.*=.*require\(([^\)]*)\);/g, '');
      }
      esmExportString += `export ${code}`;
      cjsExportString += code;
    });
    archivedSnippets.forEach(snippet => {
      const rawSnippetString = getRawSnippetString(
        SNIPPETS_ARCHIVE_PATH,
        snippet
      );
      cjsExportString += getCode(rawSnippetString);
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

    const testExports = `module.exports = {${[...snippets, ...archivedSnippets]
      .map(v => v.replace('.md', ''))
      .join(',')}}`;

    fs.writeFileSync(
      TEST_MODULE_FILE,
      `${requires}\n\n${cjsExportString}\n\n${testExports}`
    );

    // Check Travis builds - Will skip builds on Travis if not CRON/API
    if (util.isTravisCI() && util.isNotTravisCronOrAPI()) {
      fs.unlink(ROLLUP_INPUT_FILE);
      console.log(
        `${chalk.green(
          'NOBUILD'
        )} Module build terminated, not a cron job or a custom build!`
      );
      console.timeEnd('Packager');
      process.exit(0);
    }

    await doRollup();

    // Clean up the temporary input file Rollup used for building the module
    fs.unlink(ROLLUP_INPUT_FILE);

    console.log(`${chalk.green('SUCCESS!')} Snippet module built!`);
    console.timeEnd('Packager');
  } catch (err) {
    console.log(`${chalk.red('ERROR!')} During module creation: ${err}`);
    process.exit(1);
  }
}

build();
