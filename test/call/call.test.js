const expect = require('expect');
const call = require('./call.js');

test('call is a Function', () => {
  expect(call).toBeInstanceOf(Function);
});
test('Calls function on given object', () => {
  expect(call('map', x => x * 2)([1, 2, 3])).toEqual([2, 4, 6]);
});
