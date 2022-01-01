import { promises as fs } from 'fs';
import path from 'path';

import NotFoundPage from 'components/templates/notFoundPage';

export async function getStaticProps() {
  const pagePath = path.join(process.cwd(), '.content', 'pages', '404.json');
  const pageData = await fs.readFile(pagePath, 'utf8').then(JSON.parse);
  return { props: pageData.context };
}

export default NotFoundPage;
