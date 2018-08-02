const elementContains = (parent, child) => parent !== child && parent.contains(child);

module.exports = elementContains;