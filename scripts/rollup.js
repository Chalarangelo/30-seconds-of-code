/*
  Part of the process for building the `_30s` module.
*/
// Load modules
const fs = require('fs-extra');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const minify = require('rollup-plugin-babel-minify');
// Set variables for paths
const INPUT_FILE = './imports.js';
const MODULE_NAME = '_30s';
const DIST = './dist';
// Create `dist` folder if not existing
if (!fs.existsSync(DIST)) fs.mkdirSync(DIST);
// Setup babel and minification
const es5 = babel({ presets: [['env', { modules: false }]] });
const min = minify({ comments: false });
// Create the bundles
(async () => {
  const bundle = await rollup({ input: INPUT_FILE });
  const bundleES5 = await rollup({ input: INPUT_FILE, plugins: [es5] });
  const bundleMin = await rollup({ input: INPUT_FILE, plugins: [min] });
  const bundleES5Min = await rollup({
    input: INPUT_FILE,
    plugins: [es5, min]
  });

  // UMD ES2017
  await bundle.write({
    file: `${DIST}/${MODULE_NAME}.js`,
    name: MODULE_NAME,
    format: 'umd'
  });

  // UMD ES2017 minified
  await bundleMin.write({
    file: `${DIST}/${MODULE_NAME}.min.js`,
    name: MODULE_NAME,
    format: 'umd'
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

  // ESM ES2017
  await bundle.write({
    file: `${DIST}/${MODULE_NAME}.esm.js`,
    name: MODULE_NAME,
    format: 'es'
  });
})();
