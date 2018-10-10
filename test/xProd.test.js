const expect = require('expect');
const {xProd} = require('./_30s.js');

test('xProd is a Function', () => {
  expect(xProd).toBeInstanceOf(Function);
});
test("xProd([1, 2], ['a', 'b']) returns [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]", () => {
  expect(xProd([1, 2], ['a', 'b'])).toEqual([[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]);
});
