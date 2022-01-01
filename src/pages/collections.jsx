import { promises as fs } from 'fs';
import path from 'path';

import ListingPage from 'components/templates/listingPage';

export async function getStaticProps() {
  const pagePath = path.join(
    process.cwd(),
    '.content',
    'pages',
    'collections.json'
  );
  const pageData = await fs.readFile(pagePath, 'utf8').then(JSON.parse);
  return { props: pageData.context };
}

export default ListingPage;
