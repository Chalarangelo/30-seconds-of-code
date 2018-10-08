const expect = require('expect');
const flip = require('./flip.js');

test('flip is a Function', () => {
  expect(flip).toBeInstanceOf(Function);
});
let a = { name: 'John Smith' };
let b = {};
const mergeFrom = flip(Object.assign);
let mergePerson = mergeFrom.bind(null, a);
test('Flips argument order', () => {
  expect(mergePerson(b)).toEqual(a);
});
