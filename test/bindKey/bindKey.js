const bindKey = (context, fn, ...args) =>
function() {
return context[fn].apply(context, args.concat(...arguments));
};
module.exports = bindKey