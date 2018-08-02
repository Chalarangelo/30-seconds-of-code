const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;

module.exports = isTravisCI;