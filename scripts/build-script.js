/*
  This is the builder script that generates the README file.
  Run using `npm run builder`.
*/
// Load modules
const fs = require('fs-extra'), path = require('path'), chalk = require('chalk');
// Set variables for paths
const snippetsPath = './snippets',  staticPartsPath = './static-parts';
// Set variables for script
let snippets = {}, startPart = '', endPart = '', output = '', tagDbData = {};
// Load helper functions (these are from existing snippets in 30 seconds of code!)
const objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {});
const capitalize = (str, lowerRest = false) => str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));
// Start the timer of the script
console.time('Builder');
// Synchronously read all snippets and sort them as necessary (case-insensitive)
try {
  let snippetFilenames = fs.readdirSync(snippetsPath);
  snippetFilenames.sort((a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  // Store the data read from each snippet in the appropriate object
  for(let snippet of snippetFilenames)  snippets[snippet] = fs.readFileSync(path.join(snippetsPath,snippet),'utf8');
}
catch (err){  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During snippet loading: ${err}`);
  process.exit(1);
}
// Load static parts for the README file
try {
  startPart = fs.readFileSync(path.join(staticPartsPath,'README-start.md'),'utf8');
  endPart = fs.readFileSync(path.join(staticPartsPath,'README-end.md'),'utf8');
}
catch (err){ // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During static part loading: ${err}`);
  process.exit(1);
}
// Load tag data from the database
try {
  tagDbData = objectFromPairs(fs.readFileSync('tag_database','utf8').split('\n').slice(0,-1).map(v => v.split(':').slice(0,2)));
}
catch (err){  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During tag database loading: ${err}`);
  process.exit(1);
}
// Create the output for the README file
try {
  // Add the start static part
  output += `${startPart+'\n'}`;
  // Loop over tags and snippets to create the table of contents
  let uncategorizedOutput = '';
  for(let tag of [...new Set(Object.entries(tagDbData).map(t => t[1]))].filter(v => v).sort((a,b) => a.localeCompare(b))){
    if(capitalize(tag, true)=='Uncategorized') {
      uncategorizedOutput +=`### _${capitalize(tag, true)}_\n\n<details>\n<summary>View contents</summary>\n\n`;
      for(let taggedSnippet of Object.entries(tagDbData).filter(v => v[1] === tag))
        uncategorizedOutput += `* [\`${taggedSnippet[0]}\`](#${taggedSnippet[0].toLowerCase()})\n`
      uncategorizedOutput += '\n</details>\n\n';
    } else {
      output +=`### ${capitalize(tag, true)}\n\n<details>\n<summary>View contents</summary>\n\n`;
      for(let taggedSnippet of Object.entries(tagDbData).filter(v => v[1] === tag))
        output += `* [\`${taggedSnippet[0]}\`](#${taggedSnippet[0].toLowerCase()})\n`
      output += '\n</details>\n\n';
    }
  }
  output += uncategorizedOutput;
  uncategorizedOutput = '';
  // Loop over tags and snippets to create the list of snippets
  for(let tag of [...new Set(Object.entries(tagDbData).map(t => t[1]))].filter(v => v).sort((a,b) => a.localeCompare(b))){
    if(capitalize(tag, true)=='Uncategorized') {
      uncategorizedOutput +=`## _${capitalize(tag, true)}_\n`;
      for(let taggedSnippet of Object.entries(tagDbData).filter(v => v[1] === tag))
        uncategorizedOutput += `\n${snippets[taggedSnippet[0]+'.md']+'\n<br>[⬆ back to top](#table-of-contents)\n\n'}`;
    } else {
      output +=`## ${capitalize(tag, true)}\n`;
      for(let taggedSnippet of Object.entries(tagDbData).filter(v => v[1] === tag)){
        let data = snippets[taggedSnippet[0]+'.md'];
        data = data.slice(0,data.lastIndexOf('```js')) + '<details>\n<summary>Examples</summary>\n\n' + data.slice(data.lastIndexOf('```js'),data.lastIndexOf('```')) + data.slice(data.lastIndexOf('```')) + '\n</details>\n';
        output += `\n${data+'\n\n[⬆ Back to top](#table-of-contents)\n\n'}`;
      }
    }
  }
  output += uncategorizedOutput;
  // Add the ending static part
  output += `\n${endPart+'\n'}`;
  // Write to the README file
  fs.writeFileSync('README.md', output);
}
catch (err){  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During README generation: ${err}`);
  process.exit(1);
}
// Log a success message
console.log(`${chalk.green('SUCCESS!')} README file generated!`);
// Log the time taken
console.timeEnd('Builder');
