import SearchPage from 'components/templates/searchPage';

export async function getStaticProps() {
  return await import('../next/utils').then(({ getStaticPageProps }) =>
    getStaticPageProps('search')
  );
}

export default SearchPage;
