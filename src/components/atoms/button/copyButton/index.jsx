import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { useGtagEvent } from 'components/hooks';
import copyToClipboard from 'copy-to-clipboard';
import { Button } from 'components/atoms/button';
import { combineClassNames } from 'utils';
import literals from 'lang/en/client/common';

const propTypes = {
  text: PropTypes.string.isRequired,
};

/**
 * Button that copies the given text to clipboard.
 * Dependent on the sibling `Button` (`RegularButton`) component.
 * Dependent on `copy-to-clipboard` external module.
 * @param {string} text - Text to be copied when the button is clicked.
 */
const CopyButton = ({
  text,
}) => {
  const gtagCallback = useGtagEvent('click');
  const [active, setActive] = React.useState(false);
  const [copying, setCopying] = React.useState(false);
  const [buttonText, setButtonText] = React.useState(literals.copyToClipboard);

  // If `copying` is `true`, then play the activation animation.
  React.useEffect(() => {
    if (!copying) return;
    copyToClipboard(text);
    setTimeout(() => setActive(true), 100);
    setTimeout(() => setActive(false), 750);
  }, [copying]);

  // If `active` is `false`, set `copying` to false (finished activation animation).
  React.useEffect(() => {
    if (active) return;
    setCopying(false);
    setButtonText(literals.copyToClipboard);
  }, [active]);

  return (
    <Button
      className={ combineClassNames`copy-btn icon ${active ? 'icon-check active' : 'icon-clipboard'}` }
      title={ literals.copyToClipboard }
      onClick={ () => {
        // eslint-disable-next-line camelcase
        gtagCallback({ event_category: 'action-copy', value: 1});
        setCopying(true);
        setButtonText(literals.copiedToClipboard);
      } }
    >
      { buttonText }
    </Button>
  );
};

CopyButton.propTypes = propTypes;

export default CopyButton;
