import { users } from '../api.js';

const tbody = document.getElementById('usersTableBody');
const tableCount = document.getElementById('tableCount');
const userSearch = document.getElementById('userSearch');
const roleFilter = document.getElementById('roleFilter');
const statusFilter = document.getElementById('statusFilter');

const statusClass = {
  Active: 'sc-badge--success',
  Suspended: 'sc-badge--error',
  Pending: 'sc-badge--warning',
};

const actionMarkup = {
  Active: `<button class="sc-btn sc-btn--outline" style="padding:4px 8px; font-size:12px;">👁️ View</button>
           <button class="sc-btn sc-btn--danger" style="padding:4px 8px; font-size:12px; margin-left:4px;">🚫 Suspend</button>`,
  Suspended: `<button class="sc-btn sc-btn--outline" style="padding:4px 8px; font-size:12px;">👁️ View</button>
              <button class="sc-btn sc-btn--success" style="padding:4px 8px; font-size:12px; margin-left:4px;">↩ Restore</button>`,
  Pending: `<button class="sc-btn sc-btn--navy" style="padding:4px 8px; font-size:12px;">📋 Review</button>`
};

function renderTable(data) {
  tbody.innerHTML = '';
  tableCount.textContent = `Showing 1 to ${data.length} of ${data.length} records`;

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="padding:24px; text-align:center; color:#94A3B8;">No records found matching filters.</td></tr>`;
    return;
  }

  data.forEach(user => {
    // Graceful Initials Fallback if Avatar URL is Missing
    const avatarImg = user.avatar 
      ? `<img src="${user.avatar}" alt="${user.name}" style="width:36px; height:36px; border-radius:50%; object-fit:cover;" />`
      : `<div style="width:36px; height:36px; border-radius:50%; background:#0B2240; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:600; font-size:14px;">${user.name.split(' ').map(n => n[0]).join('')}</div>`;

    tbody.insertAdjacentHTML('beforeend', `
      <tr style="border-bottom:1px solid #E2E8F0;">
        <td style="padding:14px; display:flex; align-items:center; gap:12px;">
          ${avatarImg}
          <div>
            <p style="font-weight:600; margin:0;">${user.name}</p>
            <p style="font-size:12px; color:#64748B; margin:0;">${user.email}</p>
          </div>
        </td>
        <td style="padding:14px; color:#334155;">${user.role === 'Artisan' ? '🔧' : '👤'} ${user.role}</td>
        <td style="padding:14px; color:#64748B;">${user.joined}</td>
        <td style="padding:14px;">
          <span class="sc-badge ${statusClass[user.status] || 'sc-badge--neutral'}">${user.status}</span>
        </td>
        <td style="padding:14px; text-align:right;">
          ${actionMarkup[user.status] || ''}
        </td>
      </tr>
    `);
  });
}

function filterRecords() {
  const query = userSearch.value.toLowerCase();
  const role = roleFilter.value;
  const status = statusFilter.value;

  const filtered = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query);
    const matchesRole = !role || u.role === role;
    const matchesStatus = !status || u.status === status;
    return matchesSearch && matchesRole && matchesStatus;
  });

  renderTable(filtered);
}

// Attach Event Observers
[userSearch, roleFilter, statusFilter].forEach(element => {
  element.addEventListener('input', filterRecords);
});

// Initial Setup Render
renderTable(users);

document.getElementById('inviteBtn').addEventListener('click', () => alert('Invite System User modal coming soon.'));