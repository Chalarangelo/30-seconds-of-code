const expect = require("expect");
const multiSplit = require("./multiSplit.js");

test("multiSplit is a Function", () => {
  expect(multiSplit).toBeInstanceOf(Function);
});

test("multiSplit a predicate function", () => {
  expect(multiSplit("Hi. I love code, beer, music.", [ ".", "," ])).toEqual([
    "Hi",
    " I love code",
    " beer",
    " music",
    ""
  ]);
});
