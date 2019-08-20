'use strict';

var Frame = function() {};

var instance = {
  final:        false,
  rsv1:         false,
  rsv2:         false,
  rsv3:         false,
  opcode:       null,
  masked:       false,
  maskingKey:   null,
  lengthBytes:  1,
  length:       0,
  payload:      null
};

for (var key in instance)
  Frame.prototype[key] = instance[key];

module.exports = Frame;
