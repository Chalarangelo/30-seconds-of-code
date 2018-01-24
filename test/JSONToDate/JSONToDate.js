const JSONToDate = arr => {
const dt = new Date(parseInt(arr.toString().substr(6)));
return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
};
module.exports = JSONToDate