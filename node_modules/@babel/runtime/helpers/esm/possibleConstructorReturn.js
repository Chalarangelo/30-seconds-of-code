import _typeof from "../../helpers/esm/typeof";
import assertThisInitialized from "./assertThisInitialized";
export default function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}