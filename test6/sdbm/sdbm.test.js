const expect = require('expect');
const sdbm = require('./sdbm.js');

test('Testing sdbm', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof sdbm === 'function').toBeTruthy();
  expect(sdbm('name')).toBe(-3521204949);
});