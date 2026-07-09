/**
 * ServiceConnect — Badge Component
 *
 * Small coloured pill used for statuses, categories, and inline tags.
 *
 * Two ways to use it:
 *   1. SCBadge({ label, tone })          — pick the tone yourself
 *   2. SCBadgeFromStatus(statusString)   — maps a known status word to a
 *                                          consistent tone automatically
 *
 * Usage:
 *   const badge = SCBadge({ label: 'Active', tone: 'success' })
 *   const badge = SCBadgeFromStatus('completed')
 *
 * Tones: 'success' | 'warning' | 'info' | 'error' | 'neutral' | 'verified'
 */

function SCBadge({
  label   = '',
  tone    = 'neutral',
  classes = '',
} = {}) {
  const el = document.createElement('span');
  el.className = ['sc-badge', `sc-badge--${tone}`, classes].filter(Boolean).join(' ');
  el.textContent = label;
  return el;
}

/**
 * Maps common status strings used across the app to a consistent tone,
 * so the same status word always renders the same way on every screen.
 */
const SC_STATUS_TONE_MAP = {
  active:        'success',
  completed:     'success',
  published:     'success',
  approved:      'success',
  paid:          'success',
  successful:    'success',

  pending:       'warning',
  processing:    'warning',

  scheduled:     'info',
  'in progress': 'info',
  confirmed:     'info',

  suspended:     'error',
  cancelled:     'error',
  reported:      'error',
  rejected:      'error',
};

function SCBadgeFromStatus(status = '') {
  const key   = String(status).toLowerCase().trim();
  const tone  = SC_STATUS_TONE_MAP[key] || 'neutral';
  const label = String(status).replace(/\b\w/g, (c) => c.toUpperCase());
  return SCBadge({ label, tone });
}

/**
 * USAGE MAP
 * ────────────────────────────────────────────────────────────────
 * success (green) : Active, Completed, Published, Approved, Paid,
 *                    Successful — User Management, Job History,
 *                    Booking Management, Review Moderation, Earnings
 *                    transactions
 * warning (orange): Pending, Processing — User Management,
 *                    Booking Management, Earnings, "NEW" request count
 * info (blue)     : Scheduled, In Progress, Confirmed — My Bookings,
 *                    Booking Management
 * error (red)     : Suspended, Cancelled, Reported, Rejected —
 *                    User Management, Job History, Review Moderation,
 *                    Booking Management
 * neutral (grey)  : fallback for any unlisted label — service category
 *                    tags (Plumbing, Electrical, Carpentry, Cleaning)
 *                    in Financials & Booking Management
 * verified        : "Verified Pro" tag — Artisan public profile,
 *                    Search Services artisan cards
 *
 * NOTE: route the "Verified Pro" badge and rating-page "NEW" badge
 * through SCBadge instead of hand-rolled markup, so they stay in sync
 * with the rest of the status system.
 */