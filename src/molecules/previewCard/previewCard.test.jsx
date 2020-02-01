import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PreviewCard from './index';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<PreviewCard />', () => {
  const snippet = {
    title: 'compose',
    language: 'JavaScript',
    primaryTag: 'Function',
    expertise: 'Intermediate',
    description: '<p>Performs right-to-left function composition.</p>',
    url: 'snippets/compose',
  };
  let wrapper, card, expertise, anchor;

  beforeEach(() => {
    wrapper = mount(
      <PreviewCard snippet={ snippet } />
    );
    anchor = wrapper.find('Anchor');
    card = wrapper.find('Card');
    expertise = wrapper.find('Expertise');
  });

  describe('should render', () => {
    it('an Anchor component', () => {
      expect(wrapper).toContainMatchingElement('Anchor');
    });

    it('a Card component', () => {
      expect(anchor).toContainMatchingElement('Card');
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
    expect(card.find('h4.card-title').text()).toBe(snippet.title);
  });

  it('should pass the expertise data to the Expertise component', () => {
    expect(expertise.prop('level')).toBe(snippet.expertise);
  });

  it('should render the correct description', () => {
    expect(card.find('.card-description').html()).toContain(snippet.description);
  });

  it('should link to the correct url', () => {
    expect(anchor.prop('link').url).toBe(snippet.url);
  });
});

