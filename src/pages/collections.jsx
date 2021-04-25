import CollectionsPage from 'components/templates/collectionsPage';

export async function getStaticProps() {
  return await import('../next/utils').then(({ getStaticPageProps }) =>
    getStaticPageProps('collections')
  );
}

export default CollectionsPage;
