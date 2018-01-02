/*
  This is the tagger script that updates the tag_databse file and logs stats for snippet tags.
  Run using `npm run tagger`.
*/
// Load modules
const fs = require('fs-extra'),
  path = require('path'),
  chalk = require('chalk');
// Load helper functions (these are from existing snippets in 30 seconds of code!)
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;
if(isTravisCI() && (/^Travis build: \d+/g.test(process.env['TRAVIS_COMMIT_MESSAGE'])) {
  console.log(`${chalk.green('NOBUILD')} Tagging terminated, parent commit is a Travis build!`);
  process.exit(0);
}
// Set variables for paths
const snippetsPath = './snippets';
// Set variables for script
let snippets = {},
  output = '',
  tagDbData = {},
  missingTags = 0,
  tagDbStats = {};
// Load helper functions (these are from existing snippets in 30 seconds of code!)
const objectFromPairs = arr => arr.reduce((a, v) => ((a[v[0]] = v[1]), a), {});
const countOccurrences = (arr, value) => arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);
// Start the timer of the script
console.time('Tagger');
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
  for (let snippet of snippetFilenames)
    snippets[snippet] = fs.readFileSync(path.join(snippetsPath, snippet), 'utf8');
} catch (err) {
  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During snippet loading: ${err}`);
  process.exit(1);
}
// Load tag data from the database
try {
  tagDbData = objectFromPairs(
    fs
      .readFileSync('tag_database', 'utf8')
      .split('\n')
      .slice(0, -1)
      .map(v => v.split(':').slice(0, 2))
  );
  tagDbStats = Object.entries(tagDbData)
    .sort((a, b) => a[1].localeCompare(b[1]))
    .reduce((acc, val) => {
      acc.hasOwnProperty(val[1]) ? acc[val[1]]++ : (acc[val[1]] = 1);
      return acc;
    }, {});
} catch (err) {
  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During tag database loading: ${err}`);
  process.exit(1);
}
// Update the listing of snippets in tag_database and log the statistics, along with missing scripts
try {
  for (let snippet of Object.entries(snippets))
    if (
      tagDbData.hasOwnProperty(snippet[0].slice(0, -3)) &&
      tagDbData[snippet[0].slice(0, -3)].trim()
    )
      output += `${snippet[0].slice(0, -3)}:${tagDbData[snippet[0].slice(0, -3)].trim()}\n`;
    else {
      output += `${snippet[0].slice(0, -3)}:uncategorized\n`;
      missingTags++;
      console.log(`${chalk.yellow('Tagged uncategorized:')} ${snippet[0].slice(0, -3)}`);
    }
  // Write to tag_database
  fs.writeFileSync('tag_database', output);
} catch (err) {
  // Handle errors (hopefully not!)
  console.log(`${chalk.red('ERROR!')} During tag_database generation: ${err}`);
  process.exit(1);
}
// Log statistics for the tag_database file
console.log(`\n${chalk.bgWhite(chalk.black('=== TAG STATS ==='))}`);
for (let tagData of Object.entries(tagDbStats).filter(v => v[0] !== 'undefined'))
  console.log(`${chalk.green(tagData[0])}: ${tagData[1]} snippets`);
console.log(
  `${chalk.blue("New untagged snippets (will be tagged as 'uncategorized'):")} ${missingTags}\n`
);
// Log a success message
console.log(`${chalk.green('SUCCESS!')} tag_database file updated!`);
// Log the time taken
console.timeEnd('Tagger');
