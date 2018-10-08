const expect = require('expect');
const heronArea = require('./heronArea.js');

test('heronArea is a Function', () => {
  expect(heronArea).toBeInstanceOf(Function);
});
