import kebabHash from "./index";

describe("Default hashLength", () => {
  test("Returns for /foo-bar", () => {
    expect(kebabHash("/foo-bar")).toBe("foo-bar-096");
  });

  test("Returns for /foo/bar", () => {
    expect(kebabHash("/foo/bar")).toBe("foo-bar-1df");
  });
});

describe("hashLength 5", () => {
  test("Returns for /foo-bar", () => {
    expect(kebabHash("/foo-bar", 5)).toBe("foo-bar-09652");
  });

  test("Returns for /foo/bar", () => {
    expect(kebabHash("/foo/bar", 5)).toBe("foo-bar-1df48");
  });
});
