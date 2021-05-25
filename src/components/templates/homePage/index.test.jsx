import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import HomePage from './index';
import { snippetShelf, collectionShelf } from 'test/fixtures/shelves';

describe('<HomePage />', () => {
  const shelves = [collectionShelf, snippetShelf];
  const pageDescription = 'Browse 20 snippet collections on 30 seconds of code';
  let wrapper;

  beforeEach(() => {
    wrapper = renderWithContext(
      <HomePage shelves={shelves} pageDescription={pageDescription} />
    ).container;
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('a Shell component', () => {
      expect(wrapper.querySelectorAll('.page-container')).toHaveLength(1);
    });

    it('the correct number of shelves component', () => {
      expect(wrapper.querySelectorAll('.collections-shelf-title')).toHaveLength(
        1
      );
      expect(wrapper.querySelectorAll('.snippets-shelf-title')).toHaveLength(1);
    });
  });
});
