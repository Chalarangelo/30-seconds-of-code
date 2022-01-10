import { promises as fs } from 'fs';
import path from 'path';

import NotFoundPage from 'components/templates/notFoundPage';

const pagePath = path.join(process.cwd(), '.content', 'pages', '404.json');

export async function getStaticProps() {
  return await fs.readFile(pagePath, 'utf8').then(JSON.parse);
}

export default NotFoundPage;
