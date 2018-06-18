const expect = require('expect');
const reject = require('./reject.js');

test('Testing reject', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof reject === 'function').toBeTruthy();

  const noEvens = reject(
    (x) => x % 2 === 0,
    [1, 2, 3, 4, 5]
  );

  expect(noEvens).toEqual([1, 3, 5]);

  const fourLettersOrLess = reject(
    (word) => word.length > 4,
    ['Apple', 'Pear', 'Kiwi', 'Banana']
  );

  expect(fourLettersOrLess).toEqual(['Pear', 'Kiwi']);
});
