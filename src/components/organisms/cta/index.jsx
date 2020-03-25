import React from 'react';
import PropTypes from 'prop-types';
import PageBackdrop from 'components/molecules/pageBackdrop';
import { AnchorButton } from 'components/atoms/button';
import literals from 'lang/en/client/cta';
import config from 'config/client';

/**
 * Renders a call to action (backdrop, text and button).
 * Depends on the PageBackdrop molecule and Button Atom.
 */
const CTA = ({
  acceptsCookies,
}) => {

  return (
    <PageBackdrop
      graphicName={ `graphic-cta twitter-cta` }
      mainText={ (
        <>
          { literals.intro }
          <br />
        </>
      ) }
    >
      <AnchorButton
        link={ {
          url: config.twitterUrl,
          internal: false,
          rel: 'noopener',
          target: '_blank',
        } }
        className='btn-cta btn-twitter icon icon-twitter'
        onClick={ e => {
          if (acceptsCookies && typeof window !== 'undefined' && typeof gtag === `function`) {
            e.preventDefault();
            // eslint-disable-next-line camelcase
            window.gtag('event', 'click', { event_category: 'cta-twitter', event_label: e.target.href, value: 1});
            window.open(e.target.href, '_blank');
          }
        } }
      >
        { literals.twitter }
      </AnchorButton>
    </PageBackdrop>
  );
};

CTA.propTypes = {
  /** Does the user accept cookies? */
  acceptsCookies: PropTypes.bool,
};

export default CTA;
