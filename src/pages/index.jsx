import HomePage from 'components/templates/homePage';

export async function getStaticProps() {
  return await import('../next/utils').then(({ getStaticPageProps }) =>
    getStaticPageProps('home')
  );
}

export default HomePage;
