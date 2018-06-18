const expect = require('expect');
const forOwn = require('./forOwn.js');


  test('forOwn is a Function', () => {
  expect(forOwn).toBeInstanceOf(Function);
});
  let output = [];
  forOwn({ foo: 'bar', a: 1 }, v => output.push(v));
  t.deepEqual(output, ['bar', 1], 'Iterates over an element\'s key-value pairs');
  

