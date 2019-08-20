import undef from "./temporalUndefined";
export default function _temporalRef(val, name) {
  if (val === undef) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  } else {
    return val;
  }
}