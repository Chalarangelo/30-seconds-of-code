/* eslint-disable max-len */

module.exports = {
  ERR_CONFIG_FACTORY_TARGET_MISSING:
    '[HPM] Missing "target" option. Example: {target: "http://www.example.org"}',
  ERR_CONTEXT_MATCHER_GENERIC:
    '[HPM] Invalid context. Expecting something like: "/api" or ["/api", "/ajax"]',
  ERR_CONTEXT_MATCHER_INVALID_ARRAY:
    '[HPM] Invalid context. Expecting something like: ["/api", "/ajax"] or ["/api/**", "!**.html"]',
  ERR_PATH_REWRITER_CONFIG:
    '[HPM] Invalid pathRewrite config. Expecting object with pathRewrite config or a rewrite function'
}
