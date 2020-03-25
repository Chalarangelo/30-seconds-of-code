import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/atoms/button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { trimWhiteSpace } from 'functions/utils';
import literals from 'lang/en/client/common';

/**
 * Button that copies the given text to clipboard.
 * Depends on react-copy-to-clipboard.
 */
const CopyButton = ({
  text,
}) => {
  const [active, setActive] = React.useState(false);
  return (
    <CopyToClipboard
      text={ text }
      onCopy={ () => {
        setTimeout(() => setActive(true), 100);
        setTimeout(() => setActive(false), 750);
      } }
    >
      <Button
        className={ trimWhiteSpace`copy-btn icon ${active ? 'icon-check' : 'icon-clipboard'} ${active ? 'active' : ''}` }
        title={ literals.copyToClipboard }
      />
    </CopyToClipboard>
  );
};

CopyButton.propTypes = {
  /** Text to be copied when the button is clicked */
  text: PropTypes.string.isRequired,
};

export default CopyButton;
