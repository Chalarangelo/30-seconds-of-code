import React from 'react';
import CookieConsentPopup from 'molecules/cookieConsentPopup';
import mdx from './docs.mdx';

export default {
  title: 'Molecules|CookieConsentPopup',
  component: CookieConsentPopup,
  parameters: {
    docs: {
      page: mdx,
    },
    jest: [
      'cookieConsentPopup',
    ],
  },
};

export const component = () => {
  return (
    <CookieConsentPopup
      onAccept={ () => console.log('Accepted!') }
      onDecline={ () => console.log('Declined...') }
    />
  );
};
