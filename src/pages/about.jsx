import StaticPage from 'components/templates/staticPage';

export async function getStaticProps() {
  return await import('../next/utils').then(({ getStaticPageProps }) =>
    getStaticPageProps('about')
  );
}

export default StaticPage;
