const {httpDelete} = require('./_30s.js');

test('httpDelete is a Function', () => {
  expect(httpDelete).toBeInstanceOf(Function);
});
test('httpDelete does not throw errors', () => {
  expect(() => {
    httpDelete('http://localhost', x => x, console.log);
    httpDelete('http://localhost', x => x);
  }).not.toThrow(TypeError);
});
