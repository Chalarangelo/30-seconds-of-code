import { promises as fs } from 'fs';
import path from 'path';

import SnippetPage from 'components/templates/snippetPage';

const pagePath = path.join(
  process.cwd(),
  '.content',
  'pages',
  '[lang]',
  's',
  '[snippet].json'
);

export async function getStaticPaths() {
  const pageData = await fs.readFile(pagePath, 'utf8').then(JSON.parse);
  const paths = Object.values(pageData).map(({ params }) => ({ params }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const pageData = await fs.readFile(pagePath, 'utf8').then(JSON.parse);
  const pageUrl = `${params.lang}/s/${params.snippet}`;
  const { props } = pageData[pageUrl];
  return { props };
}

export default SnippetPage;
