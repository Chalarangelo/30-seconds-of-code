const expect = require('expect');
const {cleanObj} = require('./_30s.js');

test('cleanObj is a Function', () => {
  expect(cleanObj).toBeInstanceOf(Function);
});
const testObj = { a: 1, b: 2, children: { a: 1, b: 2 } };
test('Removes any properties except the ones specified from a JSON object', () => {
  expect(cleanObj(testObj, ['a'], 'children')).toEqual({ a: 1, children: { a: 1 } });
});
