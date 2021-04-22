import React from 'react';
import { render, cleanup } from '@testing-library/react';
import RecommendationList from './index';
import {
  previewSnippet,
  previewBlogSnippet,
  searchResultSnippet,
} from 'fixtures/snippets';

describe('<RecommendationList />', () => {
  const snippetList = [previewSnippet, previewBlogSnippet, searchResultSnippet];
  let wrapper;

  beforeEach(() => {
    wrapper = render(<RecommendationList snippetList={snippetList} />)
      .container;
  });

  afterEach(cleanup);

  it('should render a title', () => {
    expect(wrapper.querySelectorAll('.recommendation-list-title')).toHaveLength(
      1
    );
  });

  it('should render the appropriate number of PreviewCard components', () => {
    expect(wrapper.querySelectorAll('.list-card')).toHaveLength(3);
  });
});
