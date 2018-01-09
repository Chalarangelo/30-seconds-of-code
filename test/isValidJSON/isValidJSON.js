module.exports = obj => {
try {
JSON.parse(obj);
return true;
} catch (e) {
return false;
}
};