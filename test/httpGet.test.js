const expect = require('expect');
const {httpGet} = require('./_30s.js');

test('httpGet is a Function', () => {
  expect(httpGet).toBeInstanceOf(Function);
});
test('httpGet does not throw errors', () => {
  expect(() => {
    httpGet('http://localhost', x => x, console.log);
    httpGet('http://localhost', x => x);
  }).not.toThrow(TypeError);
});