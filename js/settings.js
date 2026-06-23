/**
 * ServiceConnect Nigeria - Customer Settings Interactivity
 * This file handles frontend state, file uploads, validations, tab switching,
 * and toast notifications. It is structured with clear API hooks for the backend team.
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. STATE INITIALIZATION (Simulating DB/Local Storage)
    // -------------------------------------------------------------------------
    
    const DEFAULT_PROFILE = {
        fullName: "Aisha Bello",
        email: "aisha.bello@example.com",
        phone: "803 123 4567",
        address: "14 Victoria Island Road, Lagos, Nigeria",
        photo: "" // Base64 data URL if uploaded, empty string for dynamic initials avatar
    };

    const DEFAULT_SECURITY = {
        twoFactorEnabled: false
    };

    const DEFAULT_NOTIFICATIONS = {
        bookingUpdates: true,
        chatMessages: true,
        discountPromos: false,
        systemAlerts: true
    };

    const DEFAULT_PAYMENTS = [
        { id: "card_1", brand: "Visa", last4: "4242", expiry: "12/28", icon: "💳" },
        { id: "card_2", brand: "Mastercard", last4: "8899", expiry: "08/29", icon: "💳" }
    ];

    // Load state from localStorage or set defaults
    let state = {
        profile: JSON.parse(localStorage.getItem('sc_customer_profile')) || DEFAULT_PROFILE,
        security: JSON.parse(localStorage.getItem('sc_customer_security')) || DEFAULT_SECURITY,
        notifications: JSON.parse(localStorage.getItem('sc_customer_notifications')) || DEFAULT_NOTIFICATIONS,
        payments: JSON.parse(localStorage.getItem('sc_customer_payments')) || DEFAULT_PAYMENTS
    };

    // Cache DOM Elements
    const elements = {
        // Form Fields
        fullNameInput: document.getElementById('fullName'),
        emailInput: document.getElementById('email'),
        phoneInput: document.getElementById('phone'),
        addressInput: document.getElementById('address'),
        personalForm: document.getElementById('personal-info-form'),
        
        // Avatars
        sidebarAvatar: document.getElementById('sidebar-avatar'),
        headerAvatar: document.getElementById('header-avatar'),
        cardAvatar: document.getElementById('card-avatar'),
        
        // Profile Controls
        uploadBtn: document.getElementById('btn-upload-photo'),
        removeBtn: document.getElementById('btn-remove-photo'),
        fileInput: document.getElementById('profile-file-input'),
        
        // Navigation & Panels
        tabButtons: document.querySelectorAll('.settings-tab-btn'),
        panels: document.querySelectorAll('.settings-panel'),
        
        // Toast Container
        toastContainer: document.getElementById('toast-container'),
        
        // Security Inputs
        securityForm: document.getElementById('security-form'),
        twoFactorToggle: document.getElementById('two-factor-toggle'),
        
        // Notification Checklist Inputs
        notifBooking: document.getElementById('notif-booking'),
        notifChat: document.getElementById('notif-chat'),
        notifPromo: document.getElementById('notif-promo'),
        notifAlert: document.getElementById('notif-alert'),
        notificationsForm: document.getElementById('notifications-form'),
        
        // Payment UI
        cardsList: document.getElementById('saved-cards-list'),
        addCardBtn: document.getElementById('btn-add-card'),
        
        // Modal
        addCardModal: document.getElementById('add-card-modal'),
        closeModalBtn: document.getElementById('btn-close-modal'),
        cancelModalBtn: document.getElementById('btn-cancel-modal'),
        cardForm: document.getElementById('add-card-form')
    };

    // -------------------------------------------------------------------------
    // 2. AVATAR HELPER (Generates beautiful initials SVG dynamically)
    // -------------------------------------------------------------------------
    
    function getInitials(name) {
        if (!name) return "U";
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return parts[0][0].toUpperCase();
    }

    function generateInitialsAvatar(name) {
        const initials = getInitials(name);
        // Beautiful SVG Data URL with premium indigo-to-purple gradient
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:%234F46E5;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:%237C3AED;stop-opacity:1" />
                </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="50" fill="url(%23grad)" />
            <text x="50%" y="54%" font-family="'Inter', sans-serif" font-weight="700" font-size="34" fill="%23FFFFFF" dominant-baseline="middle" text-anchor="middle">${initials}</text>
        </svg>`;
        return `data:image/svg+xml;utf8,${svg}`;
    }

    function syncAvatars() {
        const src = state.profile.photo || generateInitialsAvatar(state.profile.fullName);
        if (elements.sidebarAvatar) elements.sidebarAvatar.src = src;
        if (elements.headerAvatar) elements.headerAvatar.src = src;
        if (elements.cardAvatar) elements.cardAvatar.src = src;
    }

    // -------------------------------------------------------------------------
    // 3. TOAST NOTIFICATIONS
    // -------------------------------------------------------------------------
    
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' 
            ? `<svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>`
            : `<svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>`;
        
        toast.innerHTML = `${icon}<span>${message}</span>`;
        elements.toastContainer.appendChild(toast);
        
        // Trigger transition slide-in
        setTimeout(() => toast.classList.add('show'), 50);
        
        // Slide-out and remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 350);
        }, 3500);
    }

    // -------------------------------------------------------------------------
    // 4. RENDERING & DATA BINDING
    // -------------------------------------------------------------------------
    
    function populateFormFields() {
        if (elements.fullNameInput) elements.fullNameInput.value = state.profile.fullName;
        if (elements.emailInput) elements.emailInput.value = state.profile.email;
        if (elements.phoneInput) elements.phoneInput.value = state.profile.phone;
        if (elements.addressInput) elements.addressInput.value = state.profile.address;
        
        // Security fields
        if (elements.twoFactorToggle) elements.twoFactorToggle.checked = state.security.twoFactorEnabled;

        // Notification preferences
        if (elements.notifBooking) elements.notifBooking.checked = state.notifications.bookingUpdates;
        if (elements.notifChat) elements.notifChat.checked = state.notifications.chatMessages;
        if (elements.notifPromo) elements.notifPromo.checked = state.notifications.discountPromos;
        if (elements.notifAlert) elements.notifAlert.checked = state.notifications.systemAlerts;
        
        syncAvatars();
        renderPaymentCards();
    }

    // -------------------------------------------------------------------------
    // 5. FILE UPLOADER (FRONTEND FLOW & BACKEND HOOKS)
    // -------------------------------------------------------------------------
    
    if (elements.uploadBtn && elements.fileInput) {
        elements.uploadBtn.addEventListener('click', () => {
            elements.fileInput.click();
        });
    }

    if (elements.fileInput) {
        elements.fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Validate File Type
            const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                showToast("Invalid file type. Please upload a JPG, PNG, or WEBP.", "error");
                return;
            }

            // Validate Size (Max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                showToast("File size too large. Limit is 2MB.", "error");
                return;
            }

            const reader = new FileReader();
            reader.onload = function(event) {
                const base64Data = event.target.result;
                
                // Update frontend state
                state.profile.photo = base64Data;
                localStorage.setItem('sc_customer_profile', JSON.stringify(state.profile));
                syncAvatars();
                showToast("Profile photo updated successfully!");

                // =============================================================
                // BACKEND TEAM HOOK: Upload Photo API Call
                // =============================================================
                /*
                const formData = new FormData();
                formData.append('profile_picture', file);
                
                fetch('/api/customer/settings/upload-photo', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + authToken },
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    // Update state.profile.photo with the server URL instead of Base64
                    // state.profile.photo = data.imageUrl;
                    // syncAvatars();
                })
                .catch(err => {
                    console.error("Photo upload failed:", err);
                    showToast("Server connection error uploading photo.", "error");
                });
                */
            };
            
            reader.readAsDataURL(file);
        });
    }

    if (elements.removeBtn) {
        elements.removeBtn.addEventListener('click', () => {
            if (!state.profile.photo) {
                showToast("No custom photo uploaded.", "error");
                return;
            }
            
            state.profile.photo = "";
            localStorage.setItem('sc_customer_profile', JSON.stringify(state.profile));
            syncAvatars();
            showToast("Profile photo removed.");

            // =============================================================
            // BACKEND TEAM HOOK: Delete Photo API Call
            // =============================================================
            /*
            fetch('/api/customer/settings/remove-photo', {
                method: 'DELETE',
                headers: { 'Authorization': 'Bearer ' + authToken }
            })
            .then(res => {
                if (res.ok) console.log("Removed photo from backend");
            });
            */
        });
    }

    // -------------------------------------------------------------------------
    // 6. FORM VALIDATION & SAVING (FRONTEND & BACKEND HOOKS)
    // -------------------------------------------------------------------------
    
    if (elements.personalForm) {
        elements.personalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Extract Form Values
            const fullName = elements.fullNameInput.value.trim();
            const email = elements.emailInput.value.trim();
            const phone = elements.phoneInput.value.trim();
            const address = elements.addressInput.value.trim();
            
            // Form Validations
            if (!fullName) {
                showToast("Full Name is required.", "error");
                elements.fullNameInput.focus();
                return;
            }
            
            // Simple Email Regex validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                showToast("Please enter a valid email address.", "error");
                elements.emailInput.focus();
                return;
            }
            
            // Nigerian phone formatting validation (basic check: 7+ digits)
            const cleanPhone = phone.replace(/\s+/g, '');
            if (!cleanPhone || cleanPhone.length < 7 || isNaN(cleanPhone)) {
                showToast("Please enter a valid phone number.", "error");
                elements.phoneInput.focus();
                return;
            }
            
            if (!address) {
                showToast("Service address is required.", "error");
                elements.addressInput.focus();
                return;
            }

            // Update Frontend State
            state.profile.fullName = fullName;
            state.profile.email = email;
            state.profile.phone = phone;
            state.profile.address = address;
            
            localStorage.setItem('sc_customer_profile', JSON.stringify(state.profile));
            syncAvatars();
            showToast("Personal information saved successfully!");

            // =============================================================
            // BACKEND TEAM HOOK: Update Profile Details API Call
            // =============================================================
            /*
            const payload = { fullName, email, phone, address };
            
            fetch('/api/customer/settings/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify(payload)
            })
            .then(res => {
                if (!res.ok) throw new Error("API Save Error");
                return res.json();
            })
            .then(data => {
                showToast("Profile synchronized with server!");
            })
            .catch(err => {
                console.error("Profile sync failed:", err);
                showToast("Offline mode: Saved locally, server sync failed.", "error");
            });
            */
        });
    }

    // -------------------------------------------------------------------------
    // 7. SECURITY & NOTIFICATIONS SETTINGS
    // -------------------------------------------------------------------------
    
    // Toggle 2FA Setting
    if (elements.twoFactorToggle) {
        elements.twoFactorToggle.addEventListener('change', (e) => {
            state.security.twoFactorEnabled = e.target.checked;
            localStorage.setItem('sc_customer_security', JSON.stringify(state.security));
            
            const msg = state.security.twoFactorEnabled 
                ? "Two-Factor Authentication enabled." 
                : "Two-Factor Authentication disabled.";
            showToast(msg);

            // =============================================================
            // BACKEND TEAM HOOK: Toggle 2FA API Call
            // =============================================================
            /*
            fetch('/api/customer/settings/security/2fa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify({ enabled: state.security.twoFactorEnabled })
            });
            */
        });
    }

    // Security Form Submit (Password Change)
    if (elements.securityForm) {
        elements.securityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (!currentPassword) {
                showToast("Current password is required.", "error");
                return;
            }
            if (!newPassword || newPassword.length < 6) {
                showToast("New password must be at least 6 characters.", "error");
                return;
            }
            if (newPassword !== confirmPassword) {
                showToast("Passwords do not match.", "error");
                return;
            }
            
            showToast("Password updated successfully!");
            elements.securityForm.reset();

            // =============================================================
            // BACKEND TEAM HOOK: Change Password API Call
            // =============================================================
            /*
            const payload = { currentPassword, newPassword };
            fetch('/api/customer/settings/security/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify(payload)
            })
            .then(res => {
                if (res.ok) {
                    showToast("Password synced with database.");
                } else {
                    showToast("Invalid current password.", "error");
                }
            });
            */
        });
    }

    // Save Notifications Checklist
    if (elements.notificationsForm) {
        elements.notificationsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            state.notifications.bookingUpdates = elements.notifBooking.checked;
            state.notifications.chatMessages = elements.notifChat.checked;
            state.notifications.discountPromos = elements.notifPromo.checked;
            state.notifications.systemAlerts = elements.notifAlert.checked;
            
            localStorage.setItem('sc_customer_notifications', JSON.stringify(state.notifications));
            showToast("Notification preferences updated!");

            // =============================================================
            // BACKEND TEAM HOOK: Save Notification Preferences API Call
            // =============================================================
            /*
            fetch('/api/customer/settings/notifications', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify(state.notifications)
            });
            */
        });
    }

    // -------------------------------------------------------------------------
    // 8. PAYMENT METHODS (LISTING, ADDING, REMOVING)
    // -------------------------------------------------------------------------
    
    function renderPaymentCards() {
        if (!elements.cardsList) return;
        
        if (state.payments.length === 0) {
            elements.cardsList.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 1.5rem; border: 1px dashed var(--border-color); border-radius: var(--radius-md);">No payment methods saved.</div>`;
            return;
        }
        
        elements.cardsList.innerHTML = state.payments.map(card => `
            <div class="payment-card-item" data-id="${card.id}">
                <div class="payment-card-info">
                    <span class="card-icon">${card.icon}</span>
                    <div class="card-details">
                        <span class="card-brand-num">${card.brand} ending in ${card.last4}</span>
                        <span class="card-expiry">Expires ${card.expiry}</span>
                    </div>
                </div>
                <button class="btn-delete-card" title="Delete Card" data-id="${card.id}">
                    <svg viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                </button>
            </div>
        `).join('');
        
        // Attach Delete Listeners
        const deleteButtons = elements.cardsList.querySelectorAll('.btn-delete-card');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cardId = btn.getAttribute('data-id');
                removePaymentCard(cardId);
            });
        });
    }

    function removePaymentCard(id) {
        state.payments = state.payments.filter(card => card.id !== id);
        localStorage.setItem('sc_customer_payments', JSON.stringify(state.payments));
        renderPaymentCards();
        showToast("Payment method deleted.");

        // =============================================================
        // BACKEND TEAM HOOK: Delete Card API Call
        // =============================================================
        /*
        fetch('/api/customer/settings/payments/' + id, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + authToken }
        });
        */
    }

    // Modal Control Events
    if (elements.addCardBtn) {
        elements.addCardBtn.addEventListener('click', () => {
            elements.addCardModal.classList.add('open');
        });
    }

    function closeModal() {
        if (elements.addCardModal) {
            elements.addCardModal.classList.remove('open');
            elements.cardForm.reset();
        }
    }

    if (elements.closeModalBtn) elements.closeModalBtn.addEventListener('click', closeModal);
    if (elements.cancelModalBtn) elements.cancelModalBtn.addEventListener('click', closeModal);

    // Save New Card
    if (elements.cardForm) {
        elements.cardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const cardNum = document.getElementById('card-number').value.replace(/\s+/g, '');
            const cardExpiry = document.getElementById('card-expiry').value;
            const cardCvv = document.getElementById('card-cvv').value;
            
            // Basic validations
            if (cardNum.length < 12 || isNaN(cardNum)) {
                showToast("Please enter a valid card number.", "error");
                return;
            }
            if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
                showToast("Please enter expiry as MM/YY.", "error");
                return;
            }
            if (cardCvv.length < 3 || isNaN(cardCvv)) {
                showToast("Please enter a valid CVV.", "error");
                return;
            }
            
            // Identify brand (Visa starting with 4, Mastercard 5)
            const brand = cardNum.startsWith('4') ? 'Visa' : cardNum.startsWith('5') ? 'Mastercard' : 'Verve';
            const last4 = cardNum.substring(cardNum.length - 4);
            
            const newCard = {
                id: 'card_' + Date.now(),
                brand: brand,
                last4: last4,
                expiry: cardExpiry,
                icon: "💳"
            };
            
            state.payments.push(newCard);
            localStorage.setItem('sc_customer_payments', JSON.stringify(state.payments));
            renderPaymentCards();
            closeModal();
            showToast("New card added successfully!");

            // =============================================================
            // BACKEND TEAM HOOK: Add Card API Call
            // =============================================================
            /*
            const payload = { cardNumber: cardNum, expiry: cardExpiry, cvv: cardCvv };
            fetch('/api/customer/settings/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                body: JSON.stringify(payload)
            });
            */
        });
    }

    // Close Modal on Clicking Overlay Background
    if (elements.addCardModal) {
        elements.addCardModal.addEventListener('click', (e) => {
            if (e.target === elements.addCardModal) {
                closeModal();
            }
        });
    }

    // -------------------------------------------------------------------------
    // 9. TAB SWITCHING SYSTEM
    // -------------------------------------------------------------------------
    
    if (elements.tabButtons) {
        elements.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Update active button state
                elements.tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Switch panel views
                elements.panels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.id === `${targetTab}-panel`) {
                        panel.classList.add('active');
                    }
                });
            });
        });
    }

    // -------------------------------------------------------------------------
    // 10. SETUP & INVOCATION
    // -------------------------------------------------------------------------
    
    populateFormFields();
});
