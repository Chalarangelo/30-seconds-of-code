const persistKey = 'persist:30-sec-app@shell';

let initialState = {
  acceptsCookies: undefined,
};

const updateConsent = () => {
  // eslint-disable-next-line camelcase, no-undef
  gtag('consent', 'update', { analytics_storage: 'granted' });
};

try {
  const persistedData = window.localStorage.getItem(persistKey);
  initialState = JSON.parse(persistedData) || initialState;
} catch (e) {
  console.error(e);
}

const { acceptsCookies } = initialState;

const cookieConsentPopup = document.querySelector('.cookie-consent-popup');
const cookieConsentCheckbox = document.querySelector(
  '.cookie-consent-checkbox'
);

if (typeof acceptsCookies === 'undefined') {
  if (cookieConsentPopup) {
    cookieConsentPopup.classList.remove('hidden');

    document
      .getElementById('cookie-consent-accept')
      .addEventListener('click', () => {
        window.localStorage.setItem(
          persistKey,
          JSON.stringify({ acceptsCookies: true })
        );
        cookieConsentPopup.classList.add('hidden');
        if (cookieConsentCheckbox) cookieConsentCheckbox.checked = true;
        updateConsent();
      });

    document
      .getElementById('cookie-consent-decline')
      .addEventListener('click', () => {
        window.localStorage.setItem(
          persistKey,
          JSON.stringify({ acceptsCookies: false })
        );
        cookieConsentPopup.classList.add('hidden');
        if (cookieConsentCheckbox) cookieConsentCheckbox.checked = false;
      });
  }
} else if (acceptsCookies) updateConsent();

if (cookieConsentCheckbox) {
  cookieConsentCheckbox.checked = acceptsCookies;
  cookieConsentCheckbox.addEventListener('change', () => {
    window.localStorage.setItem(
      persistKey,
      JSON.stringify({ acceptsCookies: !acceptsCookies })
    );
    setTimeout(() => window.location.reload(), 300);
  });
}
