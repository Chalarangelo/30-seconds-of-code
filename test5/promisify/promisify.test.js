const expect = require('expect');
const promisify = require('./promisify.js');

test('Testing promisify', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof promisify === 'function').toBeTruthy();
  const x = promisify(Math.max);
  expect(x() instanceof Promise).toBeTruthy();
  const delay = promisify((d, cb) => setTimeout(cb, d));
  delay(200).then(() => );
});
