import { platformSettings } from '../../js/api.js';

// Populate from api.js
document.getElementById('platformName').value  = platformSettings.platformName;
document.getElementById('supportEmail').value  = platformSettings.supportEmail;
document.getElementById('maintenanceToggle').checked = platformSettings.maintenanceMode;
document.getElementById('lastUpdated').textContent =
`⏱ Last updated: ${platformSettings.lastUpdated}`;

// Sub-nav tab switching
document.querySelectorAll('.settings-subnav__item').forEach(btn => {
btn.addEventListener('click', () => {
    document.querySelectorAll('.settings-subnav__item')
    .forEach(b => b.classList.remove('settings-subnav__item--active'));
    btn.classList.add('settings-subnav__item--active');

    document.querySelectorAll('.settings-panel').forEach(p => {
    p.classList.add('settings-panel--hidden');
    });
    document.getElementById(`panel-${btn.dataset.panel}`)
    .classList.remove('settings-panel--hidden');
});
});

// Logo preview
document.getElementById('logoInput').addEventListener('change', (e) => {
const file = e.target.files[0];
if (!file) return;
const reader = new FileReader();
reader.onload = (ev) => {
    document.getElementById('logoPreview').src = ev.target.result;
};
reader.readAsDataURL(file);
});

// Save
document.getElementById('saveBtn').addEventListener('click', () => {
const name  = document.getElementById('platformName').value;
const email = document.getElementById('supportEmail').value;
const maint = document.getElementById('maintenanceToggle').checked;
console.log('Saving:', { name, email, maintenanceMode: maint });
const now = new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
document.getElementById('lastUpdated').textContent = `⏱ Last updated: Today at ${now}`;
alert('Settings saved. Will sync to backend after API integration.');
});

// Discard
document.getElementById('discardBtn').addEventListener('click', () => {
document.getElementById('platformName').value  = platformSettings.platformName;
document.getElementById('supportEmail').value  = platformSettings.supportEmail;
document.getElementById('maintenanceToggle').checked = platformSettings.maintenanceMode;
});