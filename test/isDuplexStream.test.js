const {isDuplexStream} = require('./_30s.js');
const Stream = require('stream');

test('isDuplexStream is a Function', () => {
  expect(isDuplexStream).toBeInstanceOf(Function);
});
test('isDuplexStream returns false for read streams', () => {
  expect(isDuplexStream(new Stream.Readable())).toBeFalsy();
});
test('isDuplexStream returns false for write streams', () => {
  expect(isDuplexStream(new Stream.Writable())).toBeFalsy();
});
test('isDuplexStream returns true for duplex streams', () => {
  expect(isDuplexStream(new Stream.Duplex())).toBeTruthy();
});
test('isDuplexStream returns false for non-streams', () => {
  expect(isDuplexStream({})).toBeFalsy();
});
