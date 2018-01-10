module.exports = chainAsync = fns => {
let curr = 0;
const next = () => fns[curr++](next);
next();
};