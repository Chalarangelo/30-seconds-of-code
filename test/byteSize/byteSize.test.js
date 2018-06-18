import expect from 'expect';
const Blob = class{
  constructor(s) {
    return {
      size: Buffer.byteLength(s.toString())
    };
  }
};
// const byteSize = require('./byteSize.js');
// Override
const byteSize = str => new Blob([str]).size;
test('Testing byteSize', () => {
  //For more information on all the methods supported by tape
  //Please go to https://github.com/substack/tape
  expect(typeof byteSize === 'function').toBeTruthy();
  expect(byteSize('a')).toBe(1);
  expect(byteSize('Hello World')).toBe(11);
  expect(byteSize('😀')).toBe(4);
});
