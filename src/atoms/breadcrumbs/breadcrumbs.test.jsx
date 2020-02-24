import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Breadcrumbs, { LinkBackAnchor } from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<LinkBackAnchor />', () => {
  const innerText = 'Click me!';
  let link = { url: '#', internal: false };
  let wrapper, anchor;

  beforeEach(() => {
    wrapper = mount(<LinkBackAnchor link={ link } >{ innerText }</LinkBackAnchor>);
    anchor = wrapper.find('Anchor');
  });

  it('should render correctly', () => {
    expect(wrapper).toContainMatchingElement('Anchor');
  });

  it('should pass the link to the wrapped Anchor', () => {
    expect(anchor.prop('link')).toEqual(link);
  });

  it('should render passed children', () => {
    expect(anchor.text()).toBe(innerText);
  });

  it('should render passed children', () => {
    expect(anchor.prop('className').indexOf(('link-back'))).not.toBe(-1);
  });
});

describe('<Breadcrumbs />', () => {
  const breadcrumbs = [
    {
      link: {
        url: '/javascript/p/1',
        internal: true,
      },
      name: 'JavaScript',
    },
    {
      link: {
        url: '/javascript/t/function/p/1',
        internal: true,
      },
      name: 'JavaScript Function',
    },
  ];
  const lastPages = {
    search: {
      link: {
        url: '/search',
        internal: true,
      },
      name: 'Search',
    },
    mainListing: {
      link: {
        url: '/',
        internal: true,
      },
      name: 'Snippet List',
    },
    language: {
      link: {
        url: '/javascript/e/1',
        internal: true,
      },
      name: 'JavaScript',
    },
    tag: {
      link: {
        url: '/javascript/t/function/a/1',
        internal: true,
      },
      name: 'JavaScript Function',
    },
  };
  let wrapper, linkBack, anchor;

  describe('from Search as last page', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ breadcrumbs } lastPage={ lastPages.search }/>);
      linkBack = wrapper.find('LinkBackAnchor');
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a LinkBackAnchor with the correct link', () => {
      expect(linkBack.prop('link')).toEqual(lastPages.search.link);
    });

    it('renders a LinkBackAnchor with the correct text', () => {
      expect(linkBack.text()).toBe(lastPages.search.name);
    });

    it('does not render a second Anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('from main listing as last page', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ breadcrumbs } lastPage={ lastPages.mainListing }/>);
      linkBack = wrapper.find('LinkBackAnchor');
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a LinkBackAnchor with the correct link', () => {
      expect(linkBack.prop('link')).toEqual(lastPages.mainListing.link);
    });

    it('renders a LinkBackAnchor with the correct text', () => {
      expect(linkBack.text()).toBe(lastPages.mainListing.name);
    });

    it('does not render a second Anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('from language listing as last page', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ breadcrumbs } lastPage={ lastPages.language }/>);
      linkBack = wrapper.find('LinkBackAnchor');
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a LinkBackAnchor with the correct link', () => {
      expect(linkBack.prop('link')).toEqual(lastPages.language.link);
    });

    it('renders a LinkBackAnchor with the correct text', () => {
      expect(linkBack.text()).toBe(lastPages.language.name);
    });

    it('does not render a second Anchor', () => {
      expect(anchor).toBeFalsy;
    });
  });

  describe('from tag listing as last page', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumbs breadcrumbs={ breadcrumbs } lastPage={ lastPages.tag }/>);
      linkBack = wrapper.find('LinkBackAnchor');
      anchor = wrapper.find('.link-back-more').first();
    });

    it('renders a LinkBackAnchor with the correct link', () => {
      expect(linkBack.prop('link')).toEqual({internal: true, url: '/javascript/a/1'});
    });

    it('renders a LinkBackAnchor with the correct text', () => {
      expect(linkBack.text()).toBe('JavaScript');
    });

    it('renders a second Anchor with the correct link', () => {
      expect(anchor.prop('link')).toEqual({internal: true, url: lastPages.tag.link.url});
    });

    it('renders a second Anchor with the correct text', () => {
      expect(anchor.text()).toBe('Function');
    });
  });

});
