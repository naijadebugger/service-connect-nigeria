/**
 * ServiceConnect — Input / Form Field Component
 *
 * Returns a full field wrapper (label + input/textarea + hint/error).
 * If you only need the raw <input>, use SCInputRaw().
 *
 * Usage:
 *   const field = SCField({
 *     label, type, placeholder, id, value,
 *     hint, error, required,
 *     iconLeft, iconRight, onIconRightClick,
 *     onChange, onInput,
 *   })
 *
 * For textarea:
 *   const field = SCField({ type: 'textarea', rows: 4, ... })
 */

function SCField({
  label             = '',
  type              = 'text',
  id                = null,
  placeholder       = '',
  value             = '',
  hint              = '',
  error             = '',
  required          = false,
  disabled          = false,
  iconLeft          = null,    // HTML/emoji string
  iconRight         = null,
  onIconRightClick  = null,
  onChange          = null,
  onInput           = null,
  rows              = 4,       // textarea only
  classes           = '',
} = {}) {
  const fieldId = id || `sc-field-${Math.random().toString(36).slice(2, 8)}`;

  const wrapper = document.createElement('div');
  wrapper.className = `sc-field ${classes}`;

  //  Label 
  if (label) {
    const lbl = document.createElement('label');
    lbl.htmlFor   = fieldId;
    lbl.className = `sc-field__label${required ? ' sc-field__label--required' : ''}`;
    lbl.textContent = label;
    wrapper.appendChild(lbl);
  }

  //  Input wrapper 
  const inputWrap = document.createElement('div');
  inputWrap.className = 'sc-field__wrapper';

  // Left icon
  if (iconLeft) {
    const span = document.createElement('span');
    span.className = 'sc-field__icon sc-field__icon--left';
    span.innerHTML = iconLeft;
    span.setAttribute('aria-hidden', 'true');
    inputWrap.appendChild(span);
  }

  // Input or Textarea
  let inputEl;

  if (type === 'textarea') {
    inputEl = document.createElement('textarea');
    inputEl.className   = `sc-textarea${error ? ' sc-input--error' : ''}`;
    inputEl.rows        = rows;
    inputEl.placeholder = placeholder;
    inputEl.disabled    = disabled;
    if (value) inputEl.value = value;
  } else {
    inputEl = document.createElement('input');
    inputEl.type        = type;
    inputEl.className   = [
      'sc-input',
      iconLeft  ? 'sc-input--icon-left'  : '',
      iconRight ? 'sc-input--icon-right' : '',
      error     ? 'sc-input--error'      : '',
    ].filter(Boolean).join(' ');
    inputEl.placeholder = placeholder;
    inputEl.disabled    = disabled;
    if (value) inputEl.value = value;
  }

  inputEl.id = fieldId;
  if (required) inputEl.required = true;
  if (required) inputEl.setAttribute('aria-required', 'true');
  if (error)    inputEl.setAttribute('aria-invalid', 'true');

  if (onChange) inputEl.addEventListener('change', onChange);
  if (onInput)  inputEl.addEventListener('input',  onInput);

  inputWrap.appendChild(inputEl);

  // Right icon
  if (iconRight) {
    const span = document.createElement('span');
    span.className = 'sc-field__icon sc-field__icon--right';
    span.innerHTML = iconRight;
    span.setAttribute('aria-hidden', 'true');
    if (onIconRightClick) {
      span.style.pointerEvents = 'auto';
      span.style.cursor        = 'pointer';
      span.addEventListener('click', onIconRightClick);
    }
    inputWrap.appendChild(span);
  }

  wrapper.appendChild(inputWrap);

  //  Error / hint 
  if (error) {
    const err = document.createElement('span');
    err.className = 'sc-field__error';
    err.setAttribute('role', 'alert');
    err.textContent = error;
    wrapper.appendChild(err);
  } else if (hint) {
    const h = document.createElement('span');
    h.className   = 'sc-field__hint';
    h.textContent = hint;
    wrapper.appendChild(h);
  }

  /** Public API */
  wrapper.getInput = () => inputEl;
  wrapper.getValue = () => inputEl.value;
  wrapper.setValue = (v) => { inputEl.value = v; };
  wrapper.setError = (msg) => {
    inputEl.setAttribute('aria-invalid', 'true');
    inputEl.classList.add('sc-input--error');
    let errEl = wrapper.querySelector('.sc-field__error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'sc-field__error';
      errEl.setAttribute('role', 'alert');
      wrapper.appendChild(errEl);
    }
    errEl.textContent = msg;
  };
  wrapper.clearError = () => {
    inputEl.removeAttribute('aria-invalid');
    inputEl.classList.remove('sc-input--error');
    wrapper.querySelector('.sc-field__error')?.remove();
  };

  return wrapper;
}

/**
 * Bare <input> without the label/wrapper — for inline usage
 */
function SCInputRaw({
  type        = 'text',
  placeholder = '',
  value       = '',
  id          = null,
  classes     = '',
  onChange    = null,
  onInput     = null,
} = {}) {
  const el = document.createElement('input');
  el.type        = type;
  el.className   = `sc-input ${classes}`;
  el.placeholder = placeholder;
  if (value) el.value = value;
  if (id)    el.id    = id;
  if (onChange) el.addEventListener('change', onChange);
  if (onInput)  el.addEventListener('input',  onInput);
  return el;
}

/**
 * USAGE MAP
 * ────────────────────────────────────────────────────────────────
 * SCField (labeled)  : Login (email/password), Sign Up (name/email/phone/
 *                       password/confirm), Account Settings > Personal Info
 *                       (name/email/phone/service address textarea),
 *                       Confirm Booking > Problem Description (textarea),
 *                       Admin > System Settings (Platform Name, Support Email)
 * SCInputRaw (bare)  : all search bars — portal Navbar search, Home page hero
 *                       search, Find Artisans / Search Services search,
 *                       Admin table search + filter bars (User Management,
 *                       Booking Management, Reviews, Job History)
 */