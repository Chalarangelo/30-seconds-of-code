const expect = require('expect');
const isReadableStream = require('./isReadableStream.js');
const fs = require('fs');
const Stream = require('stream');

test('isReadableStream is a Function', () => {
  expect(isReadableStream).toBeInstanceOf(Function);
});
test('isReadableStream returns true for read streams', () => {
  expect(isReadableStream(fs.createReadStream('isReadableStream.js'))).toBeTruthy();
});
test('isReadableStream returns false for write streams', () => {
  expect(isReadableStream(fs.createWriteStream('isReadableStream.js'))).toBeFalsy();
});
test('isReadableStream returns true for duplex streams', () => {
  expect(isReadableStream(new Stream.Duplex())).toBeTruthy();
});
test('isReadableStream returns false for non-streams', () => {
  expect(isReadableStream({})).toBeFalsy();
});
