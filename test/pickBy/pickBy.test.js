const test = require('tape');
const pickBy = require('./pickBy.js');

test('Testing pickBy', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof pickBy === 'function', 'pickBy is a Function');
  t.deepEqual(pickBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'), { 'a': 1, 'c': 3 }, 'Creates an object composed of the properties the given function returns truthy for.');
  //t.deepEqual(pickBy(args..), 'Expected');
  //t.equal(pickBy(args..), 'Expected');
  //t.false(pickBy(args..), 'Expected');
  //t.throws(pickBy(args..), 'Expected');
  t.end();
});
