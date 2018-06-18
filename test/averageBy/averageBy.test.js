const expect = require('expect');
const averageBy = require('./averageBy.js');

test('Testing averageBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof averageBy === 'function').toBeTruthy();
  expect(averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)).toBe(5);
  expect(averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')).toBe(5);
});
