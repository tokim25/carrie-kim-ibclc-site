// Google Analytics 4 tracking for carriekimibclc.com.
// Replace this with the site's real GA4 Measurement ID, for example: G-ABC123DEF4.
var GA_MEASUREMENT_ID = 'G-Y39751WMMJ';

(function analytics() {
  if (!/^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);

  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
  document.head.appendChild(tag);
})();

(function trackKeyActions() {
  var bookingUrl = 'https://curanatalhealth.intakeq.com/booking';
  var carrieEmail = 'mailto:carrie@curanatalhealth.com';

  function eventForLink(link) {
    var href = link.href || '';

    if (href.indexOf(bookingUrl) === 0) {
      return {
        name: 'book_consultation_click',
        params: {
          link_url: href,
          link_text: link.textContent.trim(),
          page_title: document.title
        }
      };
    }

    if (href.toLowerCase().indexOf(carrieEmail) === 0) {
      return {
        name: 'email_carrie_click',
        params: {
          link_url: href,
          link_text: link.textContent.trim(),
          page_title: document.title
        }
      };
    }

    return null;
  }

  function isPlainLeftClick(event) {
    return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest ? event.target.closest('a[href]') : null;
    if (!link || !window.gtag) return;

    var trackedEvent = eventForLink(link);
    if (!trackedEvent) return;

    if (!isPlainLeftClick(event) || link.target === '_blank') {
      window.gtag('event', trackedEvent.name, trackedEvent.params);
      return;
    }

    event.preventDefault();

    var navigated = false;
    function followLink() {
      if (navigated) return;
      navigated = true;
      window.location.href = link.href;
    }

    window.gtag('event', trackedEvent.name, Object.assign({}, trackedEvent.params, {
      event_callback: followLink,
      event_timeout: 1000
    }));

    setTimeout(followLink, 1100);
  });
})();
