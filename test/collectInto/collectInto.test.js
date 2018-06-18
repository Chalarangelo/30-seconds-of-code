const expect = require('expect');
const collectInto = require('./collectInto.js');


  test('collectInto is a Function', () => {
  expect(collectInto).toBeInstanceOf(Function);
});
  const Pall = collectInto(Promise.all.bind(Promise));
  let p1 = Promise.resolve(1);
  let p2 = Promise.resolve(2);
  let p3 = new Promise(resolve => setTimeout(resolve, 2000, 3));
  Pall(p1, p2, p3).then(function(val){ t.deepEqual(val, [1,2,3], 'Works with multiple promises');}, function(reason){
  

