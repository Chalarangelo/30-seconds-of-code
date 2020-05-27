import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RecommendationList from './index';

import { previewSnippet, previewBlogSnippet, searchResultSnippet } from 'fixtures/snippets';

configure({ adapter: new Adapter() });
console.warn = jest.fn();

describe('<RecommendationList />', () => {
  const snippetList = [ previewSnippet, previewBlogSnippet, searchResultSnippet ];

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <RecommendationList
        snippetList={ snippetList }
      />
    );
  });

  it('should render a title', () => {
    expect(wrapper).toContainMatchingElement('.recommendation-list-title');
  });

  it('should render the appropriate number of PreviewCard components', () => {
    expect(wrapper).toContainMatchingElements(3, 'PreviewCard');
  });
});
