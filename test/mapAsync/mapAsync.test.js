const test = require('tape');
const mapAsync = require('./mapAsync.js');

test('Testing mapAsync', async (t) => {
  t.true(typeof mapAsync === 'function', 'mapAsync is a Function');

  const asyncFn = (val) => new Promise(resolve => setTimeout(() => resolve(val ** 2), 20));

  t.deepEqual(await mapAsync([12, 5, 8, 3], asyncFn), [144, 25, 64, 9]);
  t.end();
});