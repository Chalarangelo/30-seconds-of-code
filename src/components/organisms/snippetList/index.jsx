import PropTypes from 'typedefs/proptypes';
import Paginator from 'components/molecules/paginator';
import PageTitle from 'components/atoms/pageTitle';
import PreviewCard from 'components/molecules/previewCard';
import ListingAnchors from 'components/molecules/listingAnchors';
import combineClassNames from '@chalarangelo/combine-class-names';

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
        <>
          <PageTitle>{listingName}</PageTitle>
        </>
      ) : (
        <>
          <div
            className={combineClassNames`snippet-list-header ${
              listingImage ? 'with-image' : ''
            }`}
          >
            {listingImage ? (
              <img
                className='snippet-list-splash-image'
                src={listingImage}
                alt=''
                height='360'
                width='360'
              />
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
          <div className='snippet-list-controls a-center'>
            {listingSublinks.length ? (
              <ListingAnchors items={listingSublinks} />
            ) : null}
          </div>
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
