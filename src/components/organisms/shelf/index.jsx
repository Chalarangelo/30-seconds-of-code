import PropTypes from 'typedefs/proptypes';
import Link from 'next/link';
import PreviewCard from 'components/molecules/previewCard';
import CollectionChip from 'components/atoms/collectionChip';
import PageTitle from 'components/atoms/pageTitle';
import literals from 'lang/en/client/common';

const propTypes = {
  shelf: PropTypes.shape({
    shelfData: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.snippet),
      PropTypes.arrayOf(PropTypes.chip),
    ]),
    shelfType: PropTypes.oneOf(['snippets', 'collections']),
    shelfName: PropTypes.string,
    shelfUrl: PropTypes.string,
  }),
};

/**
 * Renders a shelf of snippets or chips.
 * Dependent on the `PreviewCard` and `CollectionChip` components.
 */
const Shelf = ({ shelf: { shelfType, shelfData, shelfName, shelfUrl } }) => {
  const classPrefix = `${shelfType}-shelf`;
  return shelfData.length ? (
    <>
      <Link href={shelfUrl}>
        <a
          className={`shelf-title relative mt-8 icon icon-chevron-right before:fs-sm`}
          data-link-title={literals.viewAll}
        >
          <PageTitle>{shelfName}</PageTitle>
        </a>
      </Link>
      <ul className={`list-section ${classPrefix}-list`}>
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
    </>
  ) : null;
};

Shelf.propTypes = propTypes;

export default Shelf;
