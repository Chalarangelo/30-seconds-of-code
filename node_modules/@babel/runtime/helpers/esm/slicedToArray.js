import arrayWithHoles from "./arrayWithHoles";
import iterableToArrayLimit from "./iterableToArrayLimit";
import nonIterableRest from "./nonIterableRest";
export default function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}