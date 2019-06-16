const {forOwnRight} = require('./_30s.js');

test('forOwnRight is a Function', () => {
  expect(forOwnRight).toBeInstanceOf(Function);
});
let output = [];
forOwnRight({ foo: 'bar', a: 1 }, v => output.push(v));
test("Iterates over an element's key-value pairs in reverse", () => {
  expect(output).toEqual([1, 'bar']);
});
