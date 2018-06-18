const expect = require('expect');
const when = require('./when.js');


  test('when is a Function', () => {
  expect(when).toBeInstanceOf(Function);
});

  const doubleEvenNumbers = when(
    (x) => x % 2 === 0,
    (x) => x * 2
  );

  t.true(doubleEvenNumbers(2) === 4);
  t.true(doubleEvenNumbers(1) === 1);

  

