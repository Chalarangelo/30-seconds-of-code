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
      linkBack = wrapper.find('a').first();
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.prop('href')).toEqual(lastPages.search.url);
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.text()).toBe(lastPages.search.name);
    });

    it('does not render a second anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('from main listing as last page', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ breadcrumbs } lastPage={ lastPages.mainListing }/>);
      linkBack = wrapper.find('a').first();
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.prop('href')).toEqual(lastPages.mainListing.url);
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.text()).toBe(lastPages.mainListing.name);
    });

    it('does not render a second anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('from language listing as last page', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ breadcrumbs } lastPage={ lastPages.language }/>);
      linkBack = wrapper.find('a').first();
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.prop('href')).toEqual(lastPages.language.url);
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.text()).toBe(lastPages.language.name);
    });

    it('does not render a second anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('from tag listing as last page', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ breadcrumbs } lastPage={ lastPages.tag }/>);
      linkBack = wrapper.find('a').first();
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.prop('href')).toEqual('/javascript/a/1');
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.text()).toBe('JavaScript');
    });

    it('renders a second anchor with the correct link', () => {
      expect(anchor.prop('href')).toEqual(lastPages.tag.url);
    });

    it('renders a second anchor with the correct text', () => {
      expect(anchor.text()).toBe('Function');
    });
  });

  describe('blog from language listing', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ blogBreadcrumbs } lastPage={ lastPages.language } />);
      linkBack = wrapper.find('a').first();
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.prop('href')).toEqual('/javascript/e/1');
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.text()).toBe('JavaScript');
    });

    it('does not render a second anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('blog from tag listing', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ blogBreadcrumbs } lastPage={ lastPages.tag } />);
      linkBack = wrapper.find('a').first();
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a link-back anchor with the correct link', () => {
      expect(linkBack.prop('href')).toEqual('/javascript/a/1');
    });

    it('renders a link-back anchor with the correct text', () => {
      expect(linkBack.text()).toBe('JavaScript');
    });

    it('renders a second anchor with the correct link', () => {
      expect(anchor.prop('href')).toEqual(lastPages.tag.url);
    });

    it('renders a second anchor with the correct text', () => {
      expect(anchor.text()).toBe('Function');
    });
  });

});
