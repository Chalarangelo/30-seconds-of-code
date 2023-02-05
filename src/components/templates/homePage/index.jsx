import Link from 'next/link';
import Meta from 'components/organisms/meta';
import Shell from 'components/organisms/shell';
import PageTitle from 'components/atoms/pageTitle';
import PreviewCardList from 'components/organisms/previewCardList';
import ListingChips from 'components/atoms/listingChips';
import Image from 'components/atoms/image';

/**
 * Renders the home page.
 * Used to render the / page (home).
 */
const HomePage = ({
  featuredCollections,
  featuredSnippets,
  snippetListUrl,
  stringLiterals,
  splashImage,
  pageDescription,
  structuredData,
}) => {
  return (
    <>
      <Meta
        title={''}
        description={pageDescription}
        canonical={'/'}
        structuredData={structuredData}
      />
      <Shell>
        <div className='snippet-list-header g-c1'>
          <div className='snippet-list-splash-image my-2 mx-3.5 f-center'>
            <Image
              src={splashImage}
              alt=''
              height='240'
              width='240'
              fetchpriority='high'
              className='br-md'
            />
          </div>
          <div>
            <PageTitle>{stringLiterals.tagline}</PageTitle>
            <p className='snippet-list-description mt-4 mx-3.5 mb-2 txt-100 fs-sm md:fs-md'>
              {stringLiterals.browseByCollection}
            </p>
          </div>
        </div>
        <ListingChips items={featuredCollections} />
        <div className='g-c3 mb-8'>
          <Link href={snippetListUrl}>
            <a className='inline-block no-animation relative mt-8'>
              <PageTitle>{stringLiterals.featuredSnippets}</PageTitle>
            </a>
          </Link>
          <PreviewCardList contentItems={featuredSnippets} />
        </div>
      </Shell>
    </>
  );
};

export default HomePage;
