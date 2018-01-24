const test = require('tape');
const JSONToFile = require('./JSONToFile.js');

test('Testing JSONToFile', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof JSONToFile === 'function', 'JSONToFile is a Function');
  //t.deepEqual(JSONToFile(args..), 'Expected');
  //t.equal(JSONToFile(args..), 'Expected');
  //t.false(JSONToFile(args..), 'Expected');
  //t.throws(JSONToFile(args..), 'Expected');
  t.end();
});