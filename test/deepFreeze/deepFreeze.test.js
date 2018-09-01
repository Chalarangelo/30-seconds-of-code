const expect = require('expect');
const deepFreeze = require('./deepFreeze.js');

test('deepFreeze is a Function', () => {
  expect(deepFreeze).toBeInstanceOf(Function);
});
