import { promises as fs } from 'fs';
import path from 'path';

import StaticPage from 'components/templates/staticPage';

export async function getStaticProps() {
  const pagePath = path.join(process.cwd(), '.content', 'pages', 'about.json');
  const pageData = await fs.readFile(pagePath, 'utf8').then(JSON.parse);
  return { props: pageData.context };
}

export default StaticPage;
