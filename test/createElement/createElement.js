module.exports = createElement = str => {
const el = document.createElement('div');
el.innerHTML = str;
return el.firstElementChild;
};