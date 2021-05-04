import { cleanup } from '@testing-library/react';
import { fullSnippet, fullReactSnippet } from 'fixtures/snippets';
import { renderWithContext } from 'test/utils';
import Actions from './index';

global.window = Object.create(window);
global.gtag = Object.create(() => null);
Object.defineProperty(window, 'gtag', {
  value: jest.fn(),
});
Object.defineProperty(window, 'open', {
  value: jest.fn(),
});

describe('<Actions />', () => {
  let wrapper;

  beforeEach(() => {
    const utils = renderWithContext(<Actions snippet={fullSnippet} />);
    wrapper = utils.container;
  });

  afterEach(cleanup);

  it('should render a github link', () => {
    expect(wrapper.querySelectorAll('.icon-github')).toHaveLength(1);
  });

  describe('with regular snippet', () => {
    it('should render a CopyButton component', () => {
      expect(wrapper.querySelectorAll('.icon-clipboard')).toHaveLength(1);
    });
  });

  describe('with codepen-enabled snippet', () => {
    beforeEach(() => {
      const utils = renderWithContext(<Actions snippet={fullReactSnippet} />);
      wrapper = utils.container;
    });

    it('should render a CodepenButton component', () => {
      expect(wrapper.querySelectorAll('.icon-codepen')).toHaveLength(1);
    });
  });
});
