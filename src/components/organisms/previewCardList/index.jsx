import PropTypes from 'typedefs/proptypes';
import PreviewCard from 'components/molecules/previewCard';

const propTypes = {
  contentItems: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.snippet, PropTypes.chip])
  ),
};

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

PreviewCardList.propTypes = propTypes;

export default PreviewCardList;
