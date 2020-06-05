import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BlogSnippetCard from './index';
import { fullBlogSnippet } from 'fixtures/snippets';
console.warn = jest.fn();
console.log = jest.fn();

configure({ adapter: new Adapter() });

describe('<BlogSnippetCard />', () => {
  let wrapper, card, tagList;

  beforeEach(() => {
    wrapper = mount(
      <BlogSnippetCard snippet={ fullBlogSnippet } />
    );
    card = wrapper.find('Card');
    tagList = wrapper.find('TagList');
  });

  describe('should render', () => {
    it('a Card component', () => {
      expect(wrapper).toContainMatchingElement('Card');
    });

    it('the card title', () => {
      expect(card).toContainMatchingElement('h1.card-title');
    });

    it('a TagList component', () => {
      expect(card).toContainMatchingElement('TagList');
    });

    it('the card description', () => {
      expect(card).toContainMatchingElement('.card-description');
    });

    it('the card meta info', () => {
      expect(card).toContainMatchingElement('.card-meta-info');
    });
  });

  it('should have the correct card title', () => {
    expect(card.find('h1.card-title').text()).toBe(fullBlogSnippet.title);
  });

  it('should pass the tags data to the TagList component', () => {
    expect(tagList.prop('tags')).toContain(...fullBlogSnippet.tags.all);
  });

  it('should render the correct explanation', () => {
    expect(card.find('.card-description').html()).toContain(fullBlogSnippet.html.fullDescription);
  });

  it('should render the correct cover', () => {
    expect(card.find('img').prop('src')).toBe(fullBlogSnippet.cover.src);
  });

  describe('when github links are enabled', () => {
    beforeEach(() => {
      wrapper = mount(
        <BlogSnippetCard snippet={ fullBlogSnippet } hasGithubLinksEnabled/>
      );
    });

    it('should render a github link', () => {
      expect(wrapper).toContainMatchingElement('a.github-link');
    });
  });

  describe('with multiple auhors', () => {
    beforeEach(() => {
      wrapper = mount(
        <BlogSnippetCard snippet={ { ...fullBlogSnippet, authors: [fullBlogSnippet.authors[0], fullBlogSnippet.authors[0]] } }/>
      );
      card = wrapper.find('Card');
    });

    it('should render the appropriate meta info', () => {
      expect(card).toContainMatchingElement('.card-meta-info');
    });
  });

  describe('without a cover', () => {
    beforeEach(() => {
      wrapper = mount(
        <BlogSnippetCard snippet={ { ...fullBlogSnippet, cover: {src: ''} } }/>
      );
      card = wrapper.find('Card');
    });

    it('should not render a cover', () => {
      expect(card).not.toContainMatchingElement('img');
    });
  });
});

