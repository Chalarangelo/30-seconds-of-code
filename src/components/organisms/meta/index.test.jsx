import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import Meta from './index';
import literals from 'lang/en/client/common';
import settings from 'settings/global';
import { metadata } from 'test/fixtures/metadata';

describe('<Meta />', () => {
  beforeAll(() => {
    renderWithContext(<Meta />);
  });

  afterAll(cleanup);

  it('should render the website title when not provided a title', () => {
    expect(document.title).toBe(literals.siteName);
  });

  it('should render the website description when not provided a description', () => {
    expect(
      document.head.querySelector('meta[name="description"]').content
    ).toBe(literals.siteDescription);
  });

  it('should render the correct viewport meta tag', () => {
    expect(document.head.querySelector('meta[name="viewport"]').content).toBe(
      'width=device-width, initial-scale=1'
    );
  });

  it('should render the correct OpenGraph meta tags', () => {
    expect(
      document.head.querySelector('meta[property="og:title"]').content
    ).toBe(literals.siteName);
    expect(
      document.head.querySelector('meta[property="og:description"]').content
    ).toBe(literals.siteDescription);
    expect(
      document.head.querySelector('meta[property="og:type"]').content
    ).toBe('website');
  });

  it('should render the correct Twitter meta tags', () => {
    expect(
      document.head.querySelector('meta[name="twitter:card"]').content
    ).toBe('summary_large_image');
  });

  it('should render a link tag to Google Analytics', () => {
    expect(
      document.head.querySelector(
        'link[href="https://www.google-analytics.com"]'
      )
    ).not.toBe(null);
  });

  describe('with custom attributes', () => {
    beforeAll(() => {
      renderWithContext(<Meta {...metadata} />);
    });

    it('should render the correct title when provided a title', () => {
      expect(document.title).toBe(`${metadata.title} - ${literals.siteName}`);
    });

    it('should render the correct description when provided a description', () => {
      expect(
        document.head.querySelector('meta[name="description"]').content
      ).toBe(metadata.description);
    });

    it('should render the correct OpenGraph meta tags', () => {
      expect(
        document.head.querySelector('meta[property="og:title"]').content
      ).toBe(`${metadata.title} - ${literals.siteName}`);
      expect(
        document.head.querySelector('meta[property="og:description"]').content
      ).toBe(metadata.description);
      expect(
        document.head.querySelector('meta[property="og:image"]').content
      ).toBe(`${settings.websiteUrl}${metadata.logoSrc}`);
    });

    it('should render a link tag to the canonical url', () => {
      expect(document.head.querySelector('link[rel="canonical"]').href).toBe(
        `${settings.websiteUrl}${metadata.canonical}`
      );
    });

    it('should render the passed breadcrumbs structured data', () => {
      expect(
        [...document.head.querySelectorAll('script')].find(
          v => v.innerHTML.indexOf('BreadcrumbList') !== -1
        ).type
      ).toBe('application/ld+json');
    });
  });

  describe('with cookies accepted', () => {
    beforeAll(() => {
      renderWithContext(<Meta />, {
        initialState: { shell: { acceptsCookies: true } },
      });
    });

    it('should render the appropriate scripts for analytics', () => {
      expect(
        [...document.head.querySelectorAll('script')].find(
          v => v.src && v.src.indexOf(settings.googleAnalytics.id) !== -1
        )
      ).not.toBe(null);
      expect(
        [...document.head.querySelectorAll('script')].find(
          v =>
            v.innerHTML &&
            v.innerHTML.indexOf(settings.googleAnalytics.id) !== -1
        )
      ).not.toBe(null);
      expect(
        [...document.head.querySelectorAll('script')].find(
          v =>
            v.innerHTML &&
            v.innerHTML.indexOf(`window.gtag('event', 'page_view'`) !== -1
        )
      ).not.toBe(null);
    });
  });
});
