import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { connect } from 'react-redux';
import Anchor from 'components/atoms/anchor';
import { Button } from 'components/atoms/button';
import { decideCookies } from 'state/shell';
import literals from 'lang/en/client/cookieConsent';

const propTypes = {
  dispatch: PropTypes.func,
  rest: PropTypes.any,
};

/**
 * Renders the popup for cookie consent. (Redux-connected)
 * Dependent on the `Anchor` and `Button` components.
 */
const CookieConsentPopup = ({
  dispatch,
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
      <Button
        className='cookie-accept'
        onClick={ e => {
          e.preventDefault();
          dispatch(decideCookies(true));
        } }>
        { literals.accept }
      </Button>
      <Button
        className='cookie-decline'
        onClick={ e => {
          e.preventDefault();
          dispatch(decideCookies(false));
        } }
      >
        { literals.decline }
      </Button>
    </div>
  </div>
);

CookieConsentPopup.propTypes = propTypes;

export default connect(
  () => ({}),
  null
)(CookieConsentPopup);
