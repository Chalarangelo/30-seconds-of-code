const expect = require('expect');
const tomorrow = require('./tomorrow.js');


  test('tomorrow is a Function', () => {
  expect(tomorrow).toBeInstanceOf(Function);
});
  const t1 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
  const t2 = new Date(tomorrow());
  test('Returns the correct year', () => {
  expect(t1.getFullYear(), t2.getFullYear()).toBe()
});
  test('Returns the correct month', () => {
  expect(t1.getMonth(), t2.getMonth()).toBe()
});
  test('Returns the correct date', () => {
  expect(t1.getDate(), t2.getDate()).toBe()
});
  

