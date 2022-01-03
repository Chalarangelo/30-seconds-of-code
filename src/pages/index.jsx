import { promises as fs } from 'fs';
import path from 'path';

import HomePage from 'components/templates/homePage';

const pagePath = path.join(process.cwd(), '.content', 'pages', 'index.json');

export async function getStaticProps() {
  return await fs.readFile(pagePath, 'utf8').then(JSON.parse);
}

export default HomePage;
