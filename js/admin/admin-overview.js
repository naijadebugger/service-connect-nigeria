import {
    dashboardStats,
    bookings,
    users,
} from '../api.js'

import { SCBadgeFromStatus } from '../components/SCBadge.js';

// ─── Helpers ───────────────────────────────────────
const fmt = (n) => n.toLocaleString('en-NG');

// ─── Stat Cards ────────────────────────────────────
const statDefs = [
{
    label: 'Total Users',
    value: dashboardStats.totalUsers,
    growth: dashboardStats.growth.users,
    icon: '👤',
},
{
    label: 'Total Artisans',
    value: dashboardStats.totalArtisans,
    growth: dashboardStats.growth.artisans,
    icon: '🔧',
},
{
    label: 'Total Bookings',
    value: dashboardStats.totalBookings,
    growth: dashboardStats.growth.bookings,
    icon: '📅',
},
{
    label: 'Total Reviews',
    value: dashboardStats.totalReviews,
    growth: null,
    badge: `Avg ${dashboardStats.averageRating}`,
    icon: '★',
},
];

const statsGrid = document.getElementById('statsGrid');
statDefs.forEach(({ label, value, growth, badge, icon }) => {
const growthHTML = growth != null
    ? `<span class="admin-stat-growth">▲ ${growth}%</span>`
    : badge
    ? `<span class="admin-stat-badge">${badge}</span>`
    : '';
statsGrid.insertAdjacentHTML('beforeend', `
    <div class="admin-stat-card">
    <div class="admin-stat-card__top">
        <span class="admin-stat-card__icon">${icon}</span>
        ${growthHTML}
    </div>
    <p class="admin-stat-card__label">${label}</p>
    <p class="admin-stat-card__value">${fmt(value)}</p>
    </div>
`);
});

// ─── Growth Line Chart (vanilla canvas) ────────────
const growthCanvas = document.getElementById('growthChart');
growthCanvas.width = growthCanvas.parentElement.offsetWidth || 500;
const gCtx = growthCanvas.getContext('2d');
const { months, users: uData, artisans: aData } = dashboardStats.platformGrowth;

function drawLineChart(ctx, canvas, labels, datasets) {
const W = canvas.width;
const H = canvas.height;
const PAD = { top: 16, right: 16, bottom: 32, left: 52 };
const chartW = W - PAD.left - PAD.right;
const chartH = H - PAD.top - PAD.bottom;
const allVals = datasets.flatMap(d => d.data);
const maxVal = Math.max(...allVals);
const minVal = 0;
const steps = 5;

ctx.clearRect(0, 0, W, H);
ctx.font = '11px Inter, sans-serif';
ctx.fillStyle = '#94A3B8';

// Y gridlines + labels
for (let i = 0; i <= steps; i++) {
    const val = minVal + ((maxVal - minVal) / steps) * i;
    const y = PAD.top + chartH - (i / steps) * chartH;
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD.left, y);
    ctx.lineTo(PAD.left + chartW, y);
    ctx.stroke();
    ctx.fillText(
    val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val,
    PAD.left - 40, y + 4
    );
}

// X labels
labels.forEach((lbl, i) => {
    const x = PAD.left + (i / (labels.length - 1)) * chartW;
    ctx.fillText(lbl, x - 10, PAD.top + chartH + 20);
});

// Lines + dots
datasets.forEach(({ data, color }) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    data.forEach((val, i) => {
    const x = PAD.left + (i / (data.length - 1)) * chartW;
    const y = PAD.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    data.forEach((val, i) => {
    const x = PAD.left + (i / (data.length - 1)) * chartW;
    const y = PAD.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    });
});
}

drawLineChart(gCtx, growthCanvas, months, [
{ data: uData,  color: '#0B2240' },
{ data: aData, color: '#FF8C00' },
]);

// ─── Booking Status Donut (vanilla canvas) ──────────
const donutCanvas = document.getElementById('bookingDonut');
const dCtx = donutCanvas.getContext('2d');
const { completed, pending, cancelled } = dashboardStats.bookingStatus;
const donutData = [
{ label: 'Completed', value: completed, color: '#0B2240' },
{ label: 'Pending',   value: pending,   color: '#FF8C00' },
{ label: 'Cancelled', value: cancelled, color: '#E2E8F0' },
];

function drawDonut(ctx, canvas, data) {
const cx = canvas.width / 2;
const cy = canvas.height / 2;
const outerR = 80;
const innerR = 52;
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
// Hole
ctx.beginPath();
ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
ctx.fillStyle = '#fff';
ctx.fill();
}

drawDonut(dCtx, donutCanvas, donutData);

const donutLegend = document.getElementById('donutLegend');
donutData.forEach(({ label, value, color }) => {
donutLegend.insertAdjacentHTML('beforeend', `
    <li class="admin-donut-legend-item">
    <span class="admin-donut-legend-dot" style="background:${color}"></span>
    <span class="admin-donut-legend-label">${label}</span>
    <span class="admin-donut-legend-val">${value}%</span>
    </li>
`);
});

// ─── Recent Activity ────────────────────────────────
const recentBookings = bookings.slice(0, 4);
const activityList = document.getElementById('activityList');

recentBookings.forEach(b => {
const statusClass = {
    'Completed':  'admin-badge--success',
    'In Progress':'admin-badge--progress',
    'Pending':    'admin-badge--warning',
    'Confirmed':  'admin-badge--navy',
    'Cancelled':  'admin-badge--error',
}[b.status] || '';

activityList.insertAdjacentHTML('beforeend', `
    <li class="admin-activity-item">
    <div class="admin-activity-item__info">
        <p class="admin-activity-item__title">${b.service}</p>
        <p class="admin-activity-item__meta">${b.customer} → ${b.artisan ?? 'Unassigned'} · ${b.date}</p>
    </div>
    <div class="admin-activity-item__right">
        ${SCBadgeFromStatus(b.status).outerHTML}
        <span class="admin-activity-item__amount">₦${fmt(b.amount)}</span>
    </div>
    </li>
`);
});