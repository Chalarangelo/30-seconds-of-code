'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react-hot-loader.production.min.js');
} else if (process.env.NODE_ENV === 'test') {
  module.exports = require('./dist/react-hot-loader.production.min.js');
} else if (typeof window === 'undefined') {
  // this is just server environment
  module.exports = require('./dist/react-hot-loader.production.min.js');
} else if (!module.hot) {
  module.exports = require('./dist/react-hot-loader.production.min.js');
  module.exports.AppContainer.warnAboutHMRDisabled = true;
  module.exports.hot.shouldWrapWithAppContainer = true;
} else {
  var evalAllowed = false;
  try {
    eval('evalAllowed = true');
  } catch (e) {
    // eval not allowed due to CSP
  }

  // RHL needs setPrototypeOf to operate Component inheritance, and eval to patch methods
  var jsFeaturesPresent = !!Object.setPrototypeOf;

  if (!jsFeaturesPresent || !evalAllowed) {
    // we are not in prod mode, but RHL could not be activated
    console.warn('React-Hot-Loader is not supported in this environment.');
    module.exports = require('./dist/react-hot-loader.production.min.js');
  } else {
    module.exports = window.reactHotLoaderGlobal = require('./dist/react-hot-loader.development.js');
  }
}
