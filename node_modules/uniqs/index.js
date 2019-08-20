module.exports = function uniqs() {
  var list = Array.prototype.concat.apply([], arguments);
  return list.filter(function(item, i) {
    return i == list.indexOf(item);
  });
};
