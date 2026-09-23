(() => {
  const STORAGE_KEY = 'aspirarafondo_analytics_consent';
  const MEASUREMENT_ID = 'G-9DMR96K17Y';

  function loadAnalytics() {
    if (window.__aspirarafondoAnalyticsLoaded) return;
    window.__aspirarafondoAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, { anonymize_ip: true });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  function hideBanner() {
    document.getElementById('cookie-consent')?.remove();
  }

  function choose(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (_) {}
    hideBanner();
    if (value === 'accepted') loadAnalytics();
  }

  function showBanner() {
    if (document.getElementById('cookie-consent')) return;
    const banner = document.createElement('section');
    banner.id = 'cookie-consent';
    banner.className = 'cookie-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Preferencias de cookies');
    banner.innerHTML = '<div class="cookie-consent__copy"><strong>Tu privacidad</strong><p>Usamos cookies analíticas de Google Analytics solo si las aceptas. Nos ayudan a conocer qué contenidos resultan útiles.</p><a href="/cookies.html">Información sobre cookies</a></div><div class="cookie-consent__actions"><button type="button" data-cookie-choice="rejected">Rechazar</button><button type="button" data-cookie-choice="accepted">Aceptar</button></div>';
    banner.querySelectorAll('[data-cookie-choice]').forEach((button) => {
      button.addEventListener('click', () => choose(button.dataset.cookieChoice));
    });
    document.body.appendChild(banner);
  }

  function start() {
    let choice = null;
    try { choice = localStorage.getItem(STORAGE_KEY); } catch (_) {}
    if (choice === 'accepted') loadAnalytics();
    else if (choice !== 'rejected') showBanner();
    document.querySelectorAll('[data-open-cookie-settings]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
        showBanner();
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
