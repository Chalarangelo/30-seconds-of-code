const expect = require('expect');
const sleep = require('./sleep.js');

test('sleep is a Function', () => {
  expect(sleep).toBeInstanceOf(Function);
});
test('Works as expected', () => {
  async function sleepyWork() {
    await sleep(1000);
    expect(true).toBeTruthy();
  }
});
