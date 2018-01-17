const isValidJSON = obj => {
try {
JSON.parse(obj);
return true;
} catch (e) {
return false;
}
};
 module.exports = isValidJSON