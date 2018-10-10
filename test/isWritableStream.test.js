const expect = require('expect');
const { isWritableStream } = require('./_30s.js');
const Stream = require('stream');

test('isWritableStream is a Function', () => {
  expect(isWritableStream).toBeInstanceOf(Function);
});
test('isWritableStream returns false for read streams', () => {
  expect(isWritableStream(new Stream.Readable())).toBeFalsy();
});
test('isWritableStream returns true for write streams', () => {
  expect(isWritableStream(new Stream.Writable())).toBeTruthy();
});
test('isWritableStream returns true for duplex streams', () => {
  expect(isWritableStream(new Stream.Duplex())).toBeTruthy();
});
test('isWritableStream returns false for non-streams', () => {
  expect(isWritableStream({})).toBeFalsy();
});
