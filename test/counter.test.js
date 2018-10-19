const expect = require('expect');
const {counter} = require('./_30s.js');

test('counter is a Function', () => {
  expect(counter).toBeInstanceOf(Function);
});
