const fs = require('fs');
const readFileLines = filename =>
fs
.readFileSync(filename)
.toString('UTF8')
.split('\n');
 module.exports = readFileLines