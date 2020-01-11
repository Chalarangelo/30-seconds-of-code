import React from 'react';
import PropTypes from 'prop-types';
import PageBackdrop from 'molecules/pageBackdrop';
import { AnchorButton } from 'atoms/button';
import { weightedSample } from 'functions/utils';
import _ from 'lang';
const _l = _('en');
const config = require('../../../config');

const AVAILABLE_CTAS = [
  'github',
  'twitter',
];
const AVAILABLE_CTA_PROBABILITIES = [
  0.4,
  0.6,
];
const AVAILABLE_CTA_PROBABILITIES_WHEN_ONLY_SOCIAL = [
  0.0,
  1.0,
];

const CTA = ({
  snippetUrl,
  acceptsCookies,
  onlySocial,
}) => {
  const [ctaId, setCtaId] = React.useState(
    weightedSample(
      AVAILABLE_CTAS,
      onlySocial ? AVAILABLE_CTA_PROBABILITIES_WHEN_ONLY_SOCIAL : AVAILABLE_CTA_PROBABILITIES )
  );

  return (
    <PageBackdrop
      graphicName={ `graphic-cta ${ctaId}-cta` }
      mainText={ (
        <>
          { _l('Like 30 seconds of code?') }
          <br />
        </>
      ) }
    >
      <AnchorButton
        link={ {
          url: ctaId === 'github' ? snippetUrl : config.twitterUrl,
          internal: false,
          rel: 'noopener',
          target: '_blank',
        } }
        className={ `btn-cta btn-${ctaId}` }
        onClick={ e => {
          if (acceptsCookies && typeof window !== 'undefined' && typeof gtag === `function`) {
            e.preventDefault();
            window.gtag('event', 'click', { event_category: `cta-${ctaId}`, event_label: e.target.href, value: 1});
            window.open(e.target.href, '_blank');
          }
        } }
      >
        { _l`cta.${ctaId}` }
      </AnchorButton>
    </PageBackdrop>
  );
};

CTA.propTypes = {
  /** URL of the snippet page */
  snippetUrl: PropTypes.string,
  /** Does the user accept cookies? */
  acceptsCookies: PropTypes.bool,
  /** Should this CTA only link to social? */
  onlySocial: PropTypes.bool,
};

export default CTA;
