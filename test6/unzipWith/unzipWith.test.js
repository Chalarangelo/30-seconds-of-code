const expect = require('expect');
const unzipWith = require('./unzipWith.js');

test('Testing unzipWith', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof unzipWith === 'function').toBeTruthy();
  expect(
    unzipWith([[1, 10, 100], [2, 20, 200]], (...args) => args.reduce((acc, v) => acc + v, 0))
  ).toEqual([3, 30, 300]);
});
