const expect = require('expect');
const pipeAsyncFunctions = require('./pipeAsyncFunctions.js');


  test('pipeAsyncFunctions is a Function', () => {
  expect(pipeAsyncFunctions).toBeInstanceOf(Function);
});
  t.equal(
    await pipeAsyncFunctions(
      (x) => x + 1,
      (x) => new Promise((resolve) => setTimeout(() => resolve(x + 2), 0)),
      (x) => x + 3,
      async (x) => await x + 4,
    )
    (5),
    15,
    'pipeAsyncFunctions result should be 15'
  );
  
