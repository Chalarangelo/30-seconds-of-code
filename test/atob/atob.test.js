const expect = require('expect');
const atob = require('./atob.js');


  test('atob is a Function', () => {
  expect(atob).toBeInstanceOf(Function);
});
  test('atob("Zm9vYmFy") equals "foobar"', () => {
  expect(atob('Zm9vYmFy'), 'foobar').toBe()
});
  test('atob("Z") returns ""', () => {
  expect(atob('Z'), '').toBe()
});
  

