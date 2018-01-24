const test = require('tape');
const words = require('./words.js');

test('Testing words', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof words === 'function', 'words is a Function');
  t.deepEqual(words('I love javaScript!!'), ["I", "love", "javaScript"], "words('I love javaScript!!') returns [I, love, javaScript]");
  t.deepEqual(words('python, javaScript & coffee'), ["python", "javaScript", "coffee"], "words('python, javaScript & coffee') returns [python, javaScript, coffee]");
  t.true(Array.isArray(words('I love javaScript!!')), 'words(I love javaScript!!) returns an array');
  t.throws(() => words(), 'words() throws a error');
  t.throws(() => words(null), 'words(null) throws a error');
  t.throws(() => words(undefined), 'words(undefined) throws a error');
  t.throws(() => words({}), 'words({}) throws a error');
  t.throws(() => words([]), 'words([]) throws a error');
  t.throws(() => words(1234), 'words(1234) throws a error');

  t.end();
});
