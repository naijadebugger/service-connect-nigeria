import { transactions } from '../../js/api.js';

const fmt    = (n) => `₦${Number(n).toLocaleString('en-NG')}`;
const fmtBig = (n) => `₦${(n / 1000000).toFixed(2)}M`;

// Stat cards
const financialStatDefs = [
{ label: 'Total Revenue (NGN)',       value: fmtBig(24850000), growth: '+12.5% from last month', icon: '💰' },
{ label: 'Pending Payouts',           value: fmt(3120400),     sub: 'Across 42 artisans',        icon: '⏳' },
{ label: 'Platform Commission (15%)', value: fmt(3727500),     sub: 'Net earnings to date',      icon: '🏦' },
{ label: 'Completed Transactions',    value: '1,842',          sub: '98.2% Success rate',        icon: '✓'  },
];

const statsGrid = document.getElementById('financialStats');
financialStatDefs.forEach(({ label, value, growth, sub, icon }) => {
statsGrid.insertAdjacentHTML('beforeend', `
    <div class="admin-stat-card">
    <div class="admin-stat-card__top">
        <span class="admin-stat-card__icon">${icon}</span>
        ${growth ? `<span class="admin-stat-growth" style="font-size:var(--font-xs);max-width:120px;text-align:right;">${growth}</span>` : ''}
    </div>
    <p class="admin-stat-card__label">${label}</p>
    <p class="admin-stat-card__value">${value}</p>
    ${sub ? `<p class="admin-table-user__email">${sub}</p>` : ''}
    </div>
`);
});

// Bar chart
const revenueCanvas = document.getElementById('revenueChart');
revenueCanvas.width = revenueCanvas.parentElement.offsetWidth || 500;
const rCtx = revenueCanvas.getContext('2d');
const months  = ['JAN','FEB','MAR','APR','MAY','JUN'];
const revenue = [3200000, 3800000, 3500000, 4200000, 4800000, 5370000];

function drawBarChart(ctx, canvas, labels, data, color) {
const W = canvas.width, H = canvas.height;
const PAD = { top: 16, right: 16, bottom: 32, left: 64 };
const chartW = W - PAD.left - PAD.right;
const chartH = H - PAD.top - PAD.bottom;
const maxVal = Math.max(...data);
const barW   = (chartW / labels.length) * 0.5;
const gap    = chartW / labels.length;

ctx.clearRect(0, 0, W, H);
ctx.font = '11px Inter, sans-serif';
ctx.fillStyle = '#94A3B8';

for (let i = 0; i <= 4; i++) {
    const val = (maxVal / 4) * i;
    const y   = PAD.top + chartH - (i / 4) * chartH;
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(PAD.left, y);
    ctx.lineTo(PAD.left + chartW, y);
    ctx.stroke();
    ctx.fillText(
    val >= 1000000 ? `${(val/1000000).toFixed(1)}M` : `${(val/1000).toFixed(0)}k`,
    4, y + 4
    );
}

data.forEach((val, i) => {
    const x = PAD.left + i * gap + (gap - barW) / 2;
    const h = (val / maxVal) * chartH;
    const y = PAD.top + chartH - h;
    ctx.fillStyle = i === data.length - 1 ? '#0B2240' : '#CBD5E1';
    ctx.beginPath();
    ctx.roundRect(x, y, barW, h, [4, 4, 0, 0]);
    ctx.fill();
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(labels[i], x + barW / 2 - 10, PAD.top + chartH + 18);
});
}

drawBarChart(rCtx, revenueCanvas, months, revenue);

// Category donut
const categoryCanvas = document.getElementById('categoryDonut');
const cCtx = categoryCanvas.getContext('2d');
const categoryData = [
{ label: 'Plumbing',   value: 42, color: '#0B2240' },
{ label: 'Electrical', value: 28, color: '#8B6914' },
{ label: 'Carpentry',  value: 30, color: '#1D3557' },
];

function drawDonut(ctx, canvas, data) {
const cx = canvas.width / 2, cy = canvas.height / 2;
const outerR = 80, innerR = 52;
let startAngle = -Math.PI / 2;
const total = data.reduce((s, d) => s + d.value, 0);
data.forEach(({ value, color }) => {
    const slice = (value / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, outerR, startAngle, startAngle + slice);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    startAngle += slice;
});
ctx.beginPath();
ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
ctx.fillStyle = '#fff';
ctx.fill();
ctx.font = 'bold 11px Inter';
ctx.fillStyle = '#94A3B8';
ctx.textAlign = 'center';
ctx.fillText('TOP SERVICE', cx, cy - 6);
ctx.font = 'bold 14px Inter';
ctx.fillStyle = '#0F172A';
ctx.fillText('PLUMBING', cx, cy + 10);
ctx.textAlign = 'left';
}

drawDonut(cCtx, categoryCanvas, categoryData);

const categoryLegend = document.getElementById('categoryLegend');
categoryData.forEach(({ label, value, color }) => {
categoryLegend.insertAdjacentHTML('beforeend', `
    <li class="admin-donut-legend-item">
    <span class="admin-donut-legend-dot" style="background:${color}"></span>
    <span class="admin-donut-legend-label">${label}</span>
    <span class="admin-donut-legend-val">${value}%</span>
    </li>
`);
});

// Transaction table
const tbody   = document.getElementById('txnTableBody');
const txnCount= document.getElementById('txnCount');

const serviceColors = {
'Plumbing':   '#EFF6FF',
'Electrical': '#FFFBEB',
'Carpentry':  '#F0FDF4',
'Cleaning':   '#FDF4FF',
};

txnCount.textContent = `Showing 1-${transactions.length} of 1,842 results`;
transactions.forEach(t => {
const bg = serviceColors[t.service] ?? '#F8FAFC';
tbody.insertAdjacentHTML('beforeend', `
    <tr>
    <td><span class="admin-table-id">${t.id}</span></td>
    <td class="admin-table-date">${t.date}</td>
    <td>
        <span class="admin-service-badge" style="background:${bg};">${t.service}</span>
    </td>
    <td>
        <div class="admin-table-user">
        <img src="${t.artisanAvatar}" alt="${t.artisan}"
            class="admin-table-avatar" width="28" height="28" />
        <span>${t.artisan}</span>
        </div>
    </td>
    <td>${t.customer}</td>
    <td><strong>${fmt(t.amount)}</strong></td>
    <td>${fmt(t.commission)}</td>
    </tr>
`);
});

document.getElementById('processPayoutsBtn').addEventListener('click', () => {
alert('Payout processing coming after API integration.');
});