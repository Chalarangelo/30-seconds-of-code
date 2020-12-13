import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { useGtagEvent } from 'components/hooks';
import { Button } from 'components/atoms/button';
import literals from 'lang/en/client/common';

const propTypes = {
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
};

/**
 * Generic button component.
 */
const ShareButton = ({ pageTitle, pageDescription }) => {
  const gtagCallback = useGtagEvent('click');
  const [canShare, setCanShare] = React.useState(false);
  React.useEffect(() => {
    if (navigator && navigator.share) setCanShare(true);
  }, []);

  if (!canShare) return null;

  return (
    <Button
      className='share-btn icon icon-share'
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
    >
      {literals.share}
    </Button>
  );
};

ShareButton.propTypes = propTypes;

export default ShareButton;
