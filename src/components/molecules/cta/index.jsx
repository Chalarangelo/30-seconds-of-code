import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'typedefs/proptypes';
import PageBackdrop from 'components/atoms/pageBackdrop';
import literals from 'lang/en/client/cta';
import config from 'config/global';

const propTypes = {
  acceptsCookies: PropTypes.bool,
};

/**
 * Renders a call to action (backdrop, text and button).
 * Depends on the `PageBackdrop` and `Button` components.
 * @param {bool} acceptsCookies - Does the user accept cookies? (Redux-connected)
 */
const CTA = ({
  acceptsCookies,
}) => (
  <PageBackdrop
    graphicName='graphic-cta twitter-cta'
    mainText={ (
      <>
        { literals.intro }
        <br />
      </>
    ) }
  >
    <a
      className='btn btn-cta btn-twitter icon icon-twitter'
      href={ config.twitterUrl }
      rel='nofollow noopener noreferrer'
      target='_blank'
      onClick={ e => {
        /* istanbul ignore else */
        if (acceptsCookies && typeof window !== 'undefined' && typeof gtag === `function`) {
          e.preventDefault();
          // eslint-disable-next-line camelcase
          window.gtag('event', 'click', { event_category: 'cta-twitter', event_label: e.target.href, value: 1});
          window.open(e.target.href, '_blank');
        }
      } }
    >
      { literals.twitter }
    </a>
  </PageBackdrop>
);

CTA.propTypes = propTypes;

export default connect(
  state => ({
    acceptsCookies: state.shell.acceptsCookies,
  }),
  null
)(CTA);
