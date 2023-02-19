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

  it('renders correctly', () => {
    expect(wrapper.querySelectorAll('.page-container')).toHaveLength(1);
    expect(pageContainer.querySelectorAll('header')).toHaveLength(1);
    expect(pageContainer.querySelectorAll('.content')).toHaveLength(1);
    expect(pageContainer.querySelectorAll('footer')).toHaveLength(1);
    expect(wrapper.textContent).toContain(innerText);
  });

  describe('when in production without cookies applied', () => {
    beforeEach(() => {
      wrapper = renderWithContext(<Shell isSettings>{innerText}</Shell>)
        .container;
    });

    it('should render a CookieConsentPopup', () => {
      expect(wrapper.querySelectorAll('.cookie-consent-popup')).toHaveLength(1);
    });
  });
});
