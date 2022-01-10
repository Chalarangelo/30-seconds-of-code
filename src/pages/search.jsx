import { promises as fs } from 'fs';
import path from 'path';

import SearchPage from 'components/templates/searchPage';

const pagePath = path.join(process.cwd(), '.content', 'pages', 'search.json');

export async function getStaticProps() {
  return await fs.readFile(pagePath, 'utf8').then(JSON.parse);
}

export default SearchPage;
