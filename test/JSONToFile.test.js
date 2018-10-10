const expect = require('expect');
const {JSONToFile} = require('./_30s.js');

test('JSONToFile is a Function', () => {
  expect(JSONToFile).toBeInstanceOf(Function);
});
