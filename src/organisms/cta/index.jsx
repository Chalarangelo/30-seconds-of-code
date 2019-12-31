import React from 'react';
import PropTypes from 'prop-types';
import PageBackdrop from 'molecules/pageBackdrop';
import { AnchorButton } from 'atoms/button';
import _ from 'lang';
const _l = _('en');

const CTA = ({
  snippetUrl,
  acceptsCookies,
}) => {
  return (
    <PageBackdrop
      graphicName='github-cta'
      mainText={ (
        <>
          { _l('Like 30 seconds of code?') }
          <br />
        </>
      ) }
    >
      <AnchorButton
        link={ {
          url: snippetUrl,
          internal: false,
          rel: 'noopener',
          target: '_blank',
        } }
        className='btn-star'
        onClick={ e => {
          if (acceptsCookies && typeof window !== 'undefined' && typeof gtag === `function`) {
            e.preventDefault();
            window.gtag('event', 'click', { event_category: 'cta-github', event_label: e.target.href, value: 1});
            window.open(e.target.href, '_blank');
          }
        } }
      >
        { _l('Star it on GitHub') }
      </AnchorButton>
    </PageBackdrop>
  );
};

CTA.propTypes = {
  /** URL of the snippet page */
  snippetUrl: PropTypes.string,
  /** Does the user accept cookies? */
  acceptsCookies: PropTypes.bool,
};

export default CTA;
