var fs = require('fs-extra');
var path = require('path');

var snippetsPath = './snippets';
var staticPartsPath = './static-parts';

var snippets = {}, startPart = '', endPart = '', output = '';

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
  output += `${startPart+'\n'}`;
  for(var snippet of Object.entries(snippets))
    output += `* [${snippet[0][0].toUpperCase() + snippet[0].replace(/-/g,' ').slice(1,snippet[0].length-3)}](#${snippet[0].slice(0,snippet[0].length-3).replace(/\(/g,'').replace(/\)/g,'').toLowerCase()})\n`
  output += '\n';
  for(var snippet of Object.entries(snippets))
    output += `${snippet[1]+'\n'}`;
  output += `${endPart+'\n'}`;
  fs.writeFileSync('README.md', output);
}
catch (err){
  console.log('Error during README generation: '+err);
  process.exit(1);
}

console.timeEnd('Builder');
