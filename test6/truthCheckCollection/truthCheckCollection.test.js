const expect = require('expect');
const truthCheckCollection = require('./truthCheckCollection.js');

test('Testing truthCheckCollection', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof truthCheckCollection === 'function').toBeTruthy();
  expect(
    truthCheckCollection([{ user: 'Tinky-Winky', sex: 'male' }, { user: 'Dipsy', sex: 'male' }], 'sex')
  ).toBe(true);
});