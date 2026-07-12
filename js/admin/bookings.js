import { bookings, dashboardStats } from '../../js/api.js';

const fmt = (n) => `₦${Number(n).toLocaleString('en-NG')}`;

// Stat cards
const statDefs = [
{ label: 'Active Bookings',      value: 342, growth: '+12%' },
{ label: 'Pending Assignment',   value: 45,  growth: '+5%'  },
{ label: 'Completed Today',      value: 128, growth: null   },
{ label: 'Total Revenue (24H)',  value: '₦850k', growth: '+8%' },
];

const statsGrid = document.getElementById('bookingStats');
statDefs.forEach(({ label, value, growth }) => {
statsGrid.insertAdjacentHTML('beforeend', `
    <div class="admin-stat-card">
    <div class="admin-stat-card__top">
        <span class="admin-stat-card__icon">📅</span>
        ${growth ? `<span class="admin-stat-growth">${growth}</span>` : ''}
    </div>
    <p class="admin-stat-card__label">${label}</p>
    <p class="admin-stat-card__value">${value}</p>
    </div>
`);
});

const statusClass = {
'Completed':   'admin-badge--success',
'In Progress': 'admin-badge--progress',
'Pending':     'admin-badge--warning',
'Confirmed':   'admin-badge--navy',
'Cancelled':   'admin-badge--error',
};

const tbody         = document.getElementById('bookingsTableBody');
const bookingCount  = document.getElementById('bookingCount');
const bookingSearch = document.getElementById('bookingSearch');
const statusFilter  = document.getElementById('statusFilter');
const categoryFilter= document.getElementById('categoryFilter');

function renderTable(data) {
tbody.innerHTML = '';
bookingCount.textContent = `Showing 1 to ${data.length} of ${data.length} entries`;
if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="admin-table-empty">No bookings match your filters.</td></tr>`;
    return;
}
data.forEach(b => {
    tbody.insertAdjacentHTML('beforeend', `
    <tr>
        <td><span class="admin-table-id">${b.id}</span></td>
        <td>
        <p class="admin-table-user__name">${b.service}</p>
        <p class="admin-table-user__email">${b.category}</p>
        </td>
        <td>${b.customer}</td>
        <td>${b.artisan ? b.artisan : '<em class="admin-table-unassigned">Unassigned</em>'}</td>
        <td>
        <p>${b.date}</p>
        <p class="admin-table-user__email">${b.time}</p>
        </td>
        <td>${fmt(b.amount)}</td>
        <td><span class="admin-badge ${statusClass[b.status] ?? ''}">${b.status}</span></td>
        <td>
        <div class="admin-table-actions">
            <button class="admin-table-action" title="View">👁</button>
        </div>
        </td>
    </tr>
    `);
});
}

function getFiltered() {
const q   = bookingSearch.value.toLowerCase();
const st  = statusFilter.value;
const cat = categoryFilter.value;
return bookings.filter(b =>
    (!q   || b.id.toLowerCase().includes(q) ||
            b.customer.toLowerCase().includes(q) ||
            (b.artisan && b.artisan.toLowerCase().includes(q))) &&
    (!st  || b.status === st) &&
    (!cat || b.category === cat)
);
}

renderTable(bookings);

[bookingSearch, statusFilter, categoryFilter].forEach(el => {
el.addEventListener('input', () => renderTable(getFiltered()));
});

document.getElementById('exportBtn').addEventListener('click', () => {
alert('Export coming after API integration.');
});