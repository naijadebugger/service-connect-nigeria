/**
 * ServiceConnect — Avatar Component
 * Renders a photo avatar, falling back to initials if no src is given
 * or the image fails to load.
 *
 * Usage:
 *   SCAvatar({ src, name, size })   // size: 'sm' | 'md' | 'lg'
 */

function SCAvatar({
  src     = '',
  name    = '',
  size    = 'md',
  classes = '',
} = {}) {
  const initials = _initials(name);

  if (src) {
    const img = document.createElement('img');
    img.className = `sc-avatar sc-avatar--${size} ${classes}`.trim();
    img.src = src;
    img.alt = name || 'User avatar';
    img.onerror = () => {
      const fallback = _initialsEl(initials, size, classes);
      img.replaceWith(fallback);
    };
    return img;
  }

  return _initialsEl(initials, size, classes);
}

function _initialsEl(initials, size, classes) {
  const div = document.createElement('div');
  div.className = `sc-avatar sc-avatar--${size} ${classes}`.trim();
  div.setAttribute('aria-hidden', 'true');
  div.textContent = initials;
  return div;
}

function _initials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('') || '?';
}
