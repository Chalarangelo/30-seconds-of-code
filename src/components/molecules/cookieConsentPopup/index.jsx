import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useShellDispatch } from 'state/shell';
import literals from 'lang/en/client/cookieConsent';

const propTypes = {};

/**
 * Renders the popup for cookie consent. (Context-connected)
 */
const CookieConsentPopup = () => {
  const dispatch = useShellDispatch();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className='cookie-consent-popup srfc-04db px-6 py-2 txt-150 f-center'>
      <p data-nosnippet className='fs-xs mt-1.5 mb-2 mx-auto'>
        {literals.cookieDisclaimer}
        {literals.learnMore}
        <Link href='/cookies'>
          <a>{literals.cookiePolicy}</a>
        </Link>
        {'.'}
        <br />
        {literals.whatYouAccept}
      </p>
      <div className='cookie-consent-buttons mx-auto mt-3.5 mb-2 flex j-center'>
        {[true, false].map(acceptsCookies => (
          <button
            className='btn action-btn fs-xs'
            data-nosnippet
            key={acceptsCookies}
            onClick={e => {
              e.preventDefault();
              dispatch({ type: 'decideCookies', acceptsCookies });
            }}
          >
            {acceptsCookies ? literals.accept : literals.decline}
          </button>
        ))}
      </div>
    </div>
  );
};

CookieConsentPopup.propTypes = propTypes;

export default CookieConsentPopup;
