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
test('Resolves a callback result', () => {
  const resolve1 = promisify(cb => cb(null, 1));
  return expect(resolve1()).resolves.toBe(1);
});
test('Rejects on error', () => {
  const reject = promisify(cb => cb('error', null));
  return expect(reject()).rejects.toMatch('error');
});
