import { verificationQueue } from '../../js/api.js';

const queueList    = document.getElementById('queueList');
const queueCount   = document.getElementById('queueCount');
const detailEmpty  = document.getElementById('detailEmpty');
const detailContent= document.getElementById('detailContent');

queueCount.textContent = `${verificationQueue.length} Pending`;

function renderQueue() {
queueList.innerHTML = '';
verificationQueue.forEach((applicant, i) => {
    const li = document.createElement('li');
    li.className = 'verification-queue__item' + (i === 0 ? ' verification-queue__item--active' : '');
    li.dataset.id = applicant.id;
    li.innerHTML = `
    <img class="verification-queue__avatar"
        src="${applicant.photo}"
        alt="${applicant.name}"
        width="40" height="40"
    />
    <div class="verification-queue__info">
        <p class="verification-queue__name">${applicant.name}</p>
        <p class="verification-queue__meta">${applicant.trade} · ${applicant.location}</p>
        <p class="verification-queue__date">Submitted: ${applicant.submitted}</p>
    </div>
    <span class="admin-badge admin-badge--warning">Pending</span>
    `;
    li.addEventListener('click', () => {
    document.querySelectorAll('.verification-queue__item')
        .forEach(el => el.classList.remove('verification-queue__item--active'));
    li.classList.add('verification-queue__item--active');
    renderDetail(applicant);
    });
    queueList.appendChild(li);
});
}

function renderDetail(a) {
detailEmpty.hidden  = true;
detailContent.hidden = false;

document.getElementById('detailPhoto').src = a.photo;
document.getElementById('detailPhoto').alt = a.name;
document.getElementById('detailName').textContent = a.name;
document.getElementById('detailMeta').textContent = `${a.trade} · ${a.location}`;
document.getElementById('detailBio').textContent  = a.bio;
document.getElementById('detailNin').src  = a.ninSlip;
document.getElementById('detailCert').src = a.certificate;

document.getElementById('detailGuarantor').innerHTML = `
    <p class="verification-guarantor__label">Guarantor Detail</p>
    <p class="verification-guarantor__name">${a.guarantor.name}</p>
    <p class="verification-guarantor__sub">${a.guarantor.relationship} · ${a.guarantor.phone}</p>
`;

document.getElementById('detailBgCheck').innerHTML = a.backgroundCheck
    ? `<p class="verification-bg-check__label">Background Check</p>
        <p class="verification-bg-check__result verification-bg-check__result--pass">✓ Cleared by 3rd Party Provider</p>`
    : `<p class="verification-bg-check__label">Background Check</p>
        <p class="verification-bg-check__result verification-bg-check__result--fail">✕ Not yet cleared</p>`;
}

// Render first item by default
renderQueue();
if (verificationQueue.length > 0) renderDetail(verificationQueue[0]);

document.getElementById('btnReject').addEventListener('click', () => {
alert('Request rejected.');
});
document.getElementById('btnMoreInfo').addEventListener('click', () => {
alert('More info requested.');
});
document.getElementById('btnApprove').addEventListener('click', () => {
alert('Artisan approved.');
});