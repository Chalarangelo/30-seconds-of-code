import { promises as fs } from 'fs';
import path from 'path';

import SearchPage from 'components/templates/searchPage';

export async function getStaticProps() {
  const pagePath = path.join(process.cwd(), '.content', 'pages', 'search.json');
  const pageData = await fs.readFile(pagePath, 'utf8').then(JSON.parse);
  return { props: pageData.context };
}

export default SearchPage;
