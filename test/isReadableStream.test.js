const { isReadableStream } = require('./_30s.js');
const Stream = require('stream');

test('isReadableStream is a Function', () => {
  expect(isReadableStream).toBeInstanceOf(Function);
});
test('isReadableStream returns true for read streams', () => {
  expect(isReadableStream(new Stream.Readable())).toBeTruthy();
});
test('isReadableStream returns false for write streams', () => {
  expect(isReadableStream(new Stream.Writable())).toBeFalsy();
});
test('isReadableStream returns true for duplex streams', () => {
  expect(isReadableStream(new Stream.Duplex())).toBeTruthy();
});
test('isReadableStream returns false for non-streams', () => {
  expect(isReadableStream({})).toBeFalsy();
});
