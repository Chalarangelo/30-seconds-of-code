const test = require('tape');
const collectInto = require('./collectInto.js');

test('Testing collectInto', (t) => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  t.true(typeof collectInto === 'function', 'collectInto is a Function');
  const Pall = collectInto(Promise.all.bind(Promise));
  let p1 = Promise.resolve(1);
  let p2 = Promise.resolve(2);
  let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3));
  Pall(p1, p2, p3).then(function(val){ t.deepEqual(val, [1,2,3], 'Works with multiple promises');}, function(reason){});
  //t.deepEqual(collectInto(args..), 'Expected');
  //t.equal(collectInto(args..), 'Expected');
  //t.false(collectInto(args..), 'Expected');
  //t.throws(collectInto(args..), 'Expected');
  t.end();
});
