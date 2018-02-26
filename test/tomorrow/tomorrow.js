const tomorrow = () => {
let t = new Date();
t.setDate(t.getDate() + 1);
return `${String(t.getMonth() + 1).padStart(2, '0')}-${String(
t.getDate()
).padStart(2, '0')}-${t.getFullYear()}`;
};
module.exports = tomorrow;