/**
 * ServiceConnect — Button Component
 * Usage:
 *   SCButton({ label, variant, size, icon, full, disabled, loading, onClick, href })
 *
 * Variants: 'primary' | 'navy' | 'outline' | 'outline-light' | 'ghost' | 'icon'
 * Sizes:    'sm' | 'md' (default) | 'lg'
 */

function SCButton({
  label    = '',
  variant  = 'primary',
  size     = 'md',
  icon     = null,       // HTML string e.g. '&#9993;' or SVG
  iconEnd  = null,       // icon after label
  full     = false,
  disabled = false,
  loading  = false,
  onClick  = null,
  href     = null,       // renders as <a> when provided
  type     = 'button',
  id       = null,
  classes  = '',
} = {}) {
  const tag = href ? 'a' : 'button';

  const cls = [
    'sc-btn',
    `sc-btn--${variant}`,
    size === 'sm' ? 'sc-btn--sm' : size === 'lg' ? 'sc-btn--lg' : '',
    full    ? 'sc-btn--full'    : '',
    loading ? 'sc-btn--loading' : '',
    classes,
  ].filter(Boolean).join(' ');

  const el = document.createElement(tag);
  el.className = cls;

  if (id)       el.id = id;
  if (disabled) el.setAttribute('disabled', '');
  if (loading)  el.setAttribute('aria-busy', 'true');

  if (tag === 'button') el.type = type;
  if (tag === 'a' && href) el.href = href;

  // Inner HTML
  const parts = [];
  if (icon)    parts.push(`<span class="sc-btn__icon sc-btn__icon--start" aria-hidden="true">${icon}</span>`);
  if (label)   parts.push(`<span class="sc-btn__label">${label}</span>`);
  if (iconEnd) parts.push(`<span class="sc-btn__icon sc-btn__icon--end" aria-hidden="true">${iconEnd}</span>`);
  el.innerHTML = parts.join('');

  if (onClick) el.addEventListener('click', onClick);

  return el;
}

/**
 * Convenience helpers
 */
const SCButtonPrimary = (opts) => SCButton({ variant: 'primary', ...opts });
const SCButtonNavy    = (opts) => SCButton({ variant: 'navy',    ...opts });
const SCButtonOutline = (opts) => SCButton({ variant: 'outline', ...opts });
const SCButtonGhost   = (opts) => SCButton({ variant: 'ghost',   ...opts });

/**
 * Set a button to loading state / unset it
 */
function setButtonLoading(btn, isLoading) {
  if (isLoading) {
    btn.classList.add('sc-btn--loading');
    btn.setAttribute('aria-busy', 'true');
    btn.disabled = true;
  } else {
    btn.classList.remove('sc-btn--loading');
    btn.removeAttribute('aria-busy');
    btn.disabled = false;
  }
}