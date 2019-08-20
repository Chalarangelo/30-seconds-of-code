'use strict';

const url = require('url');
const tunnelAgent = require('tunnel-agent');

const is = require('./is');

const proxies = [
  'HTTPS_PROXY',
  'https_proxy',
  'HTTP_PROXY',
  'http_proxy',
  'npm_config_https_proxy',
  'npm_config_proxy'
];

function env (key) {
  return process.env[key];
}

module.exports = function () {
  try {
    const proxy = url.parse(proxies.map(env).find(is.string));
    const tunnel = proxy.protocol === 'https:'
      ? tunnelAgent.httpsOverHttps
      : tunnelAgent.httpsOverHttp;
    return tunnel({
      proxy: {
        port: Number(proxy.port),
        host: proxy.hostname,
        proxyAuth: proxy.auth
      }
    });
  } catch (err) {
    return null;
  }
};
