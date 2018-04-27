const test = require('tape');
const reject = require('./reject.js');

test('Testing reject', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof reject === 'function', 'reject is a Function');

  const noEvens = reject(
    (x) => x % 2 === 0,
    [1, 2, 3, 4, 5]
  );

  t.deepEqual(noEvens, [1, 3, 5]);

  const fourLettersOrLess = reject(
    (word) => word.length > 4,
    ['Apple', 'Pear', 'Kiwi', 'Banana']
  );

  t.deepEqual(fourLettersOrLess, ['Pear', 'Kiwi']);

  t.end();
});
