import _typeof from "../../helpers/esm/typeof";
import toPrimitive from "./toPrimitive";
export default function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}