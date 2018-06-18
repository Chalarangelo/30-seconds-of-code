const expect = require('expect');
const chainAsync = require('./chainAsync.js');


  test('chainAsync is a Function', () => {
  expect(chainAsync).toBeInstanceOf(Function);
});
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
      
    }
  ]);
  

