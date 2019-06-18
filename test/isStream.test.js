const { isStream } = require('./_30s.js');
const Stream = require('stream');

test('isStream is a Function', () => {
  expect(isStream).toBeInstanceOf(Function);
});
test('isStream returns true for read streams', () => {
  expect(isStream(new Stream.Readable())).toBeTruthy();
});
test('isStream returns true for write streams', () => {
  expect(isStream(new Stream.Writable())).toBeTruthy();
});
test('isStream returns true for duplex streams', () => {
  expect(isStream(new Stream.Duplex())).toBeTruthy();
});
test('isStream returns false for non-streams', () => {
  expect(isStream({})).toBeFalsy();
});
