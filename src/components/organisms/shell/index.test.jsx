import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/utils';
import Shell from './index';

describe('<Shell />', () => {
  let wrapper, pageContainer;
  const innerText = 'Hi there!';

  beforeEach(() => {
    const utils = renderWithContext(<Shell>{innerText}</Shell>);
    wrapper = utils.container;
    pageContainer = wrapper.querySelector('div.page-container');
  });

  afterEach(cleanup);

  describe('should render', () => {
    it('the page container', () => {
      expect(wrapper.querySelectorAll('div.page-container')).toHaveLength(1);
    });

    it('a header component', () => {
      expect(pageContainer.querySelectorAll('header')).toHaveLength(1);
    });

    it('the content container', () => {
      expect(pageContainer.querySelectorAll('div.content')).toHaveLength(1);
    });

    it('a footer component', () => {
      expect(pageContainer.querySelectorAll('footer')).toHaveLength(1);
    });
  });

  it('should render passed children', () => {
    expect(wrapper.textContent).toContain(innerText);
  });

  describe('when in production without cookies enabled', () => {
    beforeEach(() => {
      wrapper = renderWithContext(<Shell isSettings>{innerText}</Shell>)
        .container;
    });

    it('should render a CookieConsentPopup', () => {
      expect(wrapper.querySelectorAll('.cookie-consent-popup')).toHaveLength(1);
    });
  });
});
