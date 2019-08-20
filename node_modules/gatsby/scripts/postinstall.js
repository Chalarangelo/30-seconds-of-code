try {
  const getLatestAPIs = require('../dist/utils/get-latest-apis')
  getLatestAPIs()
} catch (e) {
  // we're probably just bootstrapping and not published yet!
}
