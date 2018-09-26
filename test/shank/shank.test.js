const expect = require("expect");
const shank = require("./shank.js");

test("shank is a Function", () => {
  expect(shank).toBeInstanceOf(Function);
});

const names = ["alpha", "bravo", "charlie"];
const secondNames = shank(names, 1, 0, "john");
const thirdNames = shank(secondNames, 2, 1, "jacob", "jingleheimer");

test("does not mutate original array", () => {
  expect(names).toEqual(["alpha", "bravo", "charlie"]);
});

test("returns a new array with concatinations", () => {
  expect(secondNames).toEqual(["alpha", "john", "bravo", "charlie"]);
});

test("returns a new array with omissions and concatinations", () => {
  expect(thirdNames).toEqual([
    "alpha",
    "john",
    "jacob",
    "jingleheimer",
    "charlie"
  ]);
});
