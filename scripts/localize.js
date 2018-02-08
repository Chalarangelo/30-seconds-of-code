/*
  This is the localizer script that generates the localization files.
  Run using `npm run localizer`.
*/
// Load modules
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const util = require('./util');

const LOCALE_PATH = 'locale';
const SNIPPETS_PATH = './snippets';
const locales = ['de_DE', 'el_GR'];
let snippets = util.readSnippets(SNIPPETS_PATH);
const COMMENT_REGEX = /(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/.*)/g;

locales.forEach(locale => {
  const locData = require(path.join('..',LOCALE_PATH,locale));
  let existingData = fs.readFileSync(path.join(LOCALE_PATH,locale+'.js'), 'utf8');
  let newData = [];
  let hashChanges = [];
  Object.keys(snippets).forEach(snippet => {
    const snippetName = snippet.split('.')[0];
    const snippetHash = util.hashData(snippets[snippet]);
    if(locData.hasOwnProperty(snippetName)){
      if (locData[snippetName].hash !== snippetHash) {
        existingData = existingData.indexOf(' => '+snippetHash) !== -1 ? existingData : existingData.replace(locData[snippetName].hash, locData[snippetName].hash+' => '+snippetHash);
        hashChanges.push({snippetName, oldHash: locData[snippetName].hash.split(' => ')[0], newHash: snippetHash});
      }
    }
    else {
      newData.push(`\n'${snippetName}' : {
  'description': \`${snippets[snippet].split('```js')[0].replace(/`/g,'\\`')}\`,
  'comments': [${(snippets[snippet].match(COMMENT_REGEX) || []).map(v => '`'+v.replace(/`/g,'\\`')+'`')}],
  'hash': '${snippetHash}'
}`);
    }
  });
  if(!fs.existsSync(path.join(LOCALE_PATH,locale+'.js')) || !existingData.length) existingData = `module.exports = {
'locale': {
  'locale': '${locale}'
}};`;
  fs.writeFileSync(path.join(LOCALE_PATH,locale+'.js'), newData.length ? `${existingData.trim().slice(0,-2)},${newData.join(',')}};` : existingData);
  fs.writeFileSync(path.join(LOCALE_PATH,locale+'_log'), `${new Date()}
Hash changes: ${hashChanges.length}

${hashChanges.length ? hashChanges.map(v => ('Snippet name:' + v.snippetName +'\n  Old hash: ' + v.oldHash + '\n  New hash: ' + v.newHash + '\n')).join('\n') : ''}`);
});
