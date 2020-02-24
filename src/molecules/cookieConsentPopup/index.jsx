import React from 'react';
import PropTypes from 'prop-types';
import Anchor from 'atoms/anchor';
import { Button } from 'atoms/button';
import _ from 'lang';
const _l = _('en');

/**
 * Renders the popup for cookie consent.
 * Depends on the Anchor and Button atoms.
 */
const CookieConsentPopup = ({
  onAccept,
  onDecline,
  ...rest
}) => (
  <div className='cookie-consent-popup' { ...rest }>
    <p>
      { _l('Our website uses tools such as cookies to provide a high quality personalized experience and gather anonymized data for statistical analisis of the website\'s traffic.') }
      { _l('You can learn more by reading our ') }
      <Anchor
        link={ {
          internal: true,
          url: '/cookies',
        } }
        className='footer-link'
      >
        { _l('cookie policy') }
      </Anchor>
      { _l('.') }
      <br/>
      { _l('By clicking "Accept" you accept their installation.') }
    </p>
    <div className='cookie-consent-buttons'>
      <Button className='cookie-accept' onClick={ onAccept }>
        { _l('Accept') }
      </Button>
      <Button className='cookie-decline' onClick={ onDecline }>
        { _l('Decline') }
      </Button>
    </div>
  </div>
);

CookieConsentPopup.propTypes = {
  /** Any other props to be passed to the component */
  rest: PropTypes.any,
  /** Action to be executed on accept */
  onAccept: PropTypes.func,
  /** Action to be executed on decline */
  onDecline: PropTypes.func,
};

export default CookieConsentPopup;
