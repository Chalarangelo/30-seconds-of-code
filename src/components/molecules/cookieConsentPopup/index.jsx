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
    <div className='cookie-consent-popup srfc-04db txt-150 f-center'>
      <p data-nosnippet className='fs-xs'>
        {literals.cookieDisclaimer}
        {literals.learnMore}
        <a className='footer-link' href='/cookies'>
          {literals.cookiePolicy}
        </a>
        {'.'}
        <br />
        {literals.whatYouAccept}
      </p>
      <div className='cookie-consent-buttons flex j-center'>
        <Button
          className='cookie-accept'
          data-nosnippet
          onClick={e => {
            e.preventDefault();
            dispatch({ type: 'decideCookies', acceptsCookies: true });
          }}
        >
          {literals.accept}
        </Button>
        <Button
          className='cookie-decline'
          data-nosnippet
          onClick={e => {
            e.preventDefault();
            dispatch({ type: 'decideCookies', acceptsCookies: false });
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
