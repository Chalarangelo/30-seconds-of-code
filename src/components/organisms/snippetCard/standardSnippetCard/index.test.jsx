import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import literals from 'lang/en/client/common';

import SnippetCard from './index';
import { fullSnippet, fullReactSnippet } from 'fixtures/snippets';

configure({ adapter: new Adapter() });

describe('<SnippetCard />', () => {
  let wrapper, card, tagList, codeBlocks;

  beforeEach(() => {
    wrapper = mount(
      <SnippetCard snippet={ fullSnippet } />
    );
    card = wrapper.find('Card');
    tagList = wrapper.find('TagList');
    codeBlocks = wrapper.find('CodeBlock');
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

    it('the card source content', () => {
      expect(card).toContainMatchingElement('.card-source-content');
    });

    it('the card examples title', () => {
      expect(card).toContainMatchingElement('h5.card-example-title');
    });

    it('two CodeBlock components', () => {
      expect(card).toContainMatchingElements(2, 'CodeBlock');
    });

    it('the card code', () => {
      expect(card).toContainMatchingElement('.card-code');
    });

    it('the card examples', () => {
      expect(card).toContainMatchingElement('.card-example');
    });

    it('a CopyButton component', () => {
      expect(card).toContainMatchingElement('CopyButton');
    });
  });

  it('should have the correct card title', () => {
    expect(card.find('h1.card-title').text()).toBe(fullSnippet.title);
  });

  it('should pass the expertise data to the TagList component', () => {
    expect(tagList.prop('tags')).toContain(fullSnippet.expertise);
  });

  it('should pass the tags data to the TagList component', () => {
    expect(tagList.prop('tags')).toContain(...fullSnippet.tags.all);
  });

  it('should pass the language data to the TagList component', () => {
    expect(tagList.prop('tags')).toContain(fullSnippet.language.long);
  });

  it('should render the correct explanation', () => {
    expect(card.find('.card-description').html()).toContain(fullSnippet.html.fullDescription);
  });

  it('should have the appropriate examples title', () => {
    expect(card.find('.card-example-title').text()).toBe(literals.examples);
  });

  it('should pass the code data to the first CodeBlock component', () => {
    expect(codeBlocks.at(0).prop('htmlContent')).toBe(fullSnippet.html.code);
  });

  it('should pass the example data to the seconds CodeBlock component', () => {
    expect(codeBlocks.at(1).prop('htmlContent')).toBe(fullSnippet.html.example);
  });

  describe('when github links are enabled', () => {
    beforeEach(() => {
      wrapper = mount(
        <SnippetCard snippet={ fullSnippet } hasGithubLinksEnabled/>
      );
    });

    it('should render a github link', () => {
      expect(wrapper).toContainMatchingElement('a.github-link');
    });
  });

  describe('with additional languages', () => {
    beforeEach(() => {
      wrapper = mount(
        <SnippetCard snippet={ fullReactSnippet }/>
      );
    });

    it('should render a CodepenButton', () => {
      expect(wrapper).toContainMatchingElement('CodepenButton');
    });
  });
});

