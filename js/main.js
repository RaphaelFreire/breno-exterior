const whatsappBase = 'https://api.whatsapp.com/send?phone=5519996963474&text=';
const defaultMessage = 'Olá! Vi a página sobre restituição de Imposto de Renda para aposentados e pensionistas residentes no exterior e gostaria de saber se tenho direito à restituição.';

function trackEvent(name, details = {}) {
  if (typeof window.va === 'function') window.va('event', { name, ...details });
}

document.querySelectorAll('.js-track').forEach((element) => {
  element.addEventListener('click', () => trackEvent(element.dataset.event || 'cta_click'));
});

document.getElementById('leadForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const time = document.getElementById('time').value;
  const details = [name && `Meu nome é ${name}.`, phone && `Meu WhatsApp é ${phone}.`, time && `Prefiro atendimento no período da ${time.toLowerCase()}.`].filter(Boolean).join(' ');
  trackEvent('form_submit', { completed_fields: [name, phone, time].filter(Boolean).length });
  window.open(whatsappBase + encodeURIComponent(`${defaultMessage}${details ? ` ${details}` : ''}`), '_blank', 'noopener');
});

document.getElementById('currentYear').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('#mainNav .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('mainNav');
    if (menu.classList.contains('show') && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});
