const expect = require('expect');
const forOwnRight = require('./forOwnRight.js');


  test('forOwnRight is a Function', () => {
  expect(forOwnRight).toBeInstanceOf(Function);
});
  let output = [];
  forOwnRight({ foo: 'bar', a: 1 }, v => output.push(v));
  t.deepEqual(output, [1, 'bar'], 'Iterates over an element\'s key-value pairs in reverse');
  

