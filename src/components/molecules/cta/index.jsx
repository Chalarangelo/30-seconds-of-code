import React from 'react';
import PageBackdrop from 'components/atoms/pageBackdrop';
import { useGtagEvent } from 'components/hooks';
import literals from 'lang/en/client/cta';
import config from 'config/global';

const propTypes = {};

/**
 * Renders a call to action (backdrop, text and button).
 * Depends on the `PageBackdrop` and `Button` components.
 */
const CTA = () => {
  const gtagCallback = useGtagEvent('click');
  return (
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
          e.preventDefault();
          // eslint-disable-next-line camelcase
          gtagCallback({ event_category: 'cta-twitter', value: 1});
          window.open(e.target.href, '_blank');
        } }
      >
        { literals.twitter }
      </a>
    </PageBackdrop>
  );
};

CTA.propTypes = propTypes;

export default CTA;
