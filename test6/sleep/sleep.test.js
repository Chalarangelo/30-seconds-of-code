const expect = require('expect');
const sleep = require('./sleep.js');

test('Testing sleep', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof sleep === 'function').toBeTruthy();
  async function sleepyWork() {
    await sleep(1000);
  }
});
