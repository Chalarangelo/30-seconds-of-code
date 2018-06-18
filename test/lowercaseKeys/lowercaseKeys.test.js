const expect = require('expect');
const lowercaseKeys = require('./lowercaseKeys.js');


  test('lowercaseKeys is a Function', () => {
  expect(lowercaseKeys).toBeInstanceOf(Function);
});
  const myObj = { Name: 'Adam', sUrnAME: 'Smith' };
  const myObjLower = lowercaseKeys(myObj);
  test('Lowercases object keys', () => {
  expect(myObjLower, {name: 'Adam', surname: 'Smith'}).toEqual()
});
  test('Does not mutate original object', () => {
  expect(myObj, { Name: 'Adam', sUrnAME: 'Smith' }).toEqual()
});
  

