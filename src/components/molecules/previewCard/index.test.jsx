import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PreviewCard from './index';
import { previewSnippet, previewBlogSnippet } from 'fixtures/snippets';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<PreviewCard />', () => {
  let wrapper, card, expertise, anchor, tags;

  beforeEach(() => {
    wrapper = mount(
      <PreviewCard snippet={ previewSnippet } />
    );
    anchor = wrapper.find('Anchor');
    card = wrapper.find('.card');
    expertise = wrapper.find('Expertise');
    tags = wrapper.find('TagList');
  });

  describe('should render', () => {
    it('an Anchor component', () => {
      expect(wrapper).toContainMatchingElement('Anchor');
    });

    it('a li element with the approprite classes', () => {
      expect(wrapper).toContainMatchingElement('li.card.preview-card');
    });

    it('the card title', () => {
      expect(card).toContainMatchingElement('h4.card-title');
    });

    it('an Expertise component', () => {
      expect(card).toContainMatchingElement('Expertise');
    });

    it('the card description', () => {
      expect(card).toContainMatchingElement('.card-description');
    });
  });

  it('should have the correct card title', () => {
    expect(card.find('h4.card-title').text()).toBe(previewSnippet.title);
  });

  it('should pass the expertise data to the Expertise component', () => {
    expect(expertise.prop('level')).toBe(previewSnippet.expertise);
  });

  it('should pass the appropriate tags to the TagList component', () => {
    expect(tags.prop('tags')).toEqual([previewSnippet.language, previewSnippet.primaryTag, previewSnippet.expertise]);
  });

  it('should render the correct description', () => {
    expect(card.find('.card-description').html()).toContain(previewSnippet.description);
  });

  it('should link to the correct url', () => {
    expect(anchor.prop('link').url).toBe(previewSnippet.url);
  });

  describe('with a blog snippet', () => {

    beforeEach(() => {
      wrapper = mount(
        <PreviewCard snippet={ previewBlogSnippet } />
      );
      anchor = wrapper.find('Anchor');
      card = wrapper.find('Card');
      expertise = wrapper.find('Expertise');
      tags = wrapper.find('TagList');
    });

    it('should pass the appropriate tags to the TagList component', () => {
      expect(tags.prop('tags')).toEqual([previewBlogSnippet.primaryTag, previewBlogSnippet.expertise]);
    });
  });
});

