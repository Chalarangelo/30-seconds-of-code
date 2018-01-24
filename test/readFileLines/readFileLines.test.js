const test = require('tape');
const readFileLines = require('./readFileLines.js');

test('Testing readFileLines', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof readFileLines === 'function', 'readFileLines is a Function');
  //t.deepEqual(readFileLines(args..), 'Expected');
  //t.equal(readFileLines(args..), 'Expected');
  //t.false(readFileLines(args..), 'Expected');
  //t.throws(readFileLines(args..), 'Expected');
  t.end();
});