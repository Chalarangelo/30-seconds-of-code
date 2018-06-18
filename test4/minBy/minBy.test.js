const expect = require('expect');
const minBy = require('./minBy.js');

test('Testing minBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof minBy === 'function').toBeTruthy();
  expect(minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)).toBe(2);
  expect(minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')).toBe(2);
});
