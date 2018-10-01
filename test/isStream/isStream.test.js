const expect = require('expect');
const isStream = require('./isStream.js');
const fs = require('fs');

test('isStream is a Function', () => {
  expect(isStream).toBeInstanceOf(Function);
});
test('isStream returns true for streams', () => {
  expect(isStream(fs.createReadStream('isStream.js'))).toBeTruthy();
});
test('isStream returns false for non-streams', () => {
  expect(isStream({})).toBeFalsy();
});
