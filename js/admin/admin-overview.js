import { dashboardStats, bookings } from '../api.js';

const fmt = (n) => n.toLocaleString('en-NG');

// Render Metric Cards
const statDefs = [
  { label: 'Total Users', value: dashboardStats.totalUsers, growth: dashboardStats.growth.users, icon: '👥' },
  { label: 'Total Artisans', value: dashboardStats.totalArtisans, growth: dashboardStats.growth.artisans, icon: '🔧' },
  { label: 'Total Bookings', value: dashboardStats.totalBookings, growth: dashboardStats.growth.bookings, icon: '📅' },
  { label: 'Total Reviews', value: dashboardStats.totalReviews, growth: null, badge: `Avg ${dashboardStats.averageRating}`, icon: '★' }
];

const statsGrid = document.getElementById('statsGrid');
statDefs.forEach(({ label, value, growth, badge, icon }) => {
  const growthHTML = growth != null 
    ? `<span class="sc-badge sc-badge--success">▲ ${growth}%</span>` 
    : badge ? `<span class="sc-badge sc-badge--verified">${badge}</span>` : '';

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

// Render Platform Growth Line Chart (Vanilla Canvas Layout)
const growthCanvas = document.getElementById('growthChart');
if (growthCanvas) {
  growthCanvas.width = growthCanvas.parentElement.offsetWidth || 500;
  const ctx = growthCanvas.getContext('2d');
  const { months, users: uData, artisans: aData } = dashboardStats.platformGrowth;

  const W = growthCanvas.width;
  const H = growthCanvas.height;
  const PAD = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;
  const maxVal = Math.max(...uData, ...aData);

  ctx.clearRect(0, 0, W, H);
  ctx.font = '12px Inter, sans-serif';
  ctx.fillStyle = '#94A3B8';

  // Render Gridlines
  for (let i = 0; i <= 4; i++) {
    const val = (maxVal / 4) * i;
    const y = PAD.top + chartH - (i / 4) * chartH;
    ctx.strokeStyle = '#E2E8F0';
    ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(PAD.left + chartW, y); ctx.stroke();
    ctx.fillText(val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val, PAD.left - 40, y + 4);
  }

  // Draw Line Datasets
  const drawDatasetLine = (data, color) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    data.forEach((val, i) => {
      const x = PAD.left + (i / (data.length - 1)) * chartW;
      const y = PAD.top + chartH - (val / maxVal) * chartH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  };

  drawDatasetLine(uData, '#0B2240'); // Users Line
  drawDatasetLine(aData, '#F59E0B'); // Artisans Line
}

// Render Donut Chart System
const donutCanvas = document.getElementById('bookingDonut');
if (donutCanvas) {
  const ctx = donutCanvas.getContext('2d');
  const { completed, pending, cancelled } = dashboardStats.bookingStatus;
  const donutData = [
    { label: 'Completed', value: completed, color: '#0B2240' },
    { label: 'Pending', value: pending, color: '#F59E0B' },
    { label: 'Cancelled', value: cancelled, color: '#EF4444' }
  ];

  let startAngle = -Math.PI / 2;
  const cx = donutCanvas.width / 2;
  const cy = donutCanvas.height / 2;

  donutData.forEach(({ value, color }) => {
    const sliceAngle = (value / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(cx, cy, 80, startAngle, startAngle + sliceAngle);
    ctx.lineTo(cx, cy);
    ctx.fillStyle = color;
    ctx.fill();
    startAngle += sliceAngle;
  });

  // Center Cutout Hole
  ctx.beginPath(); ctx.arc(cx, cy, 55, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill();

  const legend = document.getElementById('donutLegend');
  donutData.forEach(({ label, value, color }) => {
    legend.insertAdjacentHTML('beforeend', `
      <li>
        <span style="display:inline-block; width:12px; height:12px; background:${color}; border-radius:50%; margin-right:8px;"></span>
        ${label}: <strong>${value}%</strong>
      </li>
    `);
  });
}

// Render Recent Platform Feed Activity Using Standard Global Classes
const activityList = document.getElementById('activityList');
bookings.slice(0, 4).forEach(b => {
  const statusTone = {
    'Completed': 'sc-badge--success',
    'In Progress': 'sc-badge--info',
    'Pending': 'sc-badge--warning',
    'Cancelled': 'sc-badge--error'
  }[b.status] || 'sc-badge--neutral';

  activityList.insertAdjacentHTML('beforeend', `
    <li class="admin-activity-item" style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #E2E8F0;">
      <div>
        <p><strong>${b.service}</strong></p>
        <p style="font-size:13px; color:#64748B;">${b.customer} → ${b.artisan ?? 'Unassigned'}</p>
      </div>
      <div style="text-align:right;">
        <span class="sc-badge ${statusTone}">${b.status}</span>
        <p style="font-weight:600; margin-top:4px;">₦${fmt(b.amount)}</p>
      </div>
    </li>
  `);
});