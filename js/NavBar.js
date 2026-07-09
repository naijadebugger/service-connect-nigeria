/**
 * ServiceConnect — Navbar Component
 *
 * Two variants:
 *   'public'  — logo + nav links (Home, Services, Become an Artisan) + Login / Sign Up
 *   'portal'  — logo + search bar + notification icon + user avatar
 *
 * Usage:
 *   const nav = SCNavbar({ variant, activeLink, user, onSearch, onNotification })
 *   document.querySelector('.sc-main').prepend(nav)
 *
 * Config:
 *   variant      : 'public' | 'portal'   (default 'public')
 *   activeLink   : label string to mark active, e.g. 'Services'
 *   user         : { name, role, avatarUrl } — portal only
 *   onSearch     : callback(query) — portal only
 *   onNotification : callback()
 *   links        : array of { label, href } to override public nav links
 */

function SCNavbar({
  variant         = 'public',
  activeLink      = '',
  user            = null,
  onSearch        = null,
  onNotification  = null,
  links           = null,
  hasNotification = false,
} = {}) {
  const nav = document.createElement('nav');
  nav.className = 'sc-navbar';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');

  //  Logo 
  const logo = _buildLogo(variant);
  nav.appendChild(logo);

  if (variant === 'public') {
    _buildPublicNav(nav, activeLink, links);
  } else {
    _buildPortalNav(nav, user, onSearch, onNotification, hasNotification);
  }

  return nav;
}

//  Private helpers 

function _buildLogo(variant) {
  const a = document.createElement('a');
  a.href = '/';
  a.className = 'sc-navbar__logo';
  a.setAttribute('aria-label', 'ServiceConnect home');

  if (variant === 'portal') {
    // Simpler text-only logo for portal
    a.innerHTML = `
      <div class="sc-navbar__logo-icon" aria-hidden="true">🔧</div>
      <div>
        <span style="display:block;font-size:var(--font-base);font-weight:700;color:var(--color-navy)">ServiceConnect</span>
        <span class="sc-navbar__logo-sub">Nigeria Portal</span>
      </div>`;
  } else {
    a.innerHTML = `
      <span style="font-size:var(--font-lg);font-weight:700;color:var(--color-navy)">ServiceConnect</span>`;
  }

  return a;
}

function _buildPublicNav(nav, activeLink, customLinks) {
  const defaultLinks = [
    { label: 'Home',             href: '/' },
    { label: 'Services',         href: '/services' },
    { label: 'Become an Artisan',href: '/artisan' },
  ];
  const navLinks = customLinks || defaultLinks;

  // Links list
  const ul = document.createElement('ul');
  ul.className = 'sc-navbar__links';
  ul.setAttribute('role', 'list');

  navLinks.forEach(({ label, href }) => {
    const li  = document.createElement('li');
    const a   = document.createElement('a');
    a.href      = href;
    a.className = 'sc-navbar__link' + (label === activeLink ? ' sc-navbar__link--active' : '');
    a.textContent = label;
    if (label === activeLink) a.setAttribute('aria-current', 'page');
    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);

  // Auth buttons
  const actions = document.createElement('div');
  actions.className = 'sc-navbar__actions';

  const loginBtn  = SCButton({ label: 'Login',   variant: 'outline', size: 'sm', href: '/login' });
  const signupBtn = SCButton({ label: 'Sign Up',  variant: 'navy',   size: 'sm', href: '/signup' });

  actions.appendChild(loginBtn);
  actions.appendChild(signupBtn);
  nav.appendChild(actions);
}

function _buildPortalNav(nav, user, onSearch, onNotification, hasNotification) {
  // Search bar
  const searchWrap = document.createElement('div');
  searchWrap.className = 'sc-navbar__search';
  searchWrap.innerHTML = `
    <span class="sc-navbar__search-icon" aria-hidden="true">🔍</span>
    <input
      class   = "sc-navbar__search-input"
      type    = "search"
      placeholder = "Search for artisans..."
      aria-label  = "Search artisans"
    />`;

  const input = searchWrap.querySelector('input');
  if (onSearch) {
    input.addEventListener('input', (e) => onSearch(e.target.value));
  }
  nav.appendChild(searchWrap);

  // Actions
  const actions = document.createElement('div');
  actions.className = 'sc-navbar__actions';

  // Notification
  const notifBtn = document.createElement('button');
  notifBtn.className = 'sc-navbar__icon-btn';
  notifBtn.setAttribute('aria-label', 'Notifications');
  notifBtn.innerHTML = `🔔${hasNotification ? '<span class="sc-navbar__badge" aria-label="unread notifications"></span>' : ''}`;
  if (onNotification) notifBtn.addEventListener('click', onNotification);
  actions.appendChild(notifBtn);

  // Help
  const helpBtn = document.createElement('button');
  helpBtn.className = 'sc-navbar__icon-btn';
  helpBtn.setAttribute('aria-label', 'Help');
  helpBtn.innerHTML = '❓';
  actions.appendChild(helpBtn);

  // Divider
  const divider = document.createElement('div');
  divider.className = 'sc-navbar__divider';
  divider.setAttribute('aria-hidden', 'true');
  actions.appendChild(divider);

  // User
  if (user) {
    const userEl = document.createElement('div');
    userEl.className = 'sc-navbar__user';
    userEl.setAttribute('role', 'button');
    userEl.setAttribute('tabindex', '0');
    userEl.setAttribute('aria-label', `Account menu for ${user.name}`);

    const avatar = SCAvatar({
      src:   user.avatarUrl,
      name:  user.name,
      size:  'sm',
    });

    userEl.innerHTML = `
      <div class="sc-navbar__user-info">
        <span class="sc-navbar__user-name">${_escape(user.name)}</span>
        <span class="sc-navbar__user-role">${_escape(user.role || '')}</span>
      </div>`;
    userEl.prepend(avatar);
    actions.appendChild(userEl);
  } else {
    // Not logged in — show login
    actions.appendChild(
      SCButton({ label: 'Login', variant: 'outline', size: 'sm', href: '/login' })
    );
  }

  nav.appendChild(actions);
}

function _escape(str = '') {
  return str.replace(/[&<>"']/g, (c) =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])
  );
}

/**
 * USAGE MAP
 * ────────────────────────────────────────────────────────────────
 * variant 'public' : Home, Services listing, Public Artisan Profile,
 *                     Login, Sign Up, Role selection page
 * variant 'portal' : every logged-in dashboard-style page — Customer
 *                     (Dashboard, Search Services, My Bookings, Service
 *                     History, Reviews, Settings), Artisan (Dashboard,
 *                     Service Listings, Incoming Requests, Job History,
 *                     Ratings, Earnings), Admin (Dashboard, User Management,
 *                     Artisan Verification, Booking Management, Reviews,
 *                     Financials, System Settings)
 */