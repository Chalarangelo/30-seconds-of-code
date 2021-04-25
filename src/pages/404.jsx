import NotFoundPage from 'components/templates/notFoundPage';

export async function getStaticProps() {
  return await import('../next/utils').then(({ getStaticPageProps }) =>
    getStaticPageProps('404')
  );
}

export default NotFoundPage;
