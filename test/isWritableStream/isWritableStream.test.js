const expect = require('expect');
const isWritableStream = require('./isWritableStream.js');
const fs = require('fs');
const Stream = require('stream');

test('isWritableStream is a Function', () => {
  expect(isWritableStream).toBeInstanceOf(Function);
});
test('isWritableStream returns false for read streams', () => {
  expect(isWritableStream(fs.createReadStream('isWritableStream.js'))).toBeFalsy();
});
test('isWritableStream returns true for write streams', () => {
  expect(isWritableStream(fs.createWriteStream('isWritableStream.js'))).toBeTruthy();
});
test('isWritableStream returns true for duplex streams', () => {
  expect(isWritableStream(new Stream.Duplex())).toBeTruthy();
});
test('isWritableStream returns false for non-streams', () => {
  expect(isWritableStream({})).toBeFalsy();
});
