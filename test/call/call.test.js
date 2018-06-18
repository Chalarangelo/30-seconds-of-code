const expect = require('expect');
const call = require('./call.js');

test('Testing call', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof call === 'function').toBeTruthy();
  //t.deepEqual(call(args..), 'Expected');
  t.looseEqual(call('map', x => x * 2)([1, 2, 3]), [2, 4, 6], 'Calls function on given object');
});