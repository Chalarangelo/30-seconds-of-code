const expect = require('expect');
const yesNo = require('./yesNo.js');

test('Testing yesNo', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof yesNo === 'function').toBeTruthy();
  expect(yesNo('Y')).toBeTruthy();
  expect(yesNo('yes')).toBeTruthy();
  expect(yesNo('foo', true)).toBeTruthy();
  expect(yesNo('No')).toBeFalsy();
  expect(yesNo()).toBeFalsy();
  expect(yesNo(null)).toBeFalsy();
  expect(yesNo(undefined)).toBeFalsy();
  expect(yesNo([123, null])).toBeFalsy();
  expect(yesNo(['Yes', 'No'])).toBeFalsy();
  expect(yesNo({ 2: 'Yes' })).toBeFalsy();
  expect(yesNo(['Yes', 'No'], true)).toBeTruthy();
  expect(yesNo({ 2: 'Yes' }, true)).toBeTruthy();
});
