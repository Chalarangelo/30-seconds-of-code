module.exports = (props, values) =>
props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {});