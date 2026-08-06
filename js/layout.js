export function initLayout(activePage) {
  const sidebarContainer = document.getElementById('sidebar-container');
  const navbarContainer = document.getElementById('navbar-container');

  if (sidebarContainer) {
    sidebarContainer.innerHTML = `
      <aside class="sc-sidebar">
        <div class="sc-sidebar__brand">
          <div class="sc-sidebar__brand-icon">⚙</div>
          <div class="sc-sidebar__brand-text">
            <span class="sc-sidebar__brand-name">ServiceConnect</span>
            <span class="sc-sidebar__brand-sub">ADMIN DASHBOARD</span>
          </div>
        </div>
        <nav class="sc-sidebar__nav">
          <a href="index.html" class="sc-sidebar__nav-item ${activePage === 'overview' ? 'sc-sidebar__nav-item--active' : ''}">
            <span class="sc-sidebar__nav-icon">▦</span>
            <span class="sc-sidebar__nav-label">Overview</span>
          </a>
          <a href="users.html" class="sc-sidebar__nav-item ${activePage === 'users' ? 'sc-sidebar__nav-item--active' : ''}">
            <span class="sc-sidebar__nav-icon">👤</span>
            <span class="sc-sidebar__nav-label">User Management</span>
          </a>
          <a href="verification.html" class="sc-sidebar__nav-item ${activePage === 'verification' ? 'sc-sidebar__nav-item--active' : ''}">
            <span class="sc-sidebar__nav-icon">🛡</span>
            <span class="sc-sidebar__nav-label">Artisan Verification</span>
          </a>
          <a href="bookings.html" class="sc-sidebar__nav-item ${activePage === 'bookings' ? 'sc-sidebar__nav-item--active' : ''}">
            <span class="sc-sidebar__nav-icon">📅</span>
            <span class="sc-sidebar__nav-label">Booking Management</span>
          </a>
          <a href="reviews.html" class="sc-sidebar__nav-item ${activePage === 'reviews' ? 'sc-sidebar__nav-item--active' : ''}">
            <span class="sc-sidebar__nav-icon">★</span>
            <span class="sc-sidebar__nav-label">Reviews</span>
          </a>
          <a href="financials.html" class="sc-sidebar__nav-item ${activePage === 'financials' ? 'sc-sidebar__nav-item--active' : ''}">
            <span class="sc-sidebar__nav-icon">💰</span>
            <span class="sc-sidebar__nav-label">Financials</span>
          </a>
          <a href="settings.html" class="sc-sidebar__nav-item ${activePage === 'settings' ? 'sc-sidebar__nav-item--active' : ''}">
            <span class="sc-sidebar__nav-icon">⚙</span>
            <span class="sc-sidebar__nav-label">System Settings</span>
          </a>
        </nav>
        <div class="sc-sidebar__bottom">
          <button class="sc-sidebar__cta">＋ Post a Job</button>
          <button class="sc-sidebar__logout">
            <span>↩</span><span>Logout</span>
          </button>
        </div>
      </aside>
    `;
  }

  if (navbarContainer) {
    navbarContainer.innerHTML = `
      <header class="sc-navbar">
        <p class="admin-navbar-title">ServiceConnect Admin</p>
        <div class="sc-navbar__search">
          <span class="sc-navbar__search-icon">🔍</span>
          <input
            class="sc-navbar__search-input"
            type="search"
            placeholder="Search..."
            aria-label="Search platform"
          />
        </div>
        <div class="sc-navbar__actions">
          <button class="sc-navbar__icon-btn" aria-label="Notifications">
            🔔
            <span class="sc-navbar__badge"></span>
          </button>
          <button class="sc-navbar__icon-btn" aria-label="Help">❓</button>
          <div class="sc-navbar__divider"></div>
          <div class="sc-navbar__user">
            <img
              class="admin-avatar"
              src="https://ui-avatars.com/api/?name=Victor+Ugwu&background=0B2240&color=fff&size=36"
              alt="Admin avatar"
              width="36" height="36"
            />
          </div>
        </div>
      </header>
    `;
  }

// if (navbarContainer) {
//     navbarContainer.innerHTML = `
//       <header class="sc-navbar">
//         <p class="admin-navbar-title">Admin Central</p> <!-- Changed from ServiceConnect Admin -->
//         <div class="sc-navbar__search">
//           <span class="sc-navbar__search-icon">🔍</span>
//           <input
//             class="sc-navbar__search-input"
//             type="search"
//             placeholder="Search..."
//             aria-label="Search platform"
//           />
//         </div>
//         <div class="sc-navbar__actions">
//           <button class="sc-navbar__icon-btn" aria-label="Notifications">
//             🔔
//             <span class="sc-navbar__badge"></span>
//           </button>
//           <button class="sc-navbar__icon-btn" aria-label="Help">❓</button>
//           <div class="sc-navbar__divider"></div>
//           <div class="sc-navbar__user">
//             <img
//               class="admin-avatar"
//               src="https://ui-avatars.com/api/?name=Victor+Ugwu&background=0B2240&color=fff&size=36"
//               alt="Admin avatar"
//               width="36" height="36"
//             />
//           </div>
//         </div>
//       </header>
//     `;
// }
}