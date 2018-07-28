/*
  This is the "keymaker" script that generates the glossary/keyword_database file.
  Run using `npm run glossary:keymaker`.
*/

const fs = require('fs-extra');
const util = require('../util');

const glossaryFiles = util.getFilesInDir('./glossary', false);

try {
	const output = glossaryFiles.reduce(
		(accumulator, currentFilename) => 
			accumulator.toLowerCase().replace(/\.[^/.]+$/, "") + "\n" + 
			currentFilename.toLowerCase().replace(/\.[^/.]+$/, ""));
  fs.writeFileSync('glossary/keyword_database', output);	
} catch (err) {
	console.log(`${chalk.red('ERROR!')} During glossary keyword_database generation: ${err}`);
  process.exit(1);
}