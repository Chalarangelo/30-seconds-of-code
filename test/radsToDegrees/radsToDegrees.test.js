const expect = require('expect');
const radsToDegrees = require('./radsToDegrees.js');


  test('radsToDegrees is a Function', () => {
  expect(radsToDegrees).toBeInstanceOf(Function);
});
  t.equal(radsToDegrees(Math.PI / 2), 90, 'Returns the appropriate value');
  

