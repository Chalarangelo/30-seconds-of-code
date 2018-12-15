const expect = require('expect');
const {promisify} = require('./_30s.js');

test('promisify is a Function', () => {
  expect(promisify).toBeInstanceOf(Function);
});
const x = promisify(Math.max);
test('Returns a promise', () => {
  expect(x() instanceof Promise).toBeTruthy();
});
test('Runs the function provided', () => {
  const delay = promisify((d, cb) => setTimeout(cb, d));
  return delay(200).then(() => expect(true).toBeTruthy());
});
test('Returns a promise wrapped result', () => {
  const return1 = promisify(cb => cb(null, 1));
  return return1().then(result => expect(result).toBe(1));
});
