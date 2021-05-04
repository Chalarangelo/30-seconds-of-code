import SnippetPage from 'components/templates/snippetPage';

export async function getStaticPaths() {
  return await import('../../../next/utils')
    .then(({ getPageTypePaths }) => {
      return getPageTypePaths('SnippetPage');
    })
    .then(pages => ({
      paths: pages.map(p => {
        const segments = p.relRoute.split('/').filter(Boolean);

        return {
          params: {
            lang: segments[0],
            snippet: segments.slice(-1)[0],
          },
        };
      }),
      fallback: false,
    }));
}

export async function getStaticProps({ params }) {
  const filePath = `${params.lang}/s/${params.snippet}`;
  return await import('../../../next/utils').then(({ getDynamicPageProps }) =>
    getDynamicPageProps(filePath)
  );
}

export default SnippetPage;
