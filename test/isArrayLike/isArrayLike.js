module.exports = val => {
try {
return [...val], true;
} catch (e) {
return false;
}
};