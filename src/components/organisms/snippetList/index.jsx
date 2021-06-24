import PropTypes from 'typedefs/proptypes';
import Paginator from 'components/molecules/paginator';
import PageTitle from 'components/atoms/pageTitle';
import PreviewCard from 'components/molecules/previewCard';
import ListingAnchors from 'components/atoms/listingAnchors';

const propTypes = {
  snippetList: PropTypes.arrayOf(PropTypes.snippet),
  paginator: PropTypes.paginator,
  listingName: PropTypes.string,
  listingDescription: PropTypes.string,
  listingImage: PropTypes.string,
  listingType: PropTypes.string,
  listingSublinks: PropTypes.arrayOf(PropTypes.shape({})),
};

/**
 * Renders a list of snippets along with necessary controls.
 * Used in listing page.
 * Dependent on multiple components.
 */
const SnippetList = ({
  snippetList,
  paginator,
  listingName,
  listingDescription = '',
  listingImage = '',
  listingType,
  listingSublinks = [],
}) => {
  /* istanbul ignore next */
  const isMainOrListing = listingType === 'main';

  return snippetList.length ? (
    <>
      {isMainOrListing ? (
        <PageTitle>{listingName}</PageTitle>
      ) : (
        <>
          <div
            className={`snippet-list-header ${
              listingImage ? 'with-image' : ''
            }`}
          >
            {listingImage ? (
              <div className='snippet-list-splash-image'>
                <picture>
                  <source
                    type='image/webp'
                    srcSet={`${listingImage.slice(
                      0,
                      listingImage.lastIndexOf('.')
                    )}.webp`}
                  />
                  <img src={listingImage} alt='' height='360' width='360' />
                </picture>
              </div>
            ) : null}
            <div>
              <PageTitle>{listingName}</PageTitle>
              {listingDescription && listingDescription.length ? (
                <p className='snippet-list-description txt-100'>
                  {listingDescription}
                </p>
              ) : null}
            </div>
          </div>
          {listingSublinks.length ? (
            <ListingAnchors items={listingSublinks} />
          ) : null}
        </>
      )}
      <ul className='list-section'>
        {snippetList.map(snippet => (
          <PreviewCard key={`snippet_${snippet.url}`} snippet={snippet} />
        ))}
      </ul>
      <Paginator paginator={paginator} />
    </>
  ) : null;
};

SnippetList.propTypes = propTypes;

export default SnippetList;
