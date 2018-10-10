const expect = require('expect');
const {heronArea} = require('./_30s.js');

test('heronArea is a Function', () => {
  expect(heronArea).toBeInstanceOf(Function);
});
