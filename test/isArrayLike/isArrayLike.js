const isArrayLike = val => {
try {
return [...val], true;
} catch (e) {
return false;
}
};
 module.exports = isArrayLike