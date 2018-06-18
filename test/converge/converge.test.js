const expect = require('expect');
const converge = require('./converge.js');

test('Testing converge', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof converge === 'function').toBeTruthy();
  const average = converge((a, b) => a / b, [
    arr => arr.reduce((a, v) => a + v, 0),
    arr => arr.length,
  ]);
  expect(average([1, 2, 3, 4, 5, 6, 7])).toBe(4);
  const strangeConcat = converge((a, b) => a + b, [
    x => x.toUpperCase(),
    x => x.toLowerCase()]
  );
  expect(strangeConcat('Yodel')).toBe("YODELyodel");
});
