var fs = require('fs-extra');
var path = require('path');

var snippetsPath = './snippets';
var staticPartsPath = './static-parts';

var snippets = {}, startPart = '', endPart = '', output = '', tagDbData = {};

const objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {});
const capitalize = (str, lowerRest = false) => str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));

console.time('Builder');

try {
  var snippetFilenames = fs.readdirSync(snippetsPath);
  snippetFilenames.sort((a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
  for(var snippet of snippetFilenames){
    snippets[snippet] = fs.readFileSync(path.join(snippetsPath,snippet),'utf8');
  }
}
catch (err){
  console.log('Error during snippet loading: '+err);
  process.exit(1);
}

try {
  startPart = fs.readFileSync(path.join(staticPartsPath,'README-start.md'),'utf8');
  endPart = fs.readFileSync(path.join(staticPartsPath,'README-end.md'),'utf8');
}
catch (err){
  console.log('Error during static part loading: '+err);
  process.exit(1);
}

try {
  tagDbData = objectFromPairs(fs.readFileSync('tag_database','utf8').split('\n').slice(0,-1).map(v => v.split(':').slice(0,2)));
}
catch (err){
  console.log('Error during tag database loading: '+err);
  process.exit(1);
}

try {
  output += `${startPart+'\n'}`;
  for(var tag of [...new Set(Object.entries(tagDbData).map(t => t[1]))].sort((a,b) => a.localeCompare(b))){
    output +=`### ${capitalize(tag, true)}\n`;
    for(var taggedSnippet of Object.entries(tagDbData).filter(v => v[1] === tag))
      output += `* [${taggedSnippet[0][0].toUpperCase() + taggedSnippet[0].replace(/-/g,' ').slice(1)}](#${taggedSnippet[0].replace(/\(/g,'').replace(/\)/g,'').toLowerCase()})\n`
    output += '\n';
  }
  for(var tag of [...new Set(Object.entries(tagDbData).map(t => t[1]))].sort((a,b) => a.localeCompare(b))){
    output +=`## ${capitalize(tag, true)}\n`;
    for(var taggedSnippet of Object.entries(tagDbData).filter(v => v[1] === tag))
      output += `\n${snippets[taggedSnippet[0]+'.md']+'\n[⬆ back to top](#table-of-contents)\n'}`;
  }
  output += `\n${endPart+'\n'}`;
  fs.writeFileSync('README.md', output);
}
catch (err){
  console.log('Error during README generation: '+err);
  process.exit(1);
}

console.timeEnd('Builder');
