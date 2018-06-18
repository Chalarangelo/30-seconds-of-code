const expect = require('expect');
const maxBy = require('./maxBy.js');

test('Testing maxBy', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof maxBy === 'function').toBeTruthy();
  expect(maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n)).toBe(8);
  expect(maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n')).toBe(8);
});
