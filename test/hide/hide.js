const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'));

module.exports = hide;