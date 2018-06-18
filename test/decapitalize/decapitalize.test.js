const expect = require('expect');
const decapitalize = require('./decapitalize.js');


  test('decapitalize is a Function', () => {
  expect(decapitalize).toBeInstanceOf(Function);
});
  test('Works with default parameter', () => {
  expect(decapitalize('FooBar'), 'fooBar').toBe()
});
  test('Works with second parameter set to true', () => {
  expect(decapitalize('FooBar', true), 'fOOBAR').toBe()
});
  

