const test = require('tape');
const call = require('./call.js');

test('Testing call', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof call === 'function', 'call is a Function');
  //t.deepEqual(call(args..), 'Expected');
  t.looseEqual(call('map', x => x * 2)([1, 2, 3]), [2, 4, 6], 'Calls function on given object');
  //t.false(call(args..), 'Expected');
  //t.throws(call(args..), 'Expected');
  t.end();
});