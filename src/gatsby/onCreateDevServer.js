import { execSync } from 'child_process';
import bodyParser from 'body-parser';
import { convertToSeoSlug } from 'utils';

/**
 * When called, allows modifying the development Express server.
 * API docs: https://www.gatsbyjs.org/docs/node-apis/#onCreateDevServer
 */
const onCreateDevServer = ({ app }) => {
  app.use(bodyParser.json());
  app.post('/create', (req, res) => {
    const { dirName, snippetName, slugPrefix } = req.body;
    execSync(`cd ./content/sources/${dirName.slice(0, dirName.lastIndexOf('/'))}; ../../../node_modules/@30-seconds/integration-tools/bin/newSnippet.js ${snippetName}`);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ url: `${slugPrefix}${convertToSeoSlug(snippetName)}` }));
  });
};

export default onCreateDevServer;
// /home/achalaris/personal/30-seconds-web/content/sources/30blog/blog_posts/testing-farts.md
