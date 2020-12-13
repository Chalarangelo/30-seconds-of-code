import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { connect } from 'react-redux';
import { Button } from 'components/atoms/button';
import { decideCookies } from 'state/shell';
import literals from 'lang/en/client/cookieConsent';

const propTypes = {
  dispatch: PropTypes.func,
  rest: PropTypes.any,
};

/**
 * Renders the popup for cookie consent. (Redux-connected)
 * Dependent on the `Button` component.
 */
const CookieConsentPopup = ({ dispatch, ...rest }) => (
  <div className='cookie-consent-popup' {...rest}>
    <p data-nosnippet>
      {literals.cookieDisclaimer}
      {literals.learnMore}
      <a className='footer-link' href='/cookies'>
        {literals.cookiePolicy}
      </a>
      {'.'}
      <br />
      {literals.whatYouAccept}
    </p>
    <div className='cookie-consent-buttons'>
      <Button
        className='cookie-accept'
        data-nosnippet
        onClick={e => {
          e.preventDefault();
          dispatch(decideCookies(true));
        }}
      >
        {literals.accept}
      </Button>
      <Button
        className='cookie-decline'
        data-nosnippet
        onClick={e => {
          e.preventDefault();
          dispatch(decideCookies(false));
        }}
      >
        {literals.decline}
      </Button>
    </div>
  </div>
);

CookieConsentPopup.propTypes = propTypes;

export default connect(() => ({}), null)(CookieConsentPopup);
