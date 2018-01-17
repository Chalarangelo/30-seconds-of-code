const cleanObj = (obj, keysToKeep = [], childIndicator) => {
Object.keys(obj).forEach(key => {
if (key === childIndicator) {
cleanObj(obj[key], keysToKeep, childIndicator);
} else if (!keysToKeep.includes(key)) {
delete obj[key];
}
});
return obj;
};
 module.exports = cleanObj