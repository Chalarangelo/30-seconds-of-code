const expect = require('expect');
const pipeAsyncFunctions = require('./pipeAsyncFunctions.js');

test('pipeAsyncFunctions is a Function', () => {
  expect(pipeAsyncFunctions).toBeInstanceOf(Function);
});
test('pipeAsyncFunctions result should be 15', () => {
  expect(pipeAsyncFunctions(
    (x) => x + 1,
    (x) => new Promise((resolve) => setTimeout(() => resolve(x + 2), 0)),
    (x) => x + 3,
    async (x) => await x + 4,
  )
  (5)).resolves.toBe(15); 
});
