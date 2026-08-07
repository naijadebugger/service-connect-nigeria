import { reviews } from '../../js/api.js';

const tbody       = document.getElementById('reviewsTableBody');
const reviewCount = document.getElementById('reviewCount');
const reviewSearch= document.getElementById('reviewSearch');
const reportedCount = document.getElementById('reportedCount');

const reported = reviews.filter(r => r.status === 'Reported');
reportedCount.textContent = reported.length;

const statusClass = {
'Published': 'admin-badge--navy',
'Reported':  'admin-badge--error',
};

function stars(n) {
return '★'.repeat(n) + '☆'.repeat(5 - n);
}

let activeTab = 'all';

function getFiltered() {
const q = reviewSearch.value.toLowerCase();
let data = activeTab === 'reported'
    ? reviews.filter(r => r.status === 'Reported')
    : reviews;
if (q) {
    data = data.filter(r =>
    r.reviewer.toLowerCase().includes(q) ||
    r.artisan.toLowerCase().includes(q) ||
    r.reviewText.toLowerCase().includes(q)
    );
}
return data;
}

function renderTable(data) {
tbody.innerHTML = '';
reviewCount.textContent = `Showing 1 to ${data.length} of ${data.length} entries`;
if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="admin-table-empty">No reviews match your filters.</td></tr>`;
    return;
}
data.forEach(r => {
    tbody.insertAdjacentHTML('beforeend', `
    <tr>
        <td>
        <div class="admin-table-user">
            <img src="${r.reviewerAvatar}" alt="${r.reviewer}"
            class="admin-table-avatar" width="36" height="36" />
            <p class="admin-table-user__name">${r.reviewer}</p>
        </div>
        </td>
        <td>${r.artisan}</td>
        <td><span class="admin-review-stars">${stars(r.rating)}</span></td>
        <td class="admin-review-text">${r.reviewText}</td>
        <td class="admin-table-date">${r.date}</td>
        <td><span class="admin-badge ${statusClass[r.status] ?? ''}">${r.status}</span></td>
        <td>
        <div class="admin-table-actions">
            <button class="admin-table-action" title="View">👁</button>
            <button class="admin-table-action admin-table-action--danger" title="Delete">🗑</button>
        </div>
        </td>
    </tr>
    `);
});
}

renderTable(reviews);

document.querySelectorAll('.admin-tab').forEach(tab => {
tab.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab')
    .forEach(t => t.classList.remove('admin-tab--active'));
    tab.classList.add('admin-tab--active');
    activeTab = tab.dataset.tab;
    renderTable(getFiltered());
});
});

reviewSearch.addEventListener('input', () => renderTable(getFiltered()));