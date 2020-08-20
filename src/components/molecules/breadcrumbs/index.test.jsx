import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Breadcrumbs from './index';
import { breadcrumbs, lastPages, blogBreadcrumbs } from 'fixtures/breadcrumbs';

console.warn = jest.fn();

describe('<Breadcrumbs />', () => {
  let wrapper, linkBack, anchor;

  describe('from Search as last page', () => {
    beforeEach(() => {
      wrapper = render(
        <Breadcrumbs
          breadcrumbs={ breadcrumbs }
          lastPage={ lastPages.search }
        />
      ).container;
      linkBack = wrapper.querySelector('a');
      anchor = wrapper.querySelector('.link-back-more');
    });

    afterEach(cleanup);

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.href).toContain(lastPages.search.url);
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.textContent).toBe(lastPages.search.name);
    });

    it('does not render a second anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('from main listing as last page', () => {
    beforeEach(() => {
      wrapper = render(
        <Breadcrumbs
          breadcrumbs={ breadcrumbs }
          lastPage={ lastPages.mainListing }
        />
      ).container;
      linkBack = wrapper.querySelector('a');
      anchor = wrapper.querySelector('.link-back-more');
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.href).toContain(lastPages.mainListing.url);
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.textContent).toBe(lastPages.mainListing.name);
    });

    it('does not render a second anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('from language listing as last page', () => {
    beforeEach(() => {
      wrapper = render(
        <Breadcrumbs
          breadcrumbs={ breadcrumbs }
          lastPage={ lastPages.language }/>
      ).container;
      linkBack = wrapper.querySelector('a');
      anchor = wrapper.querySelector('.link-back-more');
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.href).toContain(lastPages.language.url);
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.textContent).toBe(lastPages.language.name);
    });

    it('does not render a second anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('from tag listing as last page', () => {
    beforeEach(() => {
      wrapper = render(
        <Breadcrumbs
          breadcrumbs={ breadcrumbs }
          lastPage={ lastPages.tag }/>
      ).container;
      linkBack = wrapper.querySelector('a');
      anchor = wrapper.querySelector('.link-back-more');
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.href).toContain('/javascript/a/1');
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.textContent).toBe('JavaScript');
    });

    it('renders a second anchor with the correct link', () => {
      expect(anchor.href).toContain(lastPages.tag.url);
    });

    it('renders a second anchor with the correct text', () => {
      expect(anchor.textContent).toBe('Function');
    });
  });

  describe('blog from language listing', () => {
    beforeEach(() => {
      wrapper = render(
        <Breadcrumbs
          breadcrumbs={ blogBreadcrumbs }
          lastPage={ lastPages.language }
        />
      ).container;
      linkBack = wrapper.querySelector('a');
      anchor = wrapper.querySelector('.link-back-more');
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.href).toContain('/javascript/e/1');
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.textContent).toBe('JavaScript');
    });

    it('does not render a second anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('blog from tag listing', () => {
    beforeEach(() => {
      wrapper = render(
        <Breadcrumbs
          breadcrumbs={ blogBreadcrumbs }
          lastPage={ lastPages.tag }
        />
      ).container;
      linkBack = wrapper.querySelector('a');
      anchor = wrapper.querySelector('.link-back-more');
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.href).toContain('/javascript/a/1');
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.textContent).toBe('JavaScript');
    });

    it('renders a second anchor with the correct link', () => {
      expect(anchor.href).toContain(lastPages.tag.url);
    });

    it('renders a second anchor with the correct text', () => {
      expect(anchor.textContent).toBe('Function');
    });
  });
});
