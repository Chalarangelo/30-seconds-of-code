import { declare } from "@babel/helper-plugin-utils";
import rewritePattern from "regexpu-core";
import * as regex from "@babel/helper-regex";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-dotall-regex",

    visitor: {
      RegExpLiteral(path) {
        const node = path.node;
        if (!regex.is(node, "s")) {
          return;
        }
        node.pattern = rewritePattern(node.pattern, node.flags, {
          dotAllFlag: true,
          useUnicodeFlag: regex.is(node, "u"),
        });
        regex.pullFlag(node, "s");
      },
    },
  };
});
