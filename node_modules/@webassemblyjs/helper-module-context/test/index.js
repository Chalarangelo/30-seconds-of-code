const { assert } = require("chai");
const { parse } = require("@webassemblyjs/wast-parser");

const { moduleContextFromModuleAST } = require("../lib");

const contextFromWast = wast => moduleContextFromModuleAST(parse(wast).body[0]);

describe("module context", () => {
  describe("start segment", () => {
    it("should return the start function offset", () => {
      const context = contextFromWast(`
        (module
          (func)
          (func)
          (start 1)
        )
      `);

      assert.isOk(context.getStart());
      assert.typeOf(context.getStart(), "number");
      assert.equal(context.getStart(), 1);
    });

    it("should return null if no start function", () => {
      const context = contextFromWast(`
        (module (func))
      `);

      assert.isNull(context.getStart());
    });
  });
});
