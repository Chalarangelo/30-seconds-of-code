const expect = require('expect');
const words = require('./words.js');

test('Testing words', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof words === 'function').toBeTruthy();
  expect(words('I love javaScript!!')).toEqual(["I", "love", "javaScript"]);
  expect(words('python, javaScript & coffee')).toEqual(["python", "javaScript", "coffee"]);
  expect(Array.isArray(words('I love javaScript!!'))).toBeTruthy();
  expect(() => words()).toThrow();
  expect(() => words(null)).toThrow();
  expect(() => words(undefined)).toThrow();
  expect(() => words({})).toThrow();
  expect(() => words([])).toThrow();
  expect(() => words(1234)).toThrow();
});
