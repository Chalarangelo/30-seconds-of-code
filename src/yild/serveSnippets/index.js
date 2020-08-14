import http from 'http';
import fs from 'fs-extra';
import path from 'path';
import { initAction, loadContentConfigs } from '../core';
import { transformSnippetIndex, transformSnippetContext } from 'build/transformers';

const PORT = 7000;

const serveSnippets = () => {
  const [boundLog, , inPath, configsPath] = initAction('serveSnippets', [
    ['paths', 'contentPath'], ['paths', 'rawContentPath'],
  ]);
  boundLog('Serving snippets from generated JSON files...', 'info');

  const configSlugs = loadContentConfigs(configsPath, boundLog)
    .reduce((acc, cfg) => {
      acc[cfg.slug] = cfg.dirName;
      return acc;
    }, {});

  http.createServer((req, res) => {
    boundLog(`Processing request: ${req.url}`, 'info');
    // Set headers as necessary (Cross-origin etc.)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    const reqUrl = req.url.replace(/\/$/g, '');
    const reqSegments = reqUrl.split('/').filter(Boolean);
    const hasSuffix = reqUrl.toLowerCase().endsWith('.json');
    const repoSegment = hasSuffix ? configSlugs[reqSegments[0].slice(0, -5)] : configSlugs[reqSegments[0]];
    const filePath = path.resolve(`${inPath}/${repoSegment}${reqSegments === 1 && hasSuffix ? '' : '.json'}`);
    // TODO: Make more dynamic
    const cardTemplate = reqSegments[0].toLowerCase === 'blog'
      ? 'BlogSnippetCard'
      : reqSegments[0].toLowerCase === 'css'
        ? 'CssSnippetCard'
        : 'StandardSnippetCard';

    try {
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) throw err;
        else {
          try {
            const data = JSON.parse(content).data;

            switch (reqSegments.length) {
            case 1:
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(
                JSON.stringify(transformSnippetIndex(data.map(s => ({ node: s }))))
              );
              break;
            case 3: {
              const snippetData = data.find(
                s => s.slug === (hasSuffix ? reqUrl.toLowerCase().slice(0, -5) : reqUrl.toLowerCase())
              );
              if(!snippetData) throw 'Snippet does not exist';
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(transformSnippetContext(snippetData, cardTemplate)));
              break;
            }
            default:
              throw 'Invalid path';
            }
          } catch(e) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 404, error: e }));
            boundLog(`Encountered an error while processing ${req.url}`, 'error');
            boundLog(`${e}`, 'error');
          }
        }
      });
    } catch(e) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 404, error: e }));
      boundLog(`Encountered an error while processing ${req.url}`, 'error');
      boundLog(`${e}`, 'error');
    }
    boundLog(`Finished processing request: ${req.url}`, 'success');
  }).listen(PORT);

  boundLog(`Server running at http://127.0.0.1:${PORT}/`, 'success');

  return new Promise(resolve => {
    process.on('SIGINT', () => {
      console.log();
      boundLog('Received SIGINT. Server shutting down...', 'info');
      resolve();
      process.exit();
    });
  });
};

export default serveSnippets;
