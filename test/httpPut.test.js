const {httpPut} = require('./_30s.js');

test('httpPut is a Function', () => {
  expect(httpPut).toBeInstanceOf(Function);
});
test('httpPut does not throw errors', () => {
  expect(() => {
    httpPut('http://localhost', x => x, console.log);
    httpPut('http://localhost', x => x);
  }).not.toThrow(TypeError);
});
