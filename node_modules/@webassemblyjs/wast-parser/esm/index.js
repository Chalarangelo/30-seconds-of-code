import * as parser from "./grammar";
import { tokenize } from "./tokenizer";
export function parse(source) {
  var tokens = tokenize(source); // We pass the source here to show code frames

  var ast = parser.parse(tokens, source);
  return ast;
}
export * from "./number-literals";