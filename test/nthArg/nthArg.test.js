const expect = require('expect');
const nthArg = require('./nthArg.js');


  test('nthArg is a Function', () => {
  expect(nthArg).toBeInstanceOf(Function);
});
  const third = nthArg(2);
  t.equal(third(1, 2, 3), 3, 'Returns the nth argument');
  t.equal(third(1, 2), undefined, 'Returns undefined if arguments too few');
  const last = nthArg(-1);
  t.equal(last(1, 2, 3, 4, 5), 5, 'Works for negative values');
  

