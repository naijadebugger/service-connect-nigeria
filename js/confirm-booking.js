import { bookingDetails } from './api.js';

/* Mock logged-in customer (the account viewing this booking flow) —
   not part of api.js, so kept local to the page. */
const currentUser = {
  name: 'Adaeze Obi',
  role: 'Customer',
  avatarUrl: 'https://picsum.photos/200?random=12',
};

const formatNaira = (amount) =>
  '₦' + Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ---------------------------------------------------------------- */
/* Shell: sidebar + navbar                                          */
/* ---------------------------------------------------------------- */

function mountShell() {
  const app = document.querySelector('.sc-app');

  const sidebar = SCSidebar({
    activeItem: 'Search Services',
    onNavigate: (label) => console.log('Navigate to', label),
    onPostJob: () => console.log('Post a Job clicked'),
    onLogout: () => console.log('Logout clicked'),
  });
  app.appendChild(sidebar);

  const main = document.createElement('div');
  main.className = 'sc-main';

  const navbar = SCNavbar({
    variant: 'portal',
    user: currentUser,
    hasNotification: true,
    onSearch: (q) => console.log('Search:', q),
    onNotification: () => console.log('Notifications clicked'),
  });
  main.appendChild(navbar);

  const content = document.createElement('div');
  content.className = 'sc-main__content';
  main.appendChild(content);

  app.appendChild(main);
  return content;
}

/* ---------------------------------------------------------------- */
/* Page header                                                      */
/* ---------------------------------------------------------------- */

function buildPageHeader() {
  const header = document.createElement('div');
  header.className = 'sc-page-header';
  header.innerHTML = `
    <a href="/services" class="sc-back-link">&larr; Back to Search</a>
    <h1 class="sc-page-title">Confirm Your Booking</h1>`;
  return header;
}

/* ---------------------------------------------------------------- */
/* Left column — artisan summary + pricing                          */
/* ---------------------------------------------------------------- */

function buildArtisanSummary(data) {
  const card = document.createElement('div');
  card.className = 'sc-artisan-summary';

  const badgesHtml = data.artisanBadges
    .map((b) => `<span class="sc-badge-pill">${b}</span>`)
    .join('');

  card.innerHTML = `
    <div class="sc-artisan-summary__image">
      <img src="${data.artisanAvatar}" alt="${data.artisanName}">
      ${data.verified ? `
        <span class="sc-verified-badge">
          <span aria-hidden="true">✓</span> Verified Pro
        </span>` : ''}
    </div>
    <div class="sc-artisan-summary__body">
      <p class="sc-artisan-summary__name">${data.artisanName}</p>
      <p class="sc-artisan-summary__trade">${data.artisanTrade}</p>
      <div class="sc-artisan-summary__meta">
        <span class="sc-artisan-summary__rating">
          <span class="sc-artisan-summary__rating-star" aria-hidden="true">★</span>
          ${data.artisanRating}
        </span>
        <span>(${data.artisanReviews} reviews)</span>
        <span>📍 ${data.artisanLocation}</span>
      </div>
      <div class="sc-artisan-summary__badges">${badgesHtml}</div>
    </div>`;

  return card;
}

function buildPricingCard(pricing) {
  const card = document.createElement('div');
  card.className = 'sc-pricing-card';
  card.innerHTML = `
    <h3 class="sc-pricing-card__title">Pricing Summary</h3>
    <div class="sc-pricing-row">
      <span>Service Call Base Fee</span>
      <span class="sc-pricing-row__value">${formatNaira(pricing.baseCallFee)}</span>
    </div>
    <div class="sc-pricing-row">
      <span>Estimated Labor (min)</span>
      <span class="sc-pricing-row__value">${formatNaira(pricing.estimatedLabourMin)}</span>
    </div>
    <div class="sc-pricing-row sc-pricing-row--total">
      <span>Estimated Total</span>
      <span class="sc-pricing-row__value">${formatNaira(pricing.estimatedTotal)}</span>
    </div>
    <p class="sc-pricing-card__note">*Final price may vary based on actual work required and material costs.</p>`;
  return card;
}

/* ---------------------------------------------------------------- */
/* Right column — booking form                                      */
/* ---------------------------------------------------------------- */

function buildSlotField() {
  const wrapper = document.createElement('div');
  wrapper.className = 'sc-field';
  wrapper.innerHTML = `
    <label class="sc-field__label" for="sc-slot">Select Time Slot</label>
    <div class="sc-field__wrapper">
      <select id="sc-slot" class="sc-input" style="appearance:none;">
        <option value="">Select a slot</option>
        <option value="8-10">8:00 AM – 10:00 AM</option>
        <option value="10-12">10:00 AM – 12:00 PM</option>
        <option value="12-2">12:00 PM – 2:00 PM</option>
        <option value="2-4">2:00 PM – 4:00 PM</option>
        <option value="4-6">4:00 PM – 6:00 PM</option>
      </select>
      <span class="sc-field__icon sc-field__icon--right" aria-hidden="true">🕐</span>
    </div>`;
  return wrapper;
}

function buildPhotoUpload() {
  const wrapper = document.createElement('div');
  wrapper.className = 'sc-field';

  const label = document.createElement('label');
  label.className = 'sc-field__label';
  label.textContent = 'Upload Photos of the Issue';
  wrapper.appendChild(label);

  const row = document.createElement('div');
  row.className = 'sc-photo-upload';

  const thumb = document.createElement('div');
  thumb.className = 'sc-photo-thumb';
  thumb.innerHTML = `
    <img src="https://picsum.photos/200/200?random=44" alt="Uploaded photo of the issue">
    <button type="button" class="sc-photo-thumb__remove" aria-label="Remove photo">✕</button>`;
  thumb.querySelector('.sc-photo-thumb__remove').addEventListener('click', () => thumb.remove());
  row.appendChild(thumb);

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'sc-photo-add';
  addBtn.innerHTML = `<span class="sc-photo-add__icon" aria-hidden="true">📷</span> Add Photo`;
  addBtn.addEventListener('click', () => console.log('Open file picker'));
  row.appendChild(addBtn);

  wrapper.appendChild(row);
  return wrapper;
}

function buildBookingForm() {
  const form = document.createElement('form');
  form.className = 'sc-booking-form';
  form.noValidate = true;

  // Date + Time row
  const topRow = document.createElement('div');
  topRow.className = 'sc-form-row';

  const dateField = SCField({
    label: 'Select Date',
    type: 'date',
    id: 'sc-date',
    required: true,
  });
  topRow.appendChild(dateField);
  topRow.appendChild(buildSlotField());
  form.appendChild(topRow);

  // Problem description
  const descField = SCField({
    label: 'Problem Description',
    type: 'textarea',
    id: 'sc-description',
    placeholder: "Please describe the issue in detail (e.g., location of leak, type of pipe, how long it's been happening)...",
    rows: 4,
  });
  form.appendChild(descField);

  // Photo upload
  form.appendChild(buildPhotoUpload());

  // Actions
  const actions = document.createElement('div');
  actions.className = 'sc-booking-form__actions';

  const confirmBtn = SCButton({
    label: 'Confirm Booking',
    variant: 'primary',
    size: 'lg',
    iconEnd: '&rarr;',
    type: 'submit',
  });
  const cancelBtn = SCButton({
    label: 'Cancel',
    variant: 'outline',
    size: 'lg',
    type: 'button',
    href: '/services',
  });

  actions.appendChild(confirmBtn);
  actions.appendChild(cancelBtn);
  form.appendChild(actions);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    setButtonLoading(confirmBtn, true);
    // Simulated submit — wire this up to your real booking endpoint.
    setTimeout(() => {
      setButtonLoading(confirmBtn, false);
      console.log('Booking confirmed', {
        date: dateField.getValue(),
        slot: form.querySelector('#sc-slot').value,
        description: descField.getValue(),
      });
    }, 900);
  });

  return form;
}

/* ---------------------------------------------------------------- */
/* Assemble page                                                    */
/* ---------------------------------------------------------------- */

function renderBookingPage() {
  const content = mountShell();
  content.appendChild(buildPageHeader());

  const layout = document.createElement('div');
  layout.className = 'sc-booking-layout';

  const leftCol = document.createElement('div');
  leftCol.className = 'sc-booking-artisan';
  leftCol.appendChild(buildArtisanSummary(bookingDetails));
  leftCol.appendChild(buildPricingCard(bookingDetails.pricing));

  layout.appendChild(leftCol);
  layout.appendChild(buildBookingForm());

  content.appendChild(layout);
}

document.addEventListener('DOMContentLoaded', renderBookingPage);
