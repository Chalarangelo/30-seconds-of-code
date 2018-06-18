const expect = require('expect');
const decapitalize = require('./decapitalize.js');

test('Testing decapitalize', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof decapitalize === 'function').toBeTruthy();
  expect(decapitalize('FooBar')).toBe('fooBar');
  expect(decapitalize('FooBar', true)).toBe('fOOBAR');
});
