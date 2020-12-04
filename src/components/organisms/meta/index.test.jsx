import React from 'react';
import Helmet from 'react-helmet';
import { cleanup } from '@testing-library/react';
import { renderConnected } from 'test/utils';
import Meta from './index';
import literals from 'lang/en/client/common';
import settings from 'settings/global';
import { decideCookies } from 'state/shell';
import metadata from 'fixtures/metadata';

console.warn = jest.fn();

describe('<Meta />', () => {
  // eslint-disable-next-line no-unused-vars
  let wrapper, helmet, store;

  beforeAll(() => {
    wrapper = renderConnected(<Meta />);
    helmet = Helmet.peek();
  });

  afterAll(cleanup);

  it('should use the correct locale', () => {
    expect(helmet.htmlAttributes.lang).toBe('en');
  });

  it('should render the website title when not provided a title', () => {
    expect(helmet.title).toBe(literals.siteName);
  });

  it('should render the website description when not provided a description', () => {
    expect(helmet.metaTags.find(v => v.name === 'description').content).toBe(
      literals.siteDescription
    );
  });

  it('should render the correct viewport meta tag', () => {
    expect(helmet.metaTags.find(v => v.name === 'viewport').content).toBe(
      'width=device-width, initial-scale=1'
    );
  });

  it('should render the correct OpenGraph meta tags', () => {
    expect(helmet.metaTags.find(v => v.property === 'og:title').content).toBe(
      literals.siteName
    );
    expect(
      helmet.metaTags.find(v => v.property === 'og:description').content
    ).toBe(literals.siteDescription);
    expect(helmet.metaTags.find(v => v.property === 'og:type').content).toBe(
      'website'
    );
  });

  it('should render the correct Twitter meta tags', () => {
    expect(helmet.metaTags.find(v => v.name === 'twitter:site').content).toBe(
      settings.twitterAccount
    );
    expect(helmet.metaTags.find(v => v.name === 'twitter:card').content).toBe(
      'summary'
    );
    expect(helmet.metaTags.find(v => v.name === 'twitter:title').content).toBe(
      literals.siteName
    );
    expect(
      helmet.metaTags.find(v => v.name === 'twitter:description').content
    ).toBe(literals.siteDescription);
  });

  it('should render a link tag to Google Analytics', () => {
    expect(
      helmet.linkTags.find(v => v.href === 'https://www.google-analytics.com')
    ).not.toBe(null);
  });

  describe('with custom attributes', () => {
    beforeAll(() => {
      store = renderConnected(<Meta {...metadata} />).store;
      helmet = Helmet.peek();
    });

    it('should render the correct title when provided a title', () => {
      expect(helmet.title).toBe(`${metadata.title} - ${literals.siteName}`);
    });

    it('should render the correct description when provided a description', () => {
      expect(helmet.metaTags.find(v => v.name === 'description').content).toBe(
        metadata.description
      );
    });

    it('should render the correct OpenGraph meta tags', () => {
      expect(helmet.metaTags.find(v => v.property === 'og:title').content).toBe(
        `${metadata.title} - ${literals.siteName}`
      );
      expect(
        helmet.metaTags.find(v => v.property === 'og:description').content
      ).toBe(metadata.description);
      expect(helmet.metaTags.find(v => v.property === 'og:image').content).toBe(
        `${settings.websiteUrl}${metadata.logoSrc}`
      );
    });

    it('should render the correct Twitter meta tags', () => {
      expect(
        helmet.metaTags.find(v => v.name === 'twitter:title').content
      ).toBe(metadata.title);
      expect(
        helmet.metaTags.find(v => v.name === 'twitter:description').content
      ).toBe(metadata.description);
      expect(
        helmet.metaTags.find(v => v.name === 'twitter:image').content
      ).toBe(`${settings.websiteUrl}${metadata.logoSrc}`);
    });

    it('should render any additional meta tags passed to the component', () => {
      expect(
        helmet.metaTags.find(v => v.name === metadata.meta[0].name).content
      ).toBe(metadata.meta[0].content);
    });

    it('should render a link tag to the canonical url', () => {
      expect(helmet.linkTags.find(v => v.rel === 'canonical').href).toBe(
        `${settings.websiteUrl}${metadata.canonical}`
      );
    });

    it('should render the passed structured data', () => {
      expect(
        helmet.scriptTags.find(v => v.innerHTML.indexOf('TechArticle') !== -1)
          .type
      ).toBe('application/ld+json');
    });

    it('should render the passed breadcrumbs structured data', () => {
      expect(
        helmet.scriptTags.find(
          v => v.innerHTML.indexOf('BreadcrumbList') !== -1
        ).type
      ).toBe('application/ld+json');
    });
  });

  describe('with cookies accepted', () => {
    beforeAll(() => {
      store.dispatch(decideCookies(true));
      wrapper = renderConnected(<Meta />);
      helmet = Helmet.peek();
    });

    it('should render the appropriate scripts for analytics', () => {
      expect(
        helmet.scriptTags.find(
          v => v.src && v.src.indexOf(settings.googleAnalytics.id) !== -1
        )
      ).not.toBe(null);
      expect(
        helmet.scriptTags.find(
          v =>
            v.innerHTML &&
            v.innerHTML.indexOf(settings.googleAnalytics.id) !== -1
        )
      ).not.toBe(null);
      expect(
        helmet.scriptTags.find(
          v =>
            v.innerHTML &&
            v.innerHTML.indexOf(`window.gtag('event', 'page_view'`) !== -1
        )
      ).not.toBe(null);
    });
  });
});
