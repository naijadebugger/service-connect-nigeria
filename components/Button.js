/**
 * ServiceConnect — Button Component
 * Usage:
 *   SCButton({ label, variant, size, icon, full, disabled, loading, onClick, href })
 *
 * Variants: 'primary' | 'navy' | 'danger' | 'success' | 'outline' | 'outline-light' | 'ghost' | 'icon'
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
const SCButtonDanger  = (opts) => SCButton({ variant: 'danger',  ...opts });
const SCButtonSuccess = (opts) => SCButton({ variant: 'success', ...opts });
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

/**
 * USAGE MAP — which variant to reach for, and where it shows up
 * ────────────────────────────────────────────────────────────────
 * primary (orange) : main page CTA — Post a Job, Book Now/Book Service,
 *                     Sign Up, Login, "I want to work", Confirm Booking,
 *                     Accept Job, Withdraw, Apply Filters, Get Started,
 *                     Post a Job Request
 * navy             : secondary-but-important action — Save Changes,
 *                     Invite User, Process All Payouts, Contact Artisan,
 *                     Details, "I want to hire", Quick Book, Upload Photo,
 *                     Call Support Now
 * danger (red)     : destructive/negative action — "Reject Request"
 *                     (Admin > Artisan Verification)
 * success (green)  : affirmative/approval action — "Approve Artisan"
 *                     (Admin > Artisan Verification)
 * outline          : low-emphasis / paired with a primary — View Profile,
 *                     View Details, Cancel, Reject (Incoming Requests —
 *                     a lighter-weight reject than Artisan Verification's),
 *                     Export Report/CSV, Reply, Remove,
 *                     Continue with Google, top-nav Login
 * ghost            : tertiary/text-only — Discard, "Load More Reviews"
 * icon             : icon-only — notification bell, message/chat icon, help "?"
 */