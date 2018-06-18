const expect = require('expect');
const decapitalize = require('./decapitalize.js');


  test('decapitalize is a Function', () => {
  expect(decapitalize).toBeInstanceOf(Function);
});
  t.equal(decapitalize('FooBar'), 'fooBar', 'Works with default parameter');
  t.equal(decapitalize('FooBar', true), 'fOOBAR', 'Works with second parameter set to true');
  

