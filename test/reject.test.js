const {reject} = require('./_30s.js');

test('reject is a Function', () => {
  expect(reject).toBeInstanceOf(Function);
});
const noEvens = reject(x => x % 2 === 0, [1, 2, 3, 4, 5]);
test('Works with numbers', () => {
  expect(noEvens).toEqual([1, 3, 5]);
});
const fourLettersOrLess = reject(word => word.length > 4, ['Apple', 'Pear', 'Kiwi', 'Banana']);
test('Works with strings', () => {
  expect(fourLettersOrLess).toEqual(['Pear', 'Kiwi']);
});
