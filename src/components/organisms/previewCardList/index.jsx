import PreviewCard from 'components/molecules/previewCard';

/**
 * Renders a list of preview cards.
 * Dependent on the `PreviewCard` component.
 */
const PreviewCardList = ({ contentItems }) => (
  <ul className='list-section'>
    {contentItems.map(contentItem => (
      <PreviewCard
        key={`preview_${contentItem.url}`}
        contentItem={contentItem}
      />
    ))}
  </ul>
);

export default PreviewCardList;
