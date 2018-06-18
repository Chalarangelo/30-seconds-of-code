const expect = require('expect');
const call = require('./call.js');


  test('call is a Function', () => {
  expect(call).toBeInstanceOf(Function);
});
  t.looseEqual(call('map', x => x * 2)([1, 2, 3]), [2, 4, 6], 'Calls function on given object');
  
