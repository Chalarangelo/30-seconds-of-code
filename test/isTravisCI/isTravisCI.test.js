const expect = require('expect');
const isTravisCI = require('./isTravisCI.js');


  test('isTravisCI is a Function', () => {
  expect(isTravisCI).toBeInstanceOf(Function);
});
  if(isTravisCI())
    test('Running on Travis, correctly evaluates', () => {
  expect(isTravisCI()).toBeTruthy();
});
  else
    test('Not running on Travis, correctly evaluates', () => {
  expect(isTravisCI()).toBeFalsy();
});
  

