import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Breadcrumbs from './index';

import { breadcrumbs, lastPages, blogBreadcrumbs } from 'fixtures/breadcrumbs';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<Breadcrumbs />', () => {
  let wrapper, linkBack, anchor;

  describe('from Search as last page', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ breadcrumbs } lastPage={ lastPages.search }/>);
      linkBack = wrapper.find('Anchor').first();
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.prop('link')).toEqual(lastPages.search.link);
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.text()).toBe(lastPages.search.name);
    });

    it('does not render a second Anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('from main listing as last page', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ breadcrumbs } lastPage={ lastPages.mainListing }/>);
      linkBack = wrapper.find('Anchor').first();
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.prop('link')).toEqual(lastPages.mainListing.link);
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.text()).toBe(lastPages.mainListing.name);
    });

    it('does not render a second Anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('from language listing as last page', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ breadcrumbs } lastPage={ lastPages.language }/>);
      linkBack = wrapper.find('Anchor').first();
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.prop('link')).toEqual(lastPages.language.link);
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.text()).toBe(lastPages.language.name);
    });

    it('does not render a second Anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('from tag listing as last page', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ breadcrumbs } lastPage={ lastPages.tag }/>);
      linkBack = wrapper.find('Anchor').first();
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.prop('link')).toEqual({internal: true, url: '/javascript/a/1'});
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.text()).toBe('JavaScript');
    });

    it('renders a second Anchor with the correct link', () => {
      expect(anchor.prop('link')).toEqual({internal: true, url: lastPages.tag.link.url});
    });

    it('renders a second Anchor with the correct text', () => {
      expect(anchor.text()).toBe('Function');
    });
  });

  describe('blog from language listing', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ blogBreadcrumbs } lastPage={ lastPages.language } />);
      linkBack = wrapper.find('Anchor').first();
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.prop('link')).toEqual({ internal: true, url: '/javascript/e/1' });
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.text()).toBe('JavaScript');
    });

    it('does not render a second Anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('blog from tag listing', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ blogBreadcrumbs } lastPage={ lastPages.tag } />);
      linkBack = wrapper.find('Anchor').first();
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.prop('link')).toEqual({ internal: true, url: '/javascript/a/1' });
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.text()).toBe('JavaScript');
    });

    it('renders a second Anchor with the correct link', () => {
      expect(anchor.prop('link')).toEqual({ internal: true, url: lastPages.tag.link.url });
    });

    it('renders a second Anchor with the correct text', () => {
      expect(anchor.text()).toBe('Function');
    });
  });

});
