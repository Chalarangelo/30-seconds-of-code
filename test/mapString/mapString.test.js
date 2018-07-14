const expect = require('expect');
const mapString = require('./mapString.js');

test('mapString is a Function', () => {
  expect(mapString).toBeInstanceOf(Function);
});

test('mapString returns a capitalized string', () => {
  expect(mapString('test', c => c.toUpperCase())).toBe('TEST');
});

const indexMapper = (c, i) => `${c}[${i}]`;
test('mapString can deal with indexes', () => {
  expect(mapString('test', indexMapper)).toBe('t[0]e[1]s[2]t[3]');
});

const fullStringMapper = (c, i, str) => `{${str}}${c}[${i}]`;
test('mapString can deal with the full string', () => {
  expect(mapString('test', fullStringMapper)).toBe('{test}t[0]{test}e[1]{test}s[2]{test}t[3]');
});
