const expect = require('expect');
const isDuplexStream = require('./isDuplexStream.js');
const fs = require('fs');
const Stream = require('stream');

test('isDuplexStream is a Function', () => {
  expect(isDuplexStream).toBeInstanceOf(Function);
});
test('isDuplexStream returns true for read streams', () => {
  expect(isDuplexStream(fs.createReadStream('isDuplexStream.js'))).toBeTruthy();
});
test('isDuplexStream returns true for write streams', () => {
  expect(isDuplexStream(fs.createWriteStream('isDuplexStream.js'))).toBeTruthy();
});
test('isDuplexStream returns true for duplex streams', () => {
  expect(isDuplexStream(new Stream.Duplex())).toBeTruthy();
});
test('isDuplexStream returns false for non-streams', () => {
  expect(isDuplexStream({})).toBeFalsy();
});
