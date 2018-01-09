module.exports = (arr, listID) =>
arr.map(item => (document.querySelector('#' + listID).innerHTML += `<li>${item}</li>`));