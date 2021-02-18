/*
  Gatsby SSR API
*/
import ContextWrapper from 'state/ContextWrapper';
import React from 'react';

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
  ]);
};
