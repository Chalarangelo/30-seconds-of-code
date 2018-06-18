const expect = require('expect');
const lowercaseKeys = require('./lowercaseKeys.js');

test('Testing lowercaseKeys', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof lowercaseKeys === 'function').toBeTruthy();
  const myObj = { Name: 'Adam', sUrnAME: 'Smith' };
  const myObjLower = lowercaseKeys(myObj);
  expect(myObjLower).toEqual({name: 'Adam', surname: 'Smith'});
  expect(myObj).toEqual({ Name: 'Adam', sUrnAME: 'Smith' });
});
