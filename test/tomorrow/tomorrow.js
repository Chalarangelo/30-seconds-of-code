const tomorrow = () => {
let t = new Date();
t.setDate(t.getDate() + 1);
return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(
t.getDate()
).padStart(2, '0')}`;
};
module.exports = tomorrow