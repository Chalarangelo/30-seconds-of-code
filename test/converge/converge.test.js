const expect = require('expect');
const converge = require('./converge.js');

test('converge is a Function', () => {
  expect(converge).toBeInstanceOf(Function);
});
const average = converge((a, b) => a / b, [
  arr => arr.reduce((a, v) => a + v, 0),
  arr => arr.length
]);
test('Produces the average of the array', () => {
  expect(average([1, 2, 3, 4, 5, 6, 7])).toBe(4);
});
const strangeConcat = converge((a, b) => a + b, [x => x.toUpperCase(), x => x.toLowerCase()]);
test('Produces the strange concatenation', () => {
  expect(strangeConcat('Yodel')).toBe('YODELyodel');
});
