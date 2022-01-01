import { promises as fs } from 'fs';
import path from 'path';

import SnippetPage from 'components/templates/snippetPage';

export async function getStaticPaths() {
  const pagePath = path.join(
    process.cwd(),
    '.content',
    'pages',
    '[lang]',
    's',
    '[snippet].json'
  );
  const pageData = await fs.readFile(pagePath, 'utf8').then(JSON.parse);
  const paths = Object.keys(pageData).map(key => {
    const segments = key.split('/');
    return {
      params: {
        lang: segments[0],
        snippet: segments.slice(-1)[0],
      },
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const pagePath = path.join(
    process.cwd(),
    '.content',
    'pages',
    '[lang]',
    's',
    '[snippet].json'
  );
  const pageData = await fs.readFile(pagePath, 'utf8').then(JSON.parse);
  const pageUrl = `${params.lang}/s/${params.snippet}`;
  return { props: pageData[pageUrl].context };
}

export default SnippetPage;
