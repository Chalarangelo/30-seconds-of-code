import Link from 'next/link';
import PreviewCard from 'components/molecules/previewCard';
import CollectionChip from 'components/atoms/collectionChip';
import PageTitle from 'components/atoms/pageTitle';

/**
 * Renders a shelf of snippets or chips.
 * Dependent on the `PreviewCard` and `CollectionChip` components.
 */
const Shelf = ({ shelf: { shelfType, shelfData, shelfName, shelfUrl } }) => {
  return shelfData.length ? (
    <div className={shelfType === 'snippets' ? 'g-c2' : 'g-c1'}>
      <Link href={shelfUrl}>
        <a className='shelf-title relative mt-8'>
          <PageTitle>{shelfName}</PageTitle>
        </a>
      </Link>
      <ul className={`list-section ${shelfType}-shelf-list`}>
        {/* eslint-disable react/jsx-indent */}
        {shelfType === 'snippets'
          ? shelfData.map(snippet => (
              <PreviewCard
                key={`snippet_${snippet.url}`}
                contentItem={snippet}
              />
            ))
          : shelfData.map(chip => (
              <CollectionChip key={`chip_${chip.url}`} chip={chip} />
            ))}
        {/* eslint-enable react/jsx-indent */}
      </ul>
    </div>
  ) : null;
};

export default Shelf;
