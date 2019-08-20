import arrayWithHoles from "./arrayWithHoles";
import iterableToArray from "./iterableToArray";
import nonIterableRest from "./nonIterableRest";
export default function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || nonIterableRest();
}