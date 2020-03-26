import React from 'react';
import PropTypes from 'prop-types';
import Anchor from 'components/atoms/anchor';
import { Button } from 'components/atoms/button';
import literals from 'lang/en/client/cookieConsent';

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
      { literals.cookieDisclaimer }
      { literals.learnMore }
      <Anchor
        link={ {
          internal: true,
          url: '/cookies',
        } }
        className='footer-link'
      >
        { literals.cookiePolicy }
      </Anchor>
      { '.' }
      <br/>
      { literals.whatYouAccept }
    </p>
    <div className='cookie-consent-buttons'>
      <Button className='cookie-accept' onClick={ onAccept }>
        { literals.accept }
      </Button>
      <Button className='cookie-decline' onClick={ onDecline }>
        { literals.decline }
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
