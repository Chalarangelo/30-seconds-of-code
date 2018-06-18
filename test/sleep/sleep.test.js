const expect = require('expect');
const sleep = require('./sleep.js');


  test('sleep is a Function', () => {
  expect(sleep).toBeInstanceOf(Function);
});
  async function sleepyWork() {
    await sleep(1000);
    t.pass('Works as expected');
  }
  

