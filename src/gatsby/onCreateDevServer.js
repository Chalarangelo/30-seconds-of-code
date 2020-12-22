import fs from 'fs-extra';
import bodyParser from 'body-parser';
import { convertToSeoSlug } from 'utils';

const createNewSnippet = (dirName, snippetName) => {
  const template = fs.readFileSync(`${dirName}/snippet-template.md`, 'utf8');
  const snippetDirectory = fs.existsSync(`${dirName}/blog_posts`)
    ? 'blog_posts'
    : 'snippets';
  fs.ensureDirSync(`${dirName}/${snippetDirectory}`);
  const fileData = template.replace(/title:\s*.*\n/, `title: ${snippetName}\n`);
  fs.writeFileSync(
    `${dirName}/${snippetDirectory}/${snippetName}.md`,
    fileData
  );
};

/**
 * When called, allows modifying the development Express server.
 * API docs: https://www.gatsbyjs.org/docs/node-apis/#onCreateDevServer
 */
const onCreateDevServer = ({ app }) => {
  app.use(bodyParser.json());
  app.post('/create', (req, res) => {
    const { dirName, snippetName, slugPrefix } = req.body;
    createNewSnippet(
      `./content/sources/${dirName.slice(0, dirName.lastIndexOf('/'))}`,
      snippetName
    );
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({ url: `${slugPrefix}${convertToSeoSlug(snippetName)}` })
    );
  });
};

export default onCreateDevServer;
