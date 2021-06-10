import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import SnippetFactory from 'test/fixtures/factories/snippet';
import Actions from './index';

global.window = Object.create(window);
global.gtag = Object.create(() => null);

const fullSnippet = SnippetFactory.create('FullSnippet');
const fullReactSnippet = SnippetFactory.create('FullReactSnippet');
const fullCssSnippet = SnippetFactory.create('FullCssSnippet');

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
    it('should render a copy button', () => {
      expect(wrapper.querySelectorAll('.icon-clipboard')).toHaveLength(1);
    });
  });

  describe('with codepen-enabled snippet', () => {
    beforeEach(() => {
      const utils = renderWithContext(<Actions snippet={fullReactSnippet} />);
      wrapper = utils.container;
    });

    it('should render a codepen button', () => {
      expect(wrapper.querySelectorAll('.icon-codepen')).toHaveLength(1);
    });
  });

  describe('with css snippet', () => {
    beforeEach(() => {
      const utils = renderWithContext(<Actions snippet={fullCssSnippet} />);
      wrapper = utils.container;
    });

    it('should render a codepen button', () => {
      expect(wrapper.querySelectorAll('.icon-codepen')).toHaveLength(1);
    });
  });
});
