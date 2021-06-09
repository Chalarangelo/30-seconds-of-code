import { useState, useEffect } from 'react';
import PropTypes from 'typedefs/proptypes';
import { useGtagEvent } from 'components/hooks';
import copyToClipboard from 'copy-to-clipboard';
import { combineClassNames } from 'utils';
import literals from 'lang/en/client/common';

const propTypes = {
  text: PropTypes.string.isRequired,
};

/**
 * Button that copies the given text to clipboard.
 * Dependent on `copy-to-clipboard` external module.
 * @param {string} text - Text to be copied when the button is clicked.
 */
const CopyButton = ({ text }) => {
  const gtagCallback = useGtagEvent('click');
  const [active, setActive] = useState(false);
  const [copying, setCopying] = useState(false);

  // If `copying` is `true`, then play the activation animation.
  useEffect(() => {
    if (!copying) return;
    copyToClipboard(text);
    setTimeout(() => setActive(true), 100);
    setTimeout(() => setActive(false), 750);
  }, [copying]);

  // If `active` is `false`, set `copying` to false (finished activation animation).
  useEffect(() => {
    if (active) return;
    setCopying(false);
  }, [active]);

  return (
    <button
      className={combineClassNames`btn action-btn fs-no md:fs-sm icon ${
        active ? 'icon-check active' : 'icon-clipboard'
      }`}
      title={literals.copyToClipboard}
      onClick={() => {
        // eslint-disable-next-line camelcase
        gtagCallback({ event_category: 'action-copy', value: 1 });
        setCopying(true);
      }}
    />
  );
};

CopyButton.propTypes = propTypes;

export default CopyButton;
