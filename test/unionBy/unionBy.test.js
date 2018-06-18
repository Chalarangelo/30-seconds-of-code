const expect = require('expect');
const unionBy = require('./unionBy.js');

test('unionBy is a Function', () => {
  expect(unionBy).toBeInstanceOf(Function);
});
test('Produces the appropriate results', () => {
  expect(unionBy([2.1], [1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
});
