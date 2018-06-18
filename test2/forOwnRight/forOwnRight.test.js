const expect = require('expect');
const forOwnRight = require('./forOwnRight.js');

test('Testing forOwnRight', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof forOwnRight === 'function').toBeTruthy();
  let output = [];
  forOwnRight({ foo: 'bar', a: 1 }, v => output.push(v)); // 'bar', 1
  expect(output).toEqual([1, 'bar']);
});
