import { promises as fs } from 'fs';
import path from 'path';

import StaticPage from 'components/templates/staticPage';

const pagePath = path.join(process.cwd(), '.content', 'pages', 'cookies.json');

export async function getStaticProps() {
  return await fs.readFile(pagePath, 'utf8').then(JSON.parse);
}

export default StaticPage;
