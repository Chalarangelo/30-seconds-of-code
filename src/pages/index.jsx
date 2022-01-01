import { promises as fs } from 'fs';
import path from 'path';

import HomePage from 'components/templates/homePage';

export async function getStaticProps() {
  const pagePath = path.join(process.cwd(), '.content', 'pages', 'index.json');
  const pageData = await fs.readFile(pagePath, 'utf8').then(JSON.parse);
  return { props: pageData.context };
}

export default HomePage;
