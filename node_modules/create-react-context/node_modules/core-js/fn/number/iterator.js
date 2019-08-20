require('../../modules/core.number.iterator');
var get = require('../../modules/$.iterators').Number;
module.exports = function(it){
  return get.call(it);
};