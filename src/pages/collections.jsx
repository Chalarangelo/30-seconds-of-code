import { promises as fs } from 'fs';
import path from 'path';

import ListingPage from 'components/templates/listingPage';

const pagePath = path.join(
  process.cwd(),
  '.content',
  'pages',
  'collections.json'
);

export async function getStaticProps() {
  return await fs.readFile(pagePath, 'utf8').then(JSON.parse);
}

export default ListingPage;
