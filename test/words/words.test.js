const expect = require('expect');
const words = require('./words.js');

test('words is a Function', () => {
  expect(words).toBeInstanceOf(Function);
});
test('words(\'I love javaScript!!\') returns [I, love, javaScript]', () => {
  expect(words('I love javaScript!!')).toEqual(["I", "love", "javaScript"]);
});
test('words(\'python, javaScript & coffee\') returns [python, javaScript, coffee]', () => {
  expect(words('python, javaScript & coffee')).toEqual(["python", "javaScript", "coffee"]);
});
test('words(I love javaScript!!) returns an array', () => {
  expect(Array.isArray(words('I love javaScript!!'))).toBeTruthy();
});
test('words() throws an error', () => {
  expect(() => { words(); }).toThrow();
});
test('words(null) throws an error', () => {
  expect(() => { words(null); }).toThrow();
});
test('words(undefined) throws an error', () => {
  expect(() => { words(undefined); }).toThrow();
});
test('words({}) throws an error', () => {
  expect(() => { words({}); }).toThrow();
});
test('words([]) throws an error', () => {
  expect(() => { words([]); }).toThrow();
});
test('words(1234) throws an error', () => {
  expect(() => { words(1234); }).toThrow();
});
