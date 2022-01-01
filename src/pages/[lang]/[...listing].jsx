import { promises as fs } from 'fs';
import path from 'path';

import ListingPage from 'components/templates/listingPage';

export async function getStaticPaths() {
  const pagePath = path.join(
    process.cwd(),
    '.content',
    'pages',
    '[lang]',
    '[...listing].json'
  );
  const pageData = await fs.readFile(pagePath, 'utf8').then(JSON.parse);
  const paths = Object.keys(pageData).map(key => {
    const [lang, ...listing] = key.split('/');
    return { params: { lang, listing } };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const pagePath = path.join(
    process.cwd(),
    '.content',
    'pages',
    '[lang]',
    '[...listing].json'
  );
  const pageData = await fs.readFile(pagePath, 'utf8').then(JSON.parse);
  const pageUrl = `${params.lang}/${params.listing.join('/')}`;
  return { props: pageData[pageUrl].context };
}

export default ListingPage;
