// import { users } from '../api.js';
// import { SCBadgeFromStatus } from '../Badge.js';
// import { SCAvatar } from '../Avatar.js';

//   const tbody = document.getElementById('usersTableBody');
//   const tableCount = document.getElementById('tableCount');
//   const userSearch = document.getElementById('userSearch');
//   const roleFilter = document.getElementById('roleFilter');
//   const statusFilter = document.getElementById('statusFilter');

//   const roleIcon = { Customer: '👤', Artisan: '🔧' };

//   const statusClass = {
//     Active:    'admin-badge--success',
//     Suspended: 'admin-badge--error',
//     Pending:   'admin-badge--pending',
//   };

//   const actionIcon = {
//     Active:    `<button class="admin-table-action" title="View">👁</button>
//                 <button class="admin-table-action admin-table-action--warn" title="Suspend">🚫</button>
//                 <button class="admin-table-action admin-table-action--danger" title="Delete">🗑</button>`,
//     Suspended: `<button class="admin-table-action" title="View">👁</button>
//                 <button class="admin-table-action" title="Restore">↩</button>
//                 <button class="admin-table-action admin-table-action--danger" title="Delete">🗑</button>`,
//     Pending:   `<button class="admin-table-action" title="Review">📋</button>
//                 <button class="admin-table-action admin-table-action--danger" title="Delete">🗑</button>`,
//   };

//   function renderTable(data) {
//     tbody.innerHTML = '';
//     tableCount.textContent = `Showing 1 to ${data.length} of ${data.length} results`;

//     if (data.length === 0) {
//       tbody.insertAdjacentHTML('beforeend', `
//         <tr>
//           <td colspan="5" class="admin-table-empty">No users match your filters.</td>
//         </tr>
//       `);
//       return;
//     }

//     data.forEach(user => {
//       tbody.insertAdjacentHTML('beforeend', `
//         <tr>
//           <td>
//             <div class="admin-table-user">
//               <img
//                 src="${user.avatar}"
//                 alt="${user.name}"
//                 class="admin-table-avatar"
//                 width="36" height="36"
//               />
//               <div>
//                 <p class="admin-table-user__name">${user.name}</p>
//                 <p class="admin-table-user__email">${user.email}</p>
//               </div>
//             </div>
//           </td>
//           <td>
//             <span class="admin-table-role">
//               ${roleIcon[user.role] ?? '👤'} ${user.role}
//             </span>
//           </td>
//           <td class="admin-table-date">${user.joined}</td>
//           <td>
//             <span class="admin-badge ${statusClass[user.status] ?? ''}">
//               ${user.status}
//             </span>
//           </td>
//           <td>
//             <div class="admin-table-actions">
//               ${actionIcon[user.status] ?? ''}
//             </div>
//           </td>
//         </tr>
//       `);
//     });
//   }

//   function getFiltered() {
//     const q      = userSearch.value.toLowerCase();
//     const role   = roleFilter.value;
//     const status = statusFilter.value;
//     return users.filter(u =>
//       (!q      || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) &&
//       (!role   || u.role === role) &&
//       (!status || u.status === status)
//     );
//   }

//   // Initial render
//   renderTable(users);

//   // Live filtering
//   [userSearch, roleFilter, statusFilter].forEach(el => {
//     el.addEventListener('input', () => renderTable(getFiltered()));
//   });

//   // Invite button placeholder
//   document.getElementById('inviteBtn').addEventListener('click', () => {
//     alert('Invite User modal coming soon.');
//   });

import { users } from '../api.js';
// 1. Import the component initializers
import { SCBadgeFromStatus } from '../Badge.js';
import { SCAvatar } from '../Avatar.js';

// 2. Refactor his row injection markup loop
data.forEach(user => {
  // Generate a safe, modular avatar shell layout dynamically
  const userAvatarNode = SCAvatar({ src: user.avatar, name: user.name, size: 'sm' });
  
  tbody.insertAdjacentHTML('beforeend', `
    <tr>
      <td>
        <div class="admin-table-user">
          ${userAvatarNode.outerHTML}
          <div>
            <p class="admin-table-user__name">${user.name}</p>
            <p class="admin-table-user__email">${user.email}</p>
          </div>
        </div>
      </td>
      <td>
        <span class="admin-table-role">
          ${roleIcon[user.role] ?? '👤'} ${user.role}
        </span>
      </td>
      <td class="admin-table-date">${user.joined}</td>
      <td>
        <!-- Dynamically route the status token -->
        ${SCBadgeFromStatus(user.status).outerHTML}
      </td>
      <td>
        <div class="admin-table-actions">
          ${actionIcon[user.status] ?? ''}
        </div>
      </td>
    </tr>
  `);
});