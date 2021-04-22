import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import cards from './index';
import {
  fullSnippet,
  fullCssSnippet,
  fullBlogSnippet,
} from 'fixtures/snippets';

describe('<SnippetCardWrapper />', () => {
  let wrapper;

  describe('standard snippet card template', () => {
    beforeEach(() => {
      const SnippetCard = cards['StandardSnippetCard'];
      wrapper = renderWithContext(<SnippetCard snippet={fullSnippet} />)
        .container;
    });

    afterEach(cleanup);

    it('should render a StandardSnippetCard component', () => {
      expect(wrapper.querySelectorAll('.snippet-card')).toHaveLength(1);
    });
  });

  describe('css snippet card template', () => {
    beforeEach(() => {
      const SnippetCard = cards['CssSnippetCard'];
      wrapper = renderWithContext(<SnippetCard snippet={fullCssSnippet} />)
        .container;
    });

    it('should render a CssSnippetCard component', () => {
      expect(wrapper.querySelectorAll('.snippet-card')).toHaveLength(1);
    });
  });

  describe('blog snippet card template', () => {
    beforeEach(() => {
      const SnippetCard = cards['BlogSnippetCard'];
      wrapper = renderWithContext(<SnippetCard snippet={fullBlogSnippet} />)
        .container;
    });

    it('should render a BlogSnippetCard component', () => {
      expect(wrapper.querySelectorAll('.snippet-card')).toHaveLength(1);
    });
  });
});
