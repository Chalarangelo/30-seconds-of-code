const expect = require('expect');
const coalesce = require('./coalesce.js');


  test('coalesce is a Function', () => {
  expect(coalesce).toBeInstanceOf(Function);
});
  t.deepEqual(coalesce(null, undefined, '', NaN, 'Waldo'), '', "Returns the first non-null/undefined argument");
  
