'use strict';

const { createReadStream } = require('fs');
const { join } = require('path');

const clientBasePath = join(__dirname, '..', '..', 'client');

function routes(app, middleware, options) {
  app.get('/__webpack_dev_server__/live.bundle.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');

    createReadStream(join(clientBasePath, 'live.bundle.js')).pipe(res);
  });

  app.get('/__webpack_dev_server__/sockjs.bundle.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');

    createReadStream(join(clientBasePath, 'sockjs.bundle.js')).pipe(res);
  });

  app.get('/webpack-dev-server.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');

    createReadStream(join(clientBasePath, 'index.bundle.js')).pipe(res);
  });

  app.get('/webpack-dev-server/*', (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    createReadStream(join(clientBasePath, 'live.html')).pipe(res);
  });

  app.get('/webpack-dev-server', (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    res.write(
      '<!DOCTYPE html><html><head><meta charset="utf-8"/></head><body>'
    );

    const outputPath = middleware.getFilenameFromUrl(options.publicPath || '/');
    const filesystem = middleware.fileSystem;

    writeDirectory(options.publicPath || '/', outputPath);

    res.end('</body></html>');

    function writeDirectory(baseUrl, basePath) {
      const content = filesystem.readdirSync(basePath);

      res.write('<ul>');

      content.forEach((item) => {
        const p = `${basePath}/${item}`;

        if (filesystem.statSync(p).isFile()) {
          res.write(`<li><a href="${baseUrl + item}">${item}</a></li>`);

          if (/\.js$/.test(item)) {
            const html = item.substr(0, item.length - 3);
            const containerHref = baseUrl + html;

            const magicHtmlHref =
              baseUrl.replace(
                // eslint-disable-next-line
                /(^(https?:\/\/[^\/]+)?\/)/,
                '$1webpack-dev-server/'
              ) + html;

            res.write(
              `<li><a href="${containerHref}">${html}</a>` +
                ` (magic html for ${item}) (<a href="${magicHtmlHref}">webpack-dev-server</a>)` +
                `</li>`
            );
          }
        } else {
          res.write(`<li>${item}<br>`);

          writeDirectory(`${baseUrl + item}/`, p);

          res.write('</li>');
        }
      });

      res.write('</ul>');
    }
  });
}

module.exports = routes;
