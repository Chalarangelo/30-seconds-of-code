export default function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}