export function cloneNode(n) {
  // $FlowIgnore
  var newObj = {};

  for (var k in n) {
    newObj[k] = n[k];
  }

  return newObj;
}