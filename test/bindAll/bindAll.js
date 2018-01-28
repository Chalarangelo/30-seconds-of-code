const bindAll = (obj, ...fns) =>
fns.forEach(
fn =>
(f = obj[fn], obj[fn] = function() {
return f.apply(obj);
})
);
module.exports = bindAll