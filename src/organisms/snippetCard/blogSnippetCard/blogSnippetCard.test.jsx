import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BlogSnippetCard from './index';
console.warn = jest.fn();
console.log = jest.fn();

configure({ adapter: new Adapter() });

describe('<BlogSnippetCard />', () => {
  const snippet = {
    id: '30blog/blog_posts/javascript-for-in-for-of-foreach',
    title: 'What is the difference between JavaScript\'s for...in, for...of and forEach?',
    description: 'Learn the differences between the three most commonly used iteration methods offered by JavaScript, which often confuse beginners and veterans alike.',
    firstSeen: '2020-01-20T08:12:31.000Z',
    lastUpdated: '2020-01-20T08:32:55.000Z',
    tags: {
      primary: 'JavaScript',
      all: ['JavaScript', 'Array', 'Object'],
    },
    expertise: '',
    html: {
      description: '<p>Learn the differences between the three most commonly used iteration methods offered by JavaScript, which often confuse beginners and veterans alike.</p>',
      fullDescription: '<p>Learn the differences between the three most commonly used iteration methods offered by JavaScript, which often confuse beginners and veterans alike. Learn the differences between the three most commonly used iteration methods offered by JavaScript, which often confuse beginners and veterans alike.</p>',
    },
    authors: [
      {
        name: 'An author',
        profile: 'https://twitter.com/an-author',
      },
    ],
    cover: {
      src: '/static/d4f86d604fa5bab671646831d08a85b3/6f021/javascript-for-in-for-of-foreach.jpg',
    },
  };
  let wrapper, card, tagList;

  beforeEach(() => {
    wrapper = mount(
      <BlogSnippetCard snippet={ snippet } />
    );
    card = wrapper.find('Card');
    tagList = wrapper.find('TagList');
  });

  describe('should render', () => {
    it('a Card component', () => {
      expect(wrapper).toContainMatchingElement('Card');
    });

    it('the card title', () => {
      expect(card).toContainMatchingElement('h4.card-title');
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
    expect(card.find('h4.card-title').text()).toBe(snippet.title);
  });

  it('should pass the tags data to the TagList component', () => {
    expect(tagList.prop('tags')).toContain(...snippet.tags.all);
  });

  it('should render the correct explanation', () => {
    expect(card.find('.card-description').html()).toContain(snippet.html.fullDescription);
  });
});

