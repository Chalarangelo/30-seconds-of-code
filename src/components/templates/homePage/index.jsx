import PropTypes from 'typedefs/proptypes';
import Meta from 'components/organisms/meta';
import Shell from 'components/organisms/shell';
import Shelf from 'components/organisms/shelf';

const propTypes = {
  pageDescription: PropTypes.string.isRequired,
  shelves: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['snippets', 'collections']),
      shelfName: PropTypes.string,
      shelfUrl: PropTypes.string,
      snippetList: PropTypes.arrayOf(PropTypes.snippet),
      chipList: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
          name: PropTypes.string,
          icon: PropTypes.string,
        })
      ),
    })
  ),
};

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

HomePage.propTypes = propTypes;

export default HomePage;
