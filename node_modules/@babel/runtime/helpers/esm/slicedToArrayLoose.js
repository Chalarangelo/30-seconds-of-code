import arrayWithHoles from "./arrayWithHoles";
import iterableToArrayLimitLoose from "./iterableToArrayLimitLoose";
import nonIterableRest from "./nonIterableRest";
export default function _slicedToArrayLoose(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimitLoose(arr, i) || nonIterableRest();
}