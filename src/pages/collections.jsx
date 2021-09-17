import ListingPage from 'components/templates/listingPage';

export async function getStaticProps() {
  return await import('../next/utils').then(({ getStaticPageProps }) =>
    getStaticPageProps('collections')
  );
}

export default ListingPage;
