import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CssSnippetCard from './index';
import { fullCssSnippet, fullCssWithJsSnippet } from 'fixtures/snippets';
console.warn = jest.fn();
console.log = jest.fn();

configure({ adapter: new Adapter() });

describe('<CssSnippetCard />', () => {

  let wrapper, card, tagList, snippetPreview, codepenButton, codeBlocks;

  beforeEach(() => {
    wrapper = mount(
      <CssSnippetCard snippet={ fullCssSnippet } />
    );
    card = wrapper.find('Card');
    tagList = wrapper.find('TagList');
    snippetPreview = wrapper.find('SnippetPreview');
    codepenButton = wrapper.find('CodepenButton');
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

    it('the card preview content', () => {
      expect(card).toContainMatchingElement('.card-preview-content');
    });

    it('a SnippetPreview component', () => {
      expect(card).toContainMatchingElement('SnippetPreview');
    });

    it('a CodepenButton component', () => {
      expect(card).toContainMatchingElement('CodepenButton');
    });

    it('the card source content', () => {
      expect(card).toContainMatchingElement('.card-source-content');
    });

    it('three CodeBlock components', () => {
      expect(card).toContainMatchingElements(2, 'CodeBlock');
    });
  });

  it('should have the correct card title', () => {
    expect(card.find('h1.card-title').text()).toBe(fullCssSnippet.title);
  });

  it('should pass the expertise data to the TagList component', () => {
    expect(tagList.prop('tags')).toContain(fullCssSnippet.expertise);
  });

  it('should pass the tags data to the TagList component', () => {
    expect(tagList.prop('tags')).toContain(...fullCssSnippet.tags.all);
  });

  it('should pass the language data to the TagList component', () => {
    expect(tagList.prop('tags')).toContain(fullCssSnippet.language.long);
  });

  it('should render the correct explanation', () => {
    expect(card.find('.card-description').html()).toContain(fullCssSnippet.html.fullDescription);
  });

  it('should pass the snippet code data to the SnippetPreview component', () => {
    expect(snippetPreview.prop('scopeId')).toBe(fullCssSnippet.id.slice(fullCssSnippet.id.lastIndexOf('/') + 1));
    expect(snippetPreview.prop('scopedCss')).toBe(fullCssSnippet.code.scopedCss);
    expect(snippetPreview.prop('htmlCode')).toBe(fullCssSnippet.code.html);
    expect(snippetPreview.prop('jsCode')).toBe(fullCssSnippet.code.js);
  });

  it('should pass the snippet code data to the CodepenButton component', () => {
    expect(codepenButton.prop('cssCode')).toBe(fullCssSnippet.code.css);
    expect(codepenButton.prop('htmlCode')).toBe(fullCssSnippet.code.html);
    expect(codepenButton.prop('jsCode')).toBe(fullCssSnippet.code.js);
  });

  it('should pass the html data to the first CodeBlock component', () => {
    expect(codeBlocks.at(0).prop('htmlContent')).toBe(fullCssSnippet.html.htmlCode);
  });

  it('should pass the css data to the first CodeBlock component', () => {
    expect(codeBlocks.at(1).prop('htmlContent')).toBe(fullCssSnippet.html.cssCode);
  });

  describe('including JS code', () => {

    beforeEach(() => {
      wrapper = mount(
        <CssSnippetCard snippet={ fullCssWithJsSnippet } />
      );
      card = wrapper.find('Card');
      tagList = wrapper.find('TagList');
      snippetPreview = wrapper.find('SnippetPreview');
      codepenButton = wrapper.find('CodepenButton');
      codeBlocks = wrapper.find('CodeBlock');
    });

    it('should render three CodeBlock components', () => {
      expect(card).toContainMatchingElements(3, 'CodeBlock');
    });

    it('should pass the js data to the first CodeBlock component', () => {
      expect(codeBlocks.at(2).prop('htmlContent')).toBe(fullCssWithJsSnippet.html.jsCode);
    });
  });

  describe('when github links are enabled', () => {
    beforeEach(() => {
      wrapper = mount(
        <CssSnippetCard snippet={ fullCssSnippet } hasGithubLinksEnabled/>
      );
    });

    it('should render a github link', () => {
      expect(wrapper).toContainMatchingElement('a.github-link');
    });
  });
});

