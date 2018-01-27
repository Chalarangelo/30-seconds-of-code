const bindAll = (obj, ...fns) =>
fns.forEach(
fn =>
(obj[fn] = function() {
return fn.apply(obj);
})
);
module.exports = bindAll