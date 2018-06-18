const expect = require('expect');
const pipeAsyncFunctions = require('./pipeAsyncFunctions.js');

test('Testing pipeAsyncFunctions', async () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof pipeAsyncFunctions === 'function').toBeTruthy();
  //t.deepEqual(pipeAsyncFunctions(args..), 'Expected');
  //t.equal(pipeAsyncFunctions(args..), 'Expected');
  //t.false(pipeAsyncFunctions(args..), 'Expected');
  //t.throws(pipeAsyncFunctions(args..), 'Expected');
  expect(await pipeAsyncFunctions(
    (x) => x + 1,
    (x) => new Promise((resolve) => setTimeout(() => resolve(x + 2), 0)),
    (x) => x + 3,
    async (x) => await x + 4,
  )
  (5)).toBe(15);
});