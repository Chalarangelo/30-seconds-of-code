const expect = require('expect');
const flip = require('./flip.js');

test('Testing flip', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof flip === 'function').toBeTruthy();
  let a = { name: 'John Smith' };
  let b = {};
  const mergeFrom = flip(Object.assign);
  let mergePerson = mergeFrom.bind(null, a);
  expect(mergePerson(b)).toEqual(a);
});
