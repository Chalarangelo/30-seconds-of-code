const expect = require("expect");
const {shank} = require("./_30s.js");

test("shank is a Function", () => {
  expect(shank).toBeInstanceOf(Function);
});

const names = ['alpha', 'bravo', 'charlie'];

test("Returns an array with the added elements.", () => {
  expect(shank(names, 1, 0, 'delta')).toEqual(['alpha', 'delta', 'bravo', 'charlie']);
});

test("Returns an array with the removed elements.", () => {
  expect(shank(names, 1, 1)).toEqual(['alpha', 'charlie']);
});

test("Does not mutate the original array", () => {
  shank(names, 1, 0, 'delta');
  expect(names).toEqual(['alpha', 'bravo', 'charlie']);
});

