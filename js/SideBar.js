/**
 * ServiceConnect — Sidebar Component
 *
 * Usage:
 *   const sidebar = SCSidebar({ activeItem, onNavigate, onPostJob, onLogout })
 *   document.querySelector('.sc-layout').prepend(sidebar)
 *
 * Config:
 *   activeItem  : string — label of the active nav item
 *   onNavigate  : callback(item) — called with nav item label on click
 *   onPostJob   : callback()
 *   onLogout    : callback()
 *   navItems    : optional override array of { icon, label, href }
 */

const SC_SIDEBAR_DEFAULT_ITEMS = [
  { icon: '⊞',  label: 'Dashboard',      href: '/dashboard' },
  { icon: '🔍', label: 'Search Services', href: '/services' },
  { icon: '📅', label: 'My Bookings',     href: '/bookings' },
  { icon: '🕐', label: 'Service History', href: '/history' },
  { icon: '⭐', label: 'Reviews',          href: '/reviews' },
  { icon: '⚙',  label: 'Settings',        href: '/settings' },
];

function SCSidebar({
  activeItem  = 'Dashboard',
  onNavigate  = null,
  onPostJob   = null,
  onLogout    = null,
  navItems    = null,
  brandName   = 'ServiceConnect',
  brandSub    = 'Customer Portal',
} = {}) {
  const aside = document.createElement('aside');
  aside.className = 'sc-sidebar';
  aside.setAttribute('role', 'navigation');
  aside.setAttribute('aria-label', 'Sidebar navigation');

  //  Brand 
  aside.innerHTML = `
    <div class="sc-sidebar__brand" aria-label="${brandName}">
      <div class="sc-sidebar__brand-icon" aria-hidden="true">🔧</div>
      <div class="sc-sidebar__brand-text">
        <div class="sc-sidebar__brand-name">${brandName}</div>
        <div class="sc-sidebar__brand-sub">${brandSub}</div>
      </div>
    </div>`;

  // Nav 
  const nav  = document.createElement('nav');
  nav.className = 'sc-sidebar__nav';

  const items = navItems || SC_SIDEBAR_DEFAULT_ITEMS;

  items.forEach(({ icon, label, href }) => {
    const el = document.createElement('a');
    el.href      = href || '#';
    el.className = 'sc-sidebar__nav-item' +
      (label === activeItem ? ' sc-sidebar__nav-item--active' : '');
    el.setAttribute('aria-label', label);
    if (label === activeItem) el.setAttribute('aria-current', 'page');

    el.innerHTML = `
      <span class="sc-sidebar__nav-icon" aria-hidden="true">${icon}</span>
      <span class="sc-sidebar__nav-label">${label}</span>`;

    el.addEventListener('click', (e) => {
      if (!href || href === '#') e.preventDefault();
      // Update active state
      nav.querySelectorAll('.sc-sidebar__nav-item').forEach((n) => {
        n.classList.remove('sc-sidebar__nav-item--active');
        n.removeAttribute('aria-current');
      });
      el.classList.add('sc-sidebar__nav-item--active');
      el.setAttribute('aria-current', 'page');

      if (onNavigate) onNavigate(label);
    });

    nav.appendChild(el);
  });

  aside.appendChild(nav);

  //  Bottom 
  const bottom = document.createElement('div');
  bottom.className = 'sc-sidebar__bottom';

  // Post a Job CTA
  const ctaBtn = document.createElement('button');
  ctaBtn.className = 'sc-sidebar__cta';
  ctaBtn.setAttribute('aria-label', 'Post a new job');
  ctaBtn.innerHTML = '<span aria-hidden="true">＋</span> Post a Job';
  ctaBtn.addEventListener('click', () => { if (onPostJob) onPostJob(); });
  bottom.appendChild(ctaBtn);

  // Logout
  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'sc-sidebar__logout';
  logoutBtn.setAttribute('aria-label', 'Log out');
  logoutBtn.innerHTML = '<span aria-hidden="true">↪</span> Logout';
  logoutBtn.addEventListener('click', () => { if (onLogout) onLogout(); });
  bottom.appendChild(logoutBtn);

  aside.appendChild(bottom);

  /**
   * Public API — update the active item programmatically
   */
  aside.setActive = (label) => {
    nav.querySelectorAll('.sc-sidebar__nav-item').forEach((n) => {
      const isActive = n.querySelector('.sc-sidebar__nav-label')?.textContent === label;
      n.classList.toggle('sc-sidebar__nav-item--active', isActive);
      if (isActive) n.setAttribute('aria-current', 'page');
      else          n.removeAttribute('aria-current');
    });
  };

  return aside;
}

/**
 * USAGE MAP — pass a `navItems` override per role; default items above are customer-only
 * ────────────────────────────────────────────────────────────────
 * Customer portal : Dashboard, Search Services, My Bookings, Service History,
 *                    Reviews, Settings  (uses SC_SIDEBAR_DEFAULT_ITEMS as-is)
 * Artisan portal  : Dashboard, Service Listings, Incoming Requests, Job History,
 *                    Ratings, Earnings, Settings  (override navItems + brandSub)
 * Admin portal    : Dashboard, User Management, Artisan Verification,
 *                    Booking Management, Reviews, Financials, System Settings
 *                    (override navItems + brandSub; onPostJob usually hidden
 *                    on admin, since admins don't post jobs)
 */