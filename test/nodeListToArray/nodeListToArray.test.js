const test = require('tape');
const nodeListToArray = require('./nodeListToArray.js');

test('Testing nodeListToArray', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof nodeListToArray === 'function', 'nodeListToArray is a Function');
  //t.deepEqual(nodeListToArray(args..), 'Expected');
  //t.equal(nodeListToArray(args..), 'Expected');
  //t.false(nodeListToArray(args..), 'Expected');
  //t.throws(nodeListToArray(args..), 'Expected');
  t.end();
});