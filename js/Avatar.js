/**
 * ServiceConnect — Avatar Component
 *
 * Renders a person's avatar: a photo if one is available, otherwise a
 * coloured circle with initials. Used anywhere a user/artisan/customer
 * needs a small visual identifier.
 *
 * Usage:
 *   const avatar = SCAvatar({ src, name, size, status })
 *
 * Config:
 *   src     : image URL (optional — falls back to initials)
 *   name    : full name — used to generate initials, alt text, and aria-label
 *   size    : 'sm' | 'md' (default) | 'lg'
 *   status  : 'online' | null — adds a small presence dot, bottom-right
 */

function SCAvatar({
  src     = null,
  name    = '',
  size    = 'md',
  status  = null,
  classes = '',
} = {}) {
  const el = document.createElement('div');
  el.className = [
    'sc-avatar',
    `sc-avatar--${size}`,
    classes,
  ].filter(Boolean).join(' ');
  el.setAttribute('aria-label', name || 'User avatar');

  if (src) {
    const img = document.createElement('img');
    img.src     = src;
    img.alt     = name || '';
    img.loading = 'lazy';
    el.appendChild(img);
  } else {
    el.classList.add('sc-avatar--initials');
    el.style.background = _colorFromName(name);
    el.textContent = _getInitials(name);
  }

  if (status) {
    const dot = document.createElement('span');
    dot.className = `sc-avatar__status sc-avatar__status--${status}`;
    dot.setAttribute('aria-hidden', 'true');
    el.appendChild(dot);
  }

  return el;
}

function _getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('');
}

// Deterministic pastel colour so the same name always renders the same colour
const SC_AVATAR_PALETTE = ['#93C5FD', '#FCA5A5', '#FCD34D', '#6EE7B7', '#C4B5FD', '#F9A8D4'];

function _colorFromName(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return SC_AVATAR_PALETTE[Math.abs(hash) % SC_AVATAR_PALETTE.length];
}

/**
 * USAGE MAP
 * ────────────────────────────────────────────────────────────────
 * Photo avatar    : portal Navbar user menu (all dashboards), Booking
 *                    cards (My Bookings, Customer Dashboard), Artisan
 *                    public profile header, table rows where a photo
 *                    is on file (Job History, Booking Management)
 * Initials avatar : User Management table rows (e.g. "OA", "NI", "TY"),
 *                    Reviews without a photo (e.g. "E", "CN"),
 *                    Recent Services / Financials table rows
 *                    (e.g. "FA", "JE", "SO")
 * status="online" : not used in current screens — wired up for a future
 *                    "artisan online now" indicator
 */