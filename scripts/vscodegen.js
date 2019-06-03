/*
  This is the VSCode generator script that generates the vscode_snippets/snippets.json file.
  Run using `npm run vscoder`.
*/
// Load modules
const fs = require('fs-extra');
const path = require('path');
const { green } = require('kleur');
let snippetsData = require('../snippet_data/snippets.json');
// Paths
const OUTPUT_PATH = './vscode_snippets';
console.time('VSCoder');
// Read and format data
let vscodeData = snippetsData.data.filter(v => !v.meta.archived ).reduce((acc, v) => {
  acc[v.id] = {
    prefix: `30s_${v.id}`,
    body: v.attributes.codeBlocks.es6.replace(/\r/g, '').split('\n'),
    description: v.attributes.text.slice(0, v.attributes.text.indexOf('\r\n\r\n'))
  };
  return acc;
}, {});
// Write data
fs.writeFileSync(
  path.join(OUTPUT_PATH, 'snippets.json'),
  JSON.stringify(vscodeData, null, 2)
);
// Display messages and time
console.log(
  `${green(
    'SUCCESS!'
  )} vscode_snippets/snippets.json file generated!`
);
console.timeEnd('VSCoder');
