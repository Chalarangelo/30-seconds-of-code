import { cleanup } from '@testing-library/react';
import { renderWithContext } from 'test/reactUtils';
import CookieConsentPopup from 'components/molecules/cookieConsentPopup';

describe('<CookieConsentPopup />', () => {
  let wrapper;

  beforeEach(() => {
    const utils = renderWithContext(<CookieConsentPopup />);
    wrapper = utils.container;
  });

  afterEach(cleanup);

  it('renders correctly', () => {
    expect(wrapper.querySelectorAll('.cookie-consent-popup')).toHaveLength(1);
    expect(wrapper.querySelectorAll('div > p')).toHaveLength(1);
    expect(wrapper.querySelectorAll('p a')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.btn')).toHaveLength(2);
  });

  describe('with cookies accepted', () => {
    beforeEach(() => {
      const utils = renderWithContext(<CookieConsentPopup />, {
        initialState: { shell: { acceptsCookies: true } },
      });
      wrapper = utils.container;
    });

    it('does not render', () => {
      expect(wrapper.querySelectorAll('.cookie-consent-popup')).toHaveLength(1);
    });
  });

  describe('with cookies declined', () => {
    beforeEach(() => {
      const utils = renderWithContext(<CookieConsentPopup />, {
        initialState: { shell: { acceptsCookies: false } },
      });
      wrapper = utils.container;
    });

    it('does not render', () => {
      expect(wrapper.querySelectorAll('.cookie-consent-popup')).toHaveLength(1);
    });
  });
});
