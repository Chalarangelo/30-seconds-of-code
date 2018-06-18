const expect = require('expect');
const debounce = require('./debounce.js');


  test('debounce is a Function', () => {
  expect(debounce).toBeInstanceOf(Function);
});
  debounce(() => {t.pass('Works as expected');}, 250);
  

