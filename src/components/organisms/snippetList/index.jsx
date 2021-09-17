import PropTypes from 'typedefs/proptypes';
import Paginator from 'components/molecules/paginator';
import PageTitle from 'components/atoms/pageTitle';
import Image from 'components/atoms/image';
import PreviewCardList from 'components/organisms/previewCardList';
import ListingAnchors from 'components/atoms/listingAnchors';

const propTypes = {
  snippetList: PropTypes.arrayOf(PropTypes.snippet),
  paginator: PropTypes.paginator,
  listingName: PropTypes.string,
  listingDescription: PropTypes.string,
  listingImage: PropTypes.string,
  listingSublinks: PropTypes.arrayOf(PropTypes.shape({})),
};

/**
 * Renders a list of snippets along with necessary controls.
 * Used in listing page.
 * Dependent on multiple components.
 */
const SnippetList = ({
  snippetList,
  paginator = null,
  listingName,
  listingDescription = '',
  listingImage = '',
  listingSublinks = [],
}) => {
  const hasImageOrDescription = Boolean(listingImage || listingDescription);

  return snippetList.length ? (
    <>
      {!hasImageOrDescription ? (
        <PageTitle>{listingName}</PageTitle>
      ) : (
        <div
          className={`snippet-list-header ${listingImage ? 'with-image' : ''}`}
        >
          {listingImage ? (
            <div className='snippet-list-splash-image my-2 mx-3.5 f-center'>
              <Image src={listingImage} alt='' height='360' width='360' />
            </div>
          ) : null}
          <div>
            <PageTitle>{listingName}</PageTitle>
            {listingDescription ? (
              <p className='snippet-list-description mt-4 mx-3.5 mb-2 txt-100'>
                {listingDescription}
              </p>
            ) : null}
          </div>
        </div>
      )}
      {listingSublinks.length ? (
        <ListingAnchors items={listingSublinks} />
      ) : null}
      <PreviewCardList contentItems={snippetList} />
      {paginator ? <Paginator paginator={paginator} /> : null}
    </>
  ) : null;
};

SnippetList.propTypes = propTypes;

export default SnippetList;
