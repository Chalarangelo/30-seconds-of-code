import PreviewCard from 'components/molecules/previewCard';

/**
 * Renders a list of preview cards.
 * Dependent on the `PreviewCard` component.
 */
const PreviewCardList = ({ contentItems, fromParam }) => (
  <ul className='list-section'>
    {contentItems.map(contentItem => (
      <PreviewCard
        key={`preview_${contentItem.url}`}
        contentItem={contentItem}
        fromParam={fromParam}
      />
    ))}
  </ul>
);

export default PreviewCardList;
