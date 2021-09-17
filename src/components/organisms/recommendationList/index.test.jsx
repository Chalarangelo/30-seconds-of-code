import { render, cleanup } from '@testing-library/react';
import RecommendationList from './index';
import SnippetFactory from 'test/fixtures/factories/snippet';

const snippetList = SnippetFactory.createMany('PreviewSnippet', 3);

describe('<RecommendationList />', () => {
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

  it('should render a list', () => {
    expect(wrapper.querySelectorAll('.list-section')).toHaveLength(1);
  });
});
