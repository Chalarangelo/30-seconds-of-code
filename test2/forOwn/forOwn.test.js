const expect = require('expect');
const forOwn = require('./forOwn.js');

test('Testing forOwn', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof forOwn === 'function').toBeTruthy();
  let output = [];
  forOwn({ foo: 'bar', a: 1 }, v => output.push(v)); // 'bar', 1
  expect(output).toEqual(['bar', 1]);
});
