import Meta from 'components/organisms/meta';
import Shell from 'components/organisms/shell';
import Paginator from 'components/molecules/paginator';
import PageTitle from 'components/atoms/pageTitle';
import Image from 'components/atoms/image';
import PreviewCardList from 'components/organisms/previewCardList';
import ListingAnchors from 'components/atoms/listingAnchors';

/**
 * Renders a listing page.
 * Used to render the /list/p/1 page and any other listing pages.
 * Also used to render the /collections page.
 */
const ListingPage = ({
  slug,
  paginator = null,
  snippetList,
  listingName,
  listingDescription,
  listingImage,
  listingSublinks = [],
  pageDescription,
  structuredData,
}) => (
  <>
    <Meta
      title={listingName}
      description={pageDescription}
      structuredData={structuredData}
      canonical={slug}
    />
    <Shell>
      <div className='snippet-list-header g-c1'>
        <div className='snippet-list-splash-image my-2 mx-3.5 f-center'>
          <Image
            src={listingImage}
            alt=''
            height='360'
            width='360'
            fetchpriority='high'
          />
        </div>
        <div>
          <PageTitle>{listingName}</PageTitle>
          <p className='snippet-list-description mt-4 mx-3.5 mb-2 txt-100'>
            {listingDescription}
          </p>
        </div>
      </div>
      {listingSublinks.length ? (
        <ListingAnchors items={listingSublinks} />
      ) : null}
      <div className='g-c3'>
        <PreviewCardList contentItems={snippetList} />
        {paginator ? <Paginator paginator={paginator} /> : null}
      </div>
    </Shell>
  </>
);

export default ListingPage;
