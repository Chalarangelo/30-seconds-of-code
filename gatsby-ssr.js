/*
  Gatsby SSR API
*/
import ContextWrapper from 'state/ContextWrapper';
import React from 'react';
import settings from 'settings/global';

/**
 * Wraps the whole application in a Context Provider.
 */
export const wrapRootElement = ContextWrapper;

/**
 * Called after rendering a page. Injects sitemap and opensearch XMLs.
 * TODO: Improve and extract outside of this file, if/when possible.
 */
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key='link-sitemap'
      rel='sitemap'
      href='/sitemap.xml'
      type='application/xml'
    />,
    <link
      key='link-rss-feed'
      rel='alternate'
      href='/feed'
      type='application/rss+xml'
      title='30secondsofcode.org'
    />,
    <link
      key='link-opensearch'
      rel='search'
      href='/opensearch.xml'
      type='application/opensearchdescription+xml'
      title='Snippet search'
    />,
    <script
      key='gtag'
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalytics.id}`}
    ></script>,
    <script
      key='gtag-init'
      dangerouslySetInnerHTML={{
        __html: `
          function generateUUID() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
              return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
            });
          }
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${settings.googleAnalytics.id}', {
            send_page_view: true,
            anonymize_ip: true,
            client_storage: 'none',
            client_id: generateUUID()
          })
        `,
      }}
    />,
  ]);
};
