// Carrie Kim, IBCLC — shared site behavior

(function mobileMenu() {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('nav.primary');
  if (!toggle || !nav) return;

  function closeMenu() {
    if (!nav.classList.contains('open')) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Also close on any nav link tap, so choosing a page doesn't leave the
  // menu open underneath the page it navigates to.
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // The open mobile menu lives inside the header, so on a small screen it
  // can pin itself across most of the viewport while the page scrolls
  // underneath it. Close it as soon as the page moves. Three redundant
  // triggers, since a plain `scroll` listener alone was reported not
  // firing reliably on at least one real mobile browser:
  //  1. touchmove fires the instant a drag starts, before any scroll
  //     offset has actually changed.
  //  2. scroll, the direct signal, kept as a fallback.
  //  3. an IntersectionObserver on a 1px sentinel at the very top of the
  //     document, which reports "scrolled away from the top" independent
  //     of scroll-event timing/throttling.
  window.addEventListener('touchmove', closeMenu, { passive: true });
  window.addEventListener('scroll', closeMenu, { passive: true });

  var sentinel = document.getElementById('scroll-sentinel');
  if (sentinel && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) closeMenu();
      });
    }, { threshold: 0 });
    io.observe(sentinel);
  }
})();

// The Thread — draws in once per element, first time it scrolls into view.
// Per brand/identity/pattern.md: one moment of motion in the identity, never repeats,
// and is fully skipped under prefers-reduced-motion.
(function threadDrawIn() {
  var paths = document.querySelectorAll('.js-thread-draw');
  if (!paths.length) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  paths.forEach(function (path) {
    // Nodes are real HTML elements (siblings of the SVG in .thread-wrap), not
    // SVG circles, so the line's non-uniform scaling can't stretch them into ellipses.
    var wrap = path.closest('.thread-wrap');
    var nodes = wrap ? wrap.querySelectorAll('.thread-node') : [];

    if (reduced) {
      nodes.forEach(function (n) { n.style.opacity = '1'; });
      return;
    }

    var len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    nodes.forEach(function (n) { n.style.transition = 'opacity .5s ease'; });

    var played = false;
    function play() {
      if (played) return;
      played = true;
      path.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(.22,.61,.36,1)';
      path.style.strokeDashoffset = '0';
      setTimeout(function () {
        nodes.forEach(function (n, i) {
          setTimeout(function () { n.style.opacity = '1'; }, i * 120);
        });
      }, 1100);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) play(); });
    }, { threshold: 0.5 });
    io.observe(path);
  });
})();
