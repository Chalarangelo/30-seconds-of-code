import Meta from 'components/organisms/meta';
import Shell from 'components/organisms/shell';
import Shelf from 'components/organisms/shelf';

/**
 * Renders the home page.
 * Used to render the / page (home).
 */
const HomePage = ({ shelves, pageDescription }) => {
  return (
    <>
      <Meta
        title={''}
        description={pageDescription}
        canonical={'/'}
        structuredData={{
          type: 'home',
        }}
      />
      <Shell>
        {shelves.map(s => (
          <Shelf shelf={s} key={`shelf_${s.shelfType}.${s.shelfUrl}`} />
        ))}
      </Shell>
    </>
  );
};

export default HomePage;
