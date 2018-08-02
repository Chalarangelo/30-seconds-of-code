const expect = require('expect');
const elementContains = require('./elementContains.js');

test('elementContains is a Function', () => {
  expect(elementContains).toBeInstanceOf(Function);
});
