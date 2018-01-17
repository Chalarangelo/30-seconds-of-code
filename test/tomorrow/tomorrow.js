const tomorrow = () => new Date(new Date().getTime() + 86400000).toISOString().split('T')[0];
 module.exports = tomorrow