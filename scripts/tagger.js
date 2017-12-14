var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');

var snippetsPath = './snippets';

var snippets = {}, output = '', tagDbData = {}, missingTags = 0, tagDbStats = {};

const objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {});
const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);


console.time('Tagger');

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
  tagDbData = objectFromPairs(fs.readFileSync('tag_database','utf8').split('\n').map(v => v.split(':').slice(0,2)));
  // for(var tag of [...new Set(Object.entries(tagDbData).map(x => x[1]))])
  //   tagDbStats[tag] = Object.values(tagDbData).filter(v => v === tag);
  // console.log(tagDbStats);
  tagDbStats = Object.entries(tagDbData).reduce((acc, val) => {acc.hasOwnProperty(val[1]) ? acc[val[1]]++ : acc[val[1]] = 1; return acc;}, {});
}
catch (err){
  console.log('Error during tag database loading: '+err);
  process.exit(1);
}

try {
  for(var snippet of Object.entries(snippets))
    if(tagDbData.hasOwnProperty(snippet[0].slice(0,-3)) && tagDbData[snippet[0].slice(0,-3)].trim())
      output += `${snippet[0].slice(0,-3)}:${tagDbData[snippet[0].slice(0,-3)].trim()}\n`;
    else {
      output += `${snippet[0].slice(0,-3)}:\n`;
      missingTags++;
      console.log(`${chalk.red('Tag missing:')} ${snippet[0].slice(0,-3)}`);
    }
  fs.writeFileSync('tag_database', output);
}
catch (err){
  console.log('Error during README generation: '+err);
  process.exit(1);
}
console.log(`\n===Tag database statistics===`)
for(var tagData of Object.entries(tagDbStats).filter(v => v[0] !== 'undefined')){
  console.log(`${chalk.green(tagData[0])}: ${tagData[1]} snippets`);
}
console.log(`${chalk.blue('Untagged snippets:')} ${missingTags}\n`);

console.timeEnd('Tagger');
