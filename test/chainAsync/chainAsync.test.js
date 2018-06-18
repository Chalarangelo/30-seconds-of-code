const expect = require('expect');
const chainAsync = require('./chainAsync.js');

test('Testing chainAsync', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof chainAsync === 'function').toBeTruthy();
  chainAsync([
    next => {
      next();
    },
    next => {
      (() => {
        next();
      })();
    },
    next => {}
  ]);
});
