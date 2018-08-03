const expect = require('expect');
const lowercaseKeys = require('./lowercaseKeys.js');

test('lowercaseKeys is a Function', () => {
  expect(lowercaseKeys).toBeInstanceOf(Function);
});
const myObj = { Name: 'Adam', sUrnAME: 'Smith' };
const myObjLower = lowercaseKeys(myObj);
test('Lowercases object keys', () => {
  expect(myObjLower).toEqual({ name: 'Adam', surname: 'Smith' });
});
test('Does not mutate original object', () => {
  expect(myObj).toEqual({ Name: 'Adam', sUrnAME: 'Smith' });
});
