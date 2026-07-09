/**
 * ServiceConnect — Artisan Card Component
 *
 * Two layout variants:
 *   'grid'    — portrait card with top image (Search/Services page)
 *   'booking' — horizontal row card (My Bookings page)
 *
 * Usage — grid card:
 *   const card = SCArtisanCard({
 *     name, role, rating, reviewCount,
 *     location, price, priceUnit,
 *     imageUrl, verified,
 *     onBook, onViewProfile,
 *   })
 *
 * Usage — booking card:
 *   const card = SCBookingCard({
 *     name, service, dateTime, location,
 *     status, avatarUrl,
 *     onContact,
 *   })
 */

function SCArtisanCard({
  name         = 'Artisan Name',
  role         = '',
  rating       = null,
  reviewCount  = 0,
  location     = '',
  price        = null,
  priceUnit    = '/hr',
  imageUrl     = null,
  verified     = false,
  experience   = null,
  onBook       = null,
  onViewProfile = null,
  wishlist     = false,
} = {}) {
  const card = document.createElement('article');
  card.className = 'sc-card';
  card.setAttribute('aria-label', `Artisan: ${name}`);

  // ── Image area ─────────────────────────────────────────
  const imgWrap = document.createElement('div');
  imgWrap.className = 'sc-card__image';

  if (imageUrl) {
    const img = document.createElement('img');
    img.src   = imageUrl;
    img.alt   = `${name} — ${role}`;
    img.loading = 'lazy';
    imgWrap.appendChild(img);
  } else {
    // Placeholder gradient
    imgWrap.style.background = 'linear-gradient(135deg, #1E293B 0%, #334155 100%)';
    const placeholder = document.createElement('div');
    placeholder.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;opacity:.3';
    placeholder.textContent = '👷';
    imgWrap.appendChild(placeholder);
  }

  // Rating badge
  if (rating !== null) {
    const badge = document.createElement('div');
    badge.className = 'sc-card__rating-badge';
    badge.innerHTML = `<span class="sc-card__rating-star">★</span> ${rating}`;
    badge.setAttribute('aria-label', `Rating: ${rating} out of 5`);
    imgWrap.appendChild(badge);
  }

  // Wishlist toggle
  const wishBtn = document.createElement('button');
  wishBtn.className = 'sc-card__wishlist';
  wishBtn.setAttribute('aria-label', wishlist ? 'Remove from favourites' : 'Add to favourites');
  wishBtn.setAttribute('aria-pressed', String(wishlist));
  wishBtn.textContent = wishlist ? '❤️' : '🤍';
  wishBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isFav = wishBtn.getAttribute('aria-pressed') === 'true';
    wishBtn.setAttribute('aria-pressed', String(!isFav));
    wishBtn.textContent = !isFav ? '❤️' : '🤍';
    wishBtn.setAttribute('aria-label', !isFav ? 'Remove from favourites' : 'Add to favourites');
  });
  imgWrap.appendChild(wishBtn);
  card.appendChild(imgWrap);

  // ── Body ───────────────────────────────────────────────
  const body = document.createElement('div');
  body.className = 'sc-card__body';

  // Name + verified
  const nameEl = document.createElement('div');
  nameEl.className = 'sc-card__name';
  nameEl.innerHTML = _escape(name) + (verified ? ' <span title="Verified Pro" aria-label="Verified Pro" style="color:var(--color-primary)">✔</span>' : '');
  body.appendChild(nameEl);

  // Role
  if (role) {
    const roleEl = document.createElement('div');
    roleEl.className   = 'sc-card__role';
    roleEl.textContent = role;
    body.appendChild(roleEl);
  }

  // Meta (reviews + location)
  const meta = document.createElement('div');
  meta.className = 'sc-card__meta';
  if (reviewCount) {
    const rev = document.createElement('span');
    rev.className   = 'sc-card__meta-item';
    rev.innerHTML   = `<span aria-hidden="true">★</span> ${reviewCount} reviews`;
    meta.appendChild(rev);
  }
  if (experience) {
    const exp = document.createElement('span');
    exp.className   = 'sc-card__meta-item';
    exp.innerHTML   = `<span aria-hidden="true">🕐</span> ${_escape(experience)}`;
    meta.appendChild(exp);
  }
  if (meta.children.length) body.appendChild(meta);

  // Price + location tag (matches the coloured pill on Search Services cards)
  if (price !== null || location) {
    const priceRow = document.createElement('div');
    priceRow.className = 'sc-card__price-row';

    if (price !== null) {
      const priceEl = document.createElement('div');
      priceEl.className = 'sc-card__price';
      priceEl.innerHTML = `STARTING FROM <strong>₦${Number(price).toLocaleString()}${priceUnit}</strong>`;
      priceRow.appendChild(priceEl);
    }

    if (location) {
      const tag = document.createElement('span');
      tag.className   = 'sc-card__location-tag';
      tag.textContent = location;
      priceRow.appendChild(tag);
    }

    body.appendChild(priceRow);
  }

  card.appendChild(body);

  // ── Actions ────────────────────────────────────────────
  const actions = document.createElement('div');
  actions.className = 'sc-card__actions';

  const bookBtn = SCButton({ label: 'Book Now', variant: 'navy', size: 'sm', onClick: onBook });
  actions.appendChild(bookBtn);

  if (onViewProfile) {
    const viewBtn = SCButton({ label: 'View Profile', variant: 'outline', size: 'sm', onClick: onViewProfile });
    actions.appendChild(viewBtn);
  }

  card.appendChild(actions);
  return card;
}

/**
 * Booking Card — horizontal layout used in My Bookings
 */
function SCBookingCard({
  name      = '',
  service   = '',
  dateTime  = '',
  location  = '',
  status    = 'scheduled',
  avatarUrl = null,
  onContact = null,
} = {}) {
  const card = document.createElement('article');
  card.className = 'sc-booking-card';
  card.setAttribute('aria-label', `Booking with ${name}`);

  // Avatar
  const avatar = SCAvatar({ src: avatarUrl, name, size: 'lg' });
  card.appendChild(avatar);

  // Info
  const info = document.createElement('div');
  info.className = 'sc-booking-card__info';

  info.innerHTML = `
    <div class="sc-booking-card__name">${_escape(name)}</div>
    <div class="sc-booking-card__service">${_escape(service)}</div>
    <div class="sc-booking-card__meta">
      ${dateTime ? `<span class="sc-booking-card__meta-item"><span aria-hidden="true">📅</span> ${_escape(dateTime)}</span>` : ''}
      ${location ? `<span class="sc-booking-card__meta-item"><span aria-hidden="true">📍</span> ${_escape(location)}</span>` : ''}
    </div>`;

  // Contact button
  if (onContact) {
    const contactBtn = SCButton({
      label:   'Contact Artisan',
      variant: 'navy',
      icon:    '📞',
      size:    'sm',
      onClick: onContact,
    });
    const actWrap = document.createElement('div');
    actWrap.className = 'sc-booking-card__actions';
    actWrap.appendChild(contactBtn);
    info.appendChild(actWrap);
  }

  card.appendChild(info);

  // Status badge
  const statusWrap = document.createElement('div');
  statusWrap.className = 'sc-booking-card__status';
  statusWrap.appendChild(SCBadgeFromStatus(status));
  card.appendChild(statusWrap);

  return card;
}

function _escape(str = '') {
  return String(str).replace(/[&<>"']/g, (c) =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])
  );
}

/**
* USAGE MAP
  SCArtisanCard ('grid')    : Find Expert Artisans / Search Services results
  grid, Home page "Featured Artisans" section,
   public Services listing page
  SCBookingCard ('booking') : My Bookings (Active/Pending/History tabs),
   Customer Dashboard "Active Bookings" panel

 */