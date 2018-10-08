const expect = require('expect');
const matches = require('./matches.js');

test('matches is a Function', () => {
  expect(matches).toBeInstanceOf(Function);
});
test('Matches returns true for two similar objects', () => {
  expect(
    matches({ age: 25, hair: 'long', beard: true }, { hair: 'long', beard: true })
  ).toBeTruthy();
});
test('Matches returns false for two non-similar objects', () => {
  expect(
    matches({ hair: 'long', beard: true }, { age: 25, hair: 'long', beard: true })
  ).toBeFalsy();
});
