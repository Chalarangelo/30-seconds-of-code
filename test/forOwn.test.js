const expect = require('expect');
const {forOwn} = require('./_30s.js');

test('forOwn is a Function', () => {
  expect(forOwn).toBeInstanceOf(Function);
});
let output = [];
forOwn({ foo: 'bar', a: 1 }, v => output.push(v));
test("Iterates over an element's key-value pairs", () => {
  expect(output).toEqual(['bar', 1]);
});
