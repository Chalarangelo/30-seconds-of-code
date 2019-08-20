require('../../modules/es6.string.iterator');
var get = require('../../modules/$.iterators').String;
module.exports = function(it){
  return get.call(it);
};