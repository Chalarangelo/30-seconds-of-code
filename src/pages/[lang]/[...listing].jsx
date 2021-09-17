import ListingPage from 'components/templates/listingPage';

export async function getStaticPaths() {
  return await import('../../next/utils')
    .then(({ getPageTypePaths }) => {
      return getPageTypePaths('ListingPage');
    })
    .then(pages => ({
      paths: pages
        .filter(p => p.relRoute !== '/collections')
        .map(p => {
          const [lang, ...listing] = p.relRoute.split('/').filter(Boolean);

          return {
            params: {
              lang,
              listing,
            },
          };
        }),
      fallback: false,
    }));
}

export async function getStaticProps({ params }) {
  const filePath = `${params.lang}/${params.listing.join('/')}`;
  return await import('../../next/utils').then(({ getDynamicPageProps }) =>
    getDynamicPageProps(filePath)
  );
}

export default ListingPage;
