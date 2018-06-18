const expect = require('expect');
const JSONToFile = require('./JSONToFile.js');

test('JSONToFile is a Function', () => {
  expect(JSONToFile).toBeInstanceOf(Function);
});
