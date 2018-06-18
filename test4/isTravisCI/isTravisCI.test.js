const expect = require('expect');
const isTravisCI = require('./isTravisCI.js');

test('Testing isTravisCI', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof isTravisCI === 'function').toBeTruthy();
  if(isTravisCI())
    expect(isTravisCI()).toBeTruthy();
  else
    expect(isTravisCI()).toBeFalsy();
});
