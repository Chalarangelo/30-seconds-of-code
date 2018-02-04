const zipObject = (props, values) =>
props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {});
module.exports = zipObject;