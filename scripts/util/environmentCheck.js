// Checks if current environment is Travis CI, Cron builds, API builds
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;
const isTravisCronOrAPI = () =>
  process.env['TRAVIS_EVENT_TYPE'] === 'cron' ||
  process.env['TRAVIS_EVENT_TYPE'] === 'api';
const isNotTravisCronOrAPI = () => !isTravisCronOrAPI();

module.exports = {
  isTravisCI,
  isTravisCronOrAPI,
  isNotTravisCronOrAPI,
};
