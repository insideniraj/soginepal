/* SOGI site — small, dependency-free behaviour */
(function () {
  var header = document.querySelector('.header');
  var burger = document.querySelector('.burger');
  if (burger && header) {
    burger.addEventListener('click', function () {
      var open = header.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.has-sub > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.matchMedia('(max-width:1080px)').matches) {
          var li = a.parentElement;
          if (!li.classList.contains('open')) { e.preventDefault(); li.classList.add('open'); }
        }
      });
    });
  }
  var onScroll = function () { if (header) header.classList.toggle('scrolled', window.scrollY > 10); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // reveal on scroll
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  // year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // enquiry form -> WhatsApp (routes to the right team)
  var form = document.getElementById('enquiry');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var type = d.get('type');
      var num = type === 'Installation (SOGI Projects)' || type === 'Repair / service' ? '9779705668833' : '9779705663388';
      var lines = [
        'Hello SOGI, I have an enquiry from the website.',
        '',
        'Enquiry: ' + type,
        'Name: ' + d.get('name'),
        'Phone: ' + d.get('phone'),
        d.get('city') ? 'City: ' + d.get('city') : '',
        d.get('business') ? 'I am a: ' + d.get('business') : '',
        '',
        'Details: ' + d.get('message')
      ].filter(function (l, i, arr) { return l !== '' || (arr[i - 1] !== ''); });
      window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  }
})();
