const expect = require('expect');
const reject = require('./reject.js');


  test('reject is a Function', () => {
  expect(reject).toBeInstanceOf(Function);
});

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

  

