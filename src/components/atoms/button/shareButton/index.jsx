import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { Button } from 'components/atoms/button';
import literals from 'lang/en/client/common';

const propTypes = {
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
};

/**
 * Generic button component.
 */
const ShareButton = ({
  pageTitle,
  pageDescription,
}) => {
  const [canShare, setCanShare] = React.useState(false);
  React.useEffect(() => {
    if (navigator && navigator.share) setCanShare(true);
  }, []);

  if (!canShare) return null;

  return (
    <Button
      className='share-btn icon icon-share'
      title={ literals.share }
      onClick={ () => {
        try {
          navigator.share({
            title: pageTitle,
            text: pageDescription,
            url: document.querySelector('link[rel=canonical]').href,
          });
        } catch (err) {
          // display error message or feedback microinteraction
        }
      } }
    >
      { literals.share }
    </Button>
  );
};

ShareButton.propTypes = propTypes;

export default ShareButton;
