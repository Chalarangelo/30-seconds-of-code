const expect = require('expect');
const chainAsync = require('./chainAsync.js');

test('chainAsync is a Function', () => {
  expect(chainAsync).toBeInstanceOf(Function);
});

test('Calls all functions in an array', () => {
  chainAsync([
    next => {
      next();
    },
    next => {
      (() => {
        next();
      })();
    },
    next => {
      expect(true).toBeTruthy();
    }
  ]);
});
