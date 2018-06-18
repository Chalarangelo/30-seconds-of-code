const expect = require('expect');
const collectInto = require('./collectInto.js');

test('Testing collectInto', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof collectInto === 'function').toBeTruthy();
  const Pall = collectInto(Promise.all.bind(Promise));
  let p1 = Promise.resolve(1);
  let p2 = Promise.resolve(2);
  let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3));
  Pall(p1, p2, p3).then(function(val){ expect(val).toEqual([1,2,3]);}, function(reason){});
});
