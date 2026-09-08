import * as CookieConsent from 'vanilla-cookieconsent';

const gtmId = import.meta.env.VITE_GTM_ID;

function syncGtm() {
  const analytics = CookieConsent.acceptedCategory('analytics');
  window.dataLayer = window.dataLayer || [];
  const gtag = window.gtag || ((...args) => window.dataLayer.push(args));
  window.gtag = gtag;
  gtag('consent', 'update', { analytics_storage: analytics ? 'granted' : 'denied', ad_storage: analytics ? 'granted' : 'denied', ad_user_data: analytics ? 'granted' : 'denied', ad_personalization: analytics ? 'granted' : 'denied' });
  if (!analytics || !gtmId || document.getElementById('gtm-script')) return;
  const script = document.createElement('script'); script.id = 'gtm-script'; script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`; document.head.appendChild(script);
}

export function initCookieConsent() {
  void CookieConsent.run({
    categories: { necessary: { enabled: true, readOnly: true }, analytics: {} },
    onFirstConsent: syncGtm,
    onConsent: syncGtm,
    onChange: syncGtm,
    language: { default: 'en', translations: { en: { consentModal: { title: 'We use cookies', description: 'Essential cookies keep this example working. Analytics cookies are optional.', acceptAllBtn: 'Accept all', acceptNecessaryBtn: 'Reject analytics', showPreferencesBtn: 'Manage preferences' }, preferencesModal: { title: 'Cookie preferences', acceptAllBtn: 'Accept all', acceptNecessaryBtn: 'Reject analytics', savePreferencesBtn: 'Save preferences', closeIconLabel: 'Close', sections: [] } } } },
  });
}
