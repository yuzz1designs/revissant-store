// Revissant • Sidebar de filtros com animação (abre/fecha e empurra a grelha)
document.addEventListener('DOMContentLoaded', () => {
  const root   = document.querySelector('[data-rv-collection]');
  if (!root) return;

  const layout = root.querySelector('[data-rv-layout]');
  const btn    = root.querySelector('[data-rv-toggle]');
  const aside  = root.querySelector('[data-rv-sidebar]');
  const label  = root.querySelector('[data-rv-toggle-label]');

  if (!layout || !btn || !aside || !label) return;

  // Estado inicial a partir do URL (?filters=open)
  const params = new URLSearchParams(window.location.search);
  const initialOpen = params.get('filters') === 'open';

  /** @param {boolean} isOpen */
  const setOpen = (isOpen) => {
  layout.setAttribute('data-open', isOpen ? 'true' : 'false');
  btn.setAttribute('aria-expanded', String(isOpen));
  aside.setAttribute('aria-hidden', String(!isOpen));
  label.textContent = isOpen ? 'Hide Filters' : 'Show Filters';

  const url = new URL(window.location.href);
  if (isOpen) url.searchParams.set('filters', 'open');
  else url.searchParams.delete('filters');
  window.history.replaceState({}, '', url);
  };


  setOpen(initialOpen);

  btn.addEventListener('click', () => {
    const open = layout.getAttribute('data-open') === 'true';
    setOpen(!open);
  });

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && layout.getAttribute('data-open') === 'true') {
      setOpen(false);
    }
  });
});
