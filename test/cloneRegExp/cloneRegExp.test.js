const expect = require('expect');
const cloneRegExp = require('./cloneRegExp.js');


  test('cloneRegExp is a Function', () => {
  expect(cloneRegExp).toBeInstanceOf(Function);
});
  const rgTest = /./g;
  t.notEqual(cloneRegExp(rgTest), rgTest, 'Clones regular expressions properly');
  

