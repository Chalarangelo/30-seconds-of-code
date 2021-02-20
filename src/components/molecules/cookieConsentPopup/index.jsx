import React from 'react';
import PropTypes from 'typedefs/proptypes';
import { Button } from 'components/atoms/button';
import { useShellDispatch } from 'state/shell';
import literals from 'lang/en/client/cookieConsent';

const propTypes = {};

/**
 * Renders the popup for cookie consent. (Context-connected)
 * Dependent on the `Button` component.
 */
const CookieConsentPopup = () => {
  const dispatch = useShellDispatch();

  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className='cookie-consent-popup'>
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
            dispatch({ action: 'decideCookies', acceptsCookies: true });
          }}
        >
          {literals.accept}
        </Button>
        <Button
          className='cookie-decline'
          data-nosnippet
          onClick={e => {
            e.preventDefault();
            dispatch({ action: 'decideCookies', acceptsCookies: false });
          }}
        >
          {literals.decline}
        </Button>
      </div>
    </div>
  );
};

CookieConsentPopup.propTypes = propTypes;

export default CookieConsentPopup;
