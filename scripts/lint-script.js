var fs = require('fs-extra');
var cp = require('child_process');
var path = require('path');

var snippetsPath = './snippets';
var snippetFilename = '';

console.time('Linter');

if(process.argv.length < 3){
  console.log('Please specify the filename of a snippet to be linted.');
  console.log('Example usage: npm run lint "snippet-file.md"');
  process.exit(0);
}
else {
  snippetFilename = process.argv[2];
  let snippetData = fs.readFileSync(path.join(snippetsPath,snippetFilename),'utf8');
  try {
    let originalCode = snippetData.slice(snippetData.indexOf('```js')+5,snippetData.lastIndexOf('```'));
    fs.writeFileSync('currentSnippet.js',`${originalCode}`);
    cp.exec('semistandard "currentSnippet.js" --fix',{},(error, stdOut, stdErr) => {
      let lintedCode = fs.readFileSync('currentSnippet.js','utf8');
      fs.writeFile(path.join(snippetsPath,snippetFilename), `${snippetData.slice(0, snippetData.indexOf('```js')+5)+lintedCode+'```\n'}`);
      console.timeEnd('Linter');
    });
  }
  catch (err){
    console.log('Error during snippet loading: '+err);
    process.exit(1);
  }
}
