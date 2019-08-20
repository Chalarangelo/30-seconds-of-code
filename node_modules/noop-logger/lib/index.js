
/**
 * Methods.
 */

var methods = [
  'debug',
  'info',
  'warn',
  'error',
  'critical',
  'alert',
  'emergency',
  'notice',
  'verbose',
  'fatal'
];

/**
 * Expose methods.
 */

methods.forEach(function(method){
  exports[method] = function(){};
});
