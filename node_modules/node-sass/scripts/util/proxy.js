
/**
 * Determine the proxy settings configured by npm
 *
 * It's possible to configure npm to use a proxy different
 * from the system defined proxy. This can be done via the
 * `npm config` CLI or the `.npmrc` config file.
 *
 * If a proxy has been configured in this way we must
 * tell request explicitly to use it.
 *
 * Otherwise we can trust request to the right thing.
 *
 * @return {String} the proxy configured by npm or an empty string
 * @api private
 */
module.exports = function() {
  return process.env.npm_config_https_proxy ||
    process.env.npm_config_proxy ||
    process.env.npm_config_http_proxy ||
    '';
};
