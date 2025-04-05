document.addEventListener('DOMContentLoaded', function() {
    // Initialize settings
    initializeSettings();
    
    // Add event listeners
    setupEventListeners();
    
    // Setup modals
    setupModals();
});

// Initialize settings from localStorage
function initializeSettings() {
    // Load user data
    const userData = {
        displayName: localStorage.getItem('userName') || 'John Doe',
        email: localStorage.getItem('userEmail') || 'john@example.com',
        phone: localStorage.getItem('userPhone') || '',
        notifications: JSON.parse(localStorage.getItem('notifications')) || {
            email: true,
            push: true,
            sms: false
        },
        privacy: JSON.parse(localStorage.getItem('privacy')) || {
            profileVisibility: true,
            activitySharing: true,
            locationServices: false
        },
        security: JSON.parse(localStorage.getItem('security')) || {
            twoFactor: false
        }
    };

    // Populate form fields
    document.getElementById('displayName').value = userData.displayName;
    document.getElementById('email').value = userData.email;
    document.getElementById('phone').value = userData.phone;

    // Set notification toggles
    document.querySelector('input[name="emailNotif"]').checked = userData.notifications.email;
    document.querySelector('input[name="pushNotif"]').checked = userData.notifications.push;
    document.querySelector('input[name="smsNotif"]').checked = userData.notifications.sms;

    // Set privacy toggles
    document.querySelector('input[name="profileVisibility"]').checked = userData.privacy.profileVisibility;
    document.querySelector('input[name="activitySharing"]').checked = userData.privacy.activitySharing;
    document.querySelector('input[name="locationServices"]').checked = userData.privacy.locationServices;

    // Set security toggles
    document.querySelector('input[name="twoFactor"]').checked = userData.security.twoFactor;
}

// Setup event listeners
function setupEventListeners() {
    // Save account settings
    const saveBtn = document.querySelector('.btn-save');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveAccountSettings);
    }

    // Handle notification toggles
    const notificationToggles = document.querySelectorAll('.settings-card:nth-child(2) .switch input');
    notificationToggles.forEach(toggle => {
        toggle.addEventListener('change', updateNotificationSettings);
    });

    // Handle privacy toggles
    const privacyToggles = document.querySelectorAll('.settings-card:nth-child(3) .switch input');
    privacyToggles.forEach(toggle => {
        toggle.addEventListener('change', updatePrivacySettings);
    });

    // Handle security features
    document.getElementById('changePassword').addEventListener('click', showChangePasswordModal);
    document.getElementById('loginHistory').addEventListener('click', showLoginHistory);
    document.getElementById('exportData').addEventListener('click', exportUserData);
    document.getElementById('deleteAccount').addEventListener('click', showDeleteAccountModal);

    // Handle two-factor authentication
    const twoFactorToggle = document.querySelector('input[name="twoFactor"]');
    if (twoFactorToggle) {
        twoFactorToggle.addEventListener('change', setupTwoFactor);
    }
}

// Save account settings
async function saveAccountSettings() {
    const displayName = document.getElementById('displayName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Validate email
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Validate phone (optional)
    if (phone && !validatePhone(phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return;
    }

    try {
        // Show loading state
        const saveBtn = document.querySelector('.btn-save');
        const originalText = saveBtn.textContent;
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Save to localStorage (in real app, this would be an API call)
        localStorage.setItem('userName', displayName);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPhone', phone);

        // Show success message
        showNotification('Settings saved successfully', 'success');

        // Reset button
        saveBtn.disabled = false;
        saveBtn.textContent = originalText;

    } catch (error) {
        showNotification('Error saving settings. Please try again.', 'error');
    }
}

// Update notification settings
function updateNotificationSettings(event) {
    const toggle = event.target;
    const type = toggle.name.replace('Notif', '');
    const notifications = JSON.parse(localStorage.getItem('notifications')) || {};
    
    notifications[type] = toggle.checked;
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    showNotification(`${type} notifications ${toggle.checked ? 'enabled' : 'disabled'}`, 'success');
}

// Update privacy settings
function updatePrivacySettings(event) {
    const toggle = event.target;
    const setting = toggle.name;
    const privacy = JSON.parse(localStorage.getItem('privacy')) || {};
    
    privacy[setting] = toggle.checked;
    localStorage.setItem('privacy', JSON.stringify(privacy));
    
    showNotification(`${setting.replace(/([A-Z])/g, ' $1').toLowerCase()} ${toggle.checked ? 'enabled' : 'disabled'}`, 'success');
}

// Setup two-factor authentication
async function setupTwoFactor(event) {
    const enabled = event.target.checked;
    
    if (enabled) {
        // Show QR code modal (in real app)
        showModal('Two-Factor Authentication', `
            <div class="two-factor-setup">
                <p>Scan this QR code with your authenticator app:</p>
                <div class="qr-placeholder">
                    <i class="fas fa-qrcode"></i>
                </div>
                <p>Or enter this code manually:</p>
                <code>ABCD-EFGH-IJKL-MNOP</code>
            </div>
        `);
    } else {
        // Disable 2FA
        const confirmed = await showConfirmModal('Disable 2FA', 'Are you sure you want to disable two-factor authentication? This will make your account less secure.');
        if (!confirmed) {
            event.target.checked = true;
            return;
        }
    }

    const security = JSON.parse(localStorage.getItem('security')) || {};
    security.twoFactor = enabled;
    localStorage.setItem('security', JSON.stringify(security));
}

// Show change password modal
function showChangePasswordModal() {
    showModal('Change Password', `
        <form id="changePasswordForm" class="settings-form">
            <div class="form-group">
                <label for="currentPassword">Current Password</label>
                <input type="password" id="currentPassword" required>
            </div>
            <div class="form-group">
                <label for="newPassword">New Password</label>
                <input type="password" id="newPassword" required>
            </div>
            <div class="form-group">
                <label for="confirmNewPassword">Confirm New Password</label>
                <input type="password" id="confirmNewPassword" required>
            </div>
            <button type="submit" class="btn-primary">Change Password</button>
        </form>
    `);

    // Handle form submission
    document.getElementById('changePasswordForm').addEventListener('submit', handlePasswordChange);
}

// Handle password change
async function handlePasswordChange(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    // Validate passwords
    if (newPassword !== confirmNewPassword) {
        showNotification('New passwords do not match', 'error');
        return;
    }

    if (newPassword.length < 8) {
        showNotification('Password must be at least 8 characters long', 'error');
        return;
    }

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        closeModal();
        showNotification('Password changed successfully', 'success');
    } catch (error) {
        showNotification('Error changing password. Please try again.', 'error');
    }
}

// Show login history
function showLoginHistory() {
    // Sample login history data (in real app, this would come from the backend)
    const loginHistory = [
        { date: '2024-03-15 14:30', location: 'New York, USA', device: 'Chrome on Windows' },
        { date: '2024-03-14 09:15', location: 'New York, USA', device: 'Mobile App' },
        { date: '2024-03-13 18:45', location: 'New York, USA', device: 'Firefox on MacOS' }
    ];

    showModal('Login History', `
        <div class="login-history">
            ${loginHistory.map(login => `
                <div class="login-entry">
                    <div class="login-info">
                        <span class="login-date">${login.date}</span>
                        <span class="login-device">${login.device}</span>
                    </div>
                    <span class="login-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${login.location}
                    </span>
                </div>
            `).join('')}
        </div>
    `);
}

// Export user data
function exportUserData() {
    // Collect user data
    const userData = {
        profile: {
            name: localStorage.getItem('userName'),
            email: localStorage.getItem('userEmail'),
            phone: localStorage.getItem('userPhone')
        },
        settings: {
            notifications: JSON.parse(localStorage.getItem('notifications')),
            privacy: JSON.parse(localStorage.getItem('privacy')),
            security: JSON.parse(localStorage.getItem('security'))
        },
        activities: [] // In real app, fetch from backend
    };

    // Create download link
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'user-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Show delete account modal
async function showDeleteAccountModal() {
    const confirmed = await showConfirmModal(
        'Delete Account',
        'Are you sure you want to delete your account? This action cannot be undone.',
        'Delete Account',
        'btn-danger'
    );

    if (confirmed) {
        try {
            // Show loading state
            showNotification('Deleting account...', 'info');

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Clear all data
            localStorage.clear();

            showNotification('Account deleted successfully. Redirecting...', 'success');

            // Redirect to home
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
        } catch (error) {
            showNotification('Error deleting account. Please try again.', 'error');
        }
    }
}

// Utility functions
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\+?[\d\s-]{10,}$/.test(phone);
}

// Modal functions
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);

    modal.querySelector('.modal-close').addEventListener('click', () => {
        closeModal(modal);
    });
}

function closeModal(modal = document.querySelector('.modal')) {
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

async function showConfirmModal(title, message, confirmText = 'Confirm', confirmClass = 'btn-primary') {
    return new Promise(resolve => {
        const modal = document.createElement('div');
        modal.className = 'modal confirm-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                    <div class="modal-actions">
                        <button class="btn-secondary cancel-btn">Cancel</button>
                        <button class="${confirmClass} confirm-btn">${confirmText}</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);

        modal.querySelector('.modal-close').addEventListener('click', () => {
            closeModal(modal);
            resolve(false);
        });

        modal.querySelector('.cancel-btn').addEventListener('click', () => {
            closeModal(modal);
            resolve(false);
        });

        modal.querySelector('.confirm-btn').addEventListener('click', () => {
            closeModal(modal);
            resolve(true);
        });
    });
}

// Setup modals
function setupModals() {
    // Add modal styles if not already present
    if (!document.getElementById('modalStyles')) {
        const style = document.createElement('style');
        style.id = 'modalStyles';
        style.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
            }

            .modal.show {
                opacity: 1;
                visibility: visible;
            }

            .modal-content {
                background: white;
                border-radius: 0.5rem;
                width: 90%;
                max-width: 500px;
                transform: translateY(-20px);
                transition: all 0.3s ease;
            }

            .modal.show .modal-content {
                transform: translateY(0);
            }

            .modal-header {
                padding: 1rem;
                border-bottom: 1px solid #eee;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
            }

            .modal-body {
                padding: 1rem;
            }

            .modal-actions {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                margin-top: 1rem;
            }

            .login-history {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .login-entry {
                padding: 1rem;
                background: #f8f9fa;
                border-radius: 0.5rem;
            }

            .login-info {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
            }

            .login-date {
                font-weight: 500;
            }

            .login-device {
                color: #666;
            }

            .login-location {
                color: #666;
                font-size: 0.9rem;
            }

            .two-factor-setup {
                text-align: center;
                padding: 1rem;
            }

            .qr-placeholder {
                width: 200px;
                height: 200px;
                margin: 2rem auto;
                background: #f8f9fa;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 5rem;
                color: #666;
            }

            code {
                background: #f8f9fa;
                padding: 0.5rem 1rem;
                border-radius: 0.25rem;
                font-family: monospace;
            }
        `;
        document.head.appendChild(style);
    }
} 