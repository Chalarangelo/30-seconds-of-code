const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
module.exports = getStyle;
