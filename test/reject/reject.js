const reject = (pred, array) => array.filter((...args) => !pred(...args));

module.exports = reject;