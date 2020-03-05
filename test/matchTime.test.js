const { matchTime } = require("./_30s.js");

test("matchTime is a function", () => {
  expect(matchTime).toBeInstanceOf(Function);
});

test("matchTime finds the correct time", () => {
  expect(matchTime("Hello world! Right now the time is 2:30pm")).toEqual([
    "2:30"
  ]);
});

test("matchTime finds the correct time again", () => {
  expect(
    matchTime("Meet me in the subway at 10:30, operation starts at 12:00")
  ).toEqual(["10:30", "12:00"]);
});
