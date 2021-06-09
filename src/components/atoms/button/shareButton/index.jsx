import { useState, useEffect } from 'react';
import PropTypes from 'typedefs/proptypes';
import { useGtagEvent } from 'components/hooks';
import literals from 'lang/en/client/common';

const propTypes = {
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
};

/**
 * Button that shares the given page to clipboard.
 */
const ShareButton = ({ pageTitle, pageDescription }) => {
  const gtagCallback = useGtagEvent('click');
  const [canShare, setCanShare] = useState(false);
  useEffect(() => {
    if (navigator && navigator.share) setCanShare(true);
  }, []);

  if (!canShare) return null;

  return (
    <button
      className='btn action-btn fs-no md:fs-sm icon icon-share'
      title={literals.share}
      onClick={() => {
        // eslint-disable-next-line camelcase
        gtagCallback({ event_category: 'action-share', value: 1 });
        try {
          navigator.share({
            title: pageTitle,
            text: pageDescription,
            url: document.querySelector('link[rel=canonical]').href,
          });
        } catch (err) {
          // display error message or feedback microinteraction
        }
      }}
    />
  );
};

ShareButton.propTypes = propTypes;

export default ShareButton;
