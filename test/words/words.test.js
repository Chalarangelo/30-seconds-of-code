const expect = require('expect');
const words = require('./words.js');


  test('words is a Function', () => {
  expect(words).toBeInstanceOf(Function);
});
  t.deepEqual(words('I love javaScript!!'), ["I", "love", "javaScript"], "words('I love javaScript!!') returns [I, love, javaScript]");
  t.deepEqual(words('python, javaScript & coffee'), ["python", "javaScript", "coffee"], "words('python, javaScript & coffee') returns [python, javaScript, coffee]");
  test('words(I love javaScript!!) returns an array', () => {
  expect(Array.isArray(words('I love javaScript!!'))).toBeTruthy();
});
  t.throws(() => words(), 'words() throws a error');
  t.throws(() => words(null), 'words(null) throws a error');
  t.throws(() => words(undefined), 'words(undefined) throws a error');
  t.throws(() => words({}), 'words({}) throws a error');
  t.throws(() => words([]), 'words([]) throws a error');
  t.throws(() => words(1234), 'words(1234) throws a error');

  

