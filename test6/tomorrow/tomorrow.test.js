const expect = require('expect');
const tomorrow = require('./tomorrow.js');

test('Testing tomorrow', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof tomorrow === 'function').toBeTruthy();
  const t1 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
  const t2 = new Date(tomorrow());
  expect(t1.getFullYear()).toBe(t2.getFullYear());
  expect(t1.getMonth()).toBe(t2.getMonth());
  expect(t1.getDate()).toBe(t2.getDate());
});
