import { render, cleanup } from '@testing-library/react';
import PreviewCardList from './index';
import SnippetFactory from 'test/fixtures/factories/snippet';

const snippetList = SnippetFactory.createMany('PreviewSnippet', 3);

describe('<PreviewCardList />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<PreviewCardList contentItems={snippetList} />).container;
  });

  afterEach(cleanup);

  it('should render the appropriate number of PreviewCard components', () => {
    expect(wrapper.querySelectorAll('.list-card')).toHaveLength(
      snippetList.length
    );
  });
});
