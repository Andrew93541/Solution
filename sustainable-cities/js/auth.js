document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const googleBtn = document.querySelector('.btn-google');
    const facebookBtn = document.querySelector('.btn-facebook');

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    // Form validation and submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                return;
            }
            
            if (passwordInput.value.length < 6) {
                showError(passwordInput, 'Password must be at least 6 characters long');
                return;
            }

            // Collect form data
            const formData = {
                email: emailInput.value,
                password: passwordInput.value,
                remember: document.getElementById('remember').checked
            };

            // Show loading state
            const submitBtn = this.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';

            // Simulate API call
            setTimeout(() => {
                // Set auth token (in real app, this would come from the server)
                setAuthToken('demo_token');
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = 'Sign In';

                // Show success message and redirect
                showNotification('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = '/sustainable-cities/index.html';
                }, 1500);
            }, 2000);
        });
    }

    // Social login handlers
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            initiateGoogleLogin();
        });
    }

    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            initiateFacebookLogin();
        });
    }

    // Update UI based on auth state
    updateAuthUI();
    
    // Add logout handlers
    const logoutBtns = document.querySelectorAll('.logout-btn, .btn-logout');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    });

    // Check if user is authenticated for protected pages
    const isProtectedPage = window.location.pathname.includes('/features/');
    if (isProtectedPage && !isAuthenticated()) {
        window.location.href = '../auth/login.html';
    }

    // Update profile information if on profile page
    if (window.location.pathname.includes('/features/profile.html')) {
        updateProfileInfo();
    }

    // Handle registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const city = document.getElementById('city').value;
            const terms = document.getElementById('terms').checked;
            const newsletter = document.getElementById('newsletter').checked;

            // Validate form
            if (!validateRegistrationForm(firstName, lastName, email, password, confirmPassword, city, terms)) {
                return;
            }

            // Show loading state
            const submitBtn = registerForm.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Save user data (in real app, this would be handled by the backend)
                const userData = {
                    firstName,
                    lastName,
                    email,
                    city,
                    newsletter,
                    memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                    ecoLevel: 'Eco Warrior Level 1'
                };

                localStorage.setItem('authToken', 'demo_token');
                localStorage.setItem('userName', `${firstName} ${lastName}`);
                localStorage.setItem('userEmail', email);
                localStorage.setItem('memberSince', userData.memberSince);
                localStorage.setItem('ecoLevel', userData.ecoLevel);

                // Show success message and redirect
                showNotification('Account created successfully! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = '../features/profile.html';
                }, 1500);

            } catch (error) {
                showNotification('Error creating account. Please try again.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Create Account';
            }
        });
    }

    // Handle password recovery form
    const recoverForm = document.getElementById('recoverForm');
    const resetForm = document.getElementById('resetForm');

    if (recoverForm) {
        recoverForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;

            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Show loading state
            const submitBtn = recoverForm.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Hide recover form and show reset form
                recoverForm.style.display = 'none';
                resetForm.style.display = 'block';

                // Show success message
                showNotification('Recovery code sent to your email', 'success');

            } catch (error) {
                showNotification('Error sending recovery code. Please try again.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Recovery Link';
            }
        });
    }

    if (resetForm) {
        resetForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const code = document.getElementById('code').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validate form
            if (!validateResetForm(code, newPassword, confirmPassword)) {
                return;
            }

            // Show loading state
            const submitBtn = resetForm.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resetting...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Show success message and redirect
                showNotification('Password reset successfully! Redirecting to login...', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);

            } catch (error) {
                showNotification('Error resetting password. Please try again.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Reset Password';
            }
        });
    }

    // Handle resend code
    const resendCodeBtn = document.getElementById('resendCode');
    if (resendCodeBtn) {
        resendCodeBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalText = this.textContent;
            this.textContent = 'Sending...';
            this.style.pointerEvents = 'none';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Show success message
                showNotification('New code sent to your email', 'success');

            } catch (error) {
                showNotification('Error sending code. Please try again.', 'error');
            } finally {
                this.textContent = originalText;
                this.style.pointerEvents = 'auto';
            }
        });
    }
});

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show error message
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const existingError = formGroup.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    
    formGroup.appendChild(errorDiv);
    
    input.style.borderColor = '#e74c3c';
    
    // Remove error when input changes
    input.addEventListener('input', function() {
        const error = formGroup.querySelector('.error-message');
        if (error) {
            error.remove();
            input.style.borderColor = '#e9ecef';
        }
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        background: type === 'success' ? '#2ecc71' : '#e74c3c',
        color: 'white',
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: '1000',
        animation: 'slideIn 0.3s ease forwards'
    });
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Social login functions (to be implemented with actual OAuth)
function initiateGoogleLogin() {
    console.log('Initiating Google login...');
    showNotification('Google login will be implemented with actual OAuth', 'info');
}

function initiateFacebookLogin() {
    console.log('Initiating Facebook login...');
    showNotification('Facebook login will be implemented with actual OAuth', 'info');
}

// Add keyframe animations to the document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// Authentication state management
function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}

function getAuthToken() {
    return localStorage.getItem('authToken');
}

function isAuthenticated() {
    return !!getAuthToken();
}

// Update profile information with user data
function updateProfileInfo() {
    if (!isAuthenticated()) return;

    // In a real app, this would come from your backend
    const userData = {
        name: localStorage.getItem('userName') || 'John Doe',
        memberSince: localStorage.getItem('memberSince') || 'January 2024',
        ecoLevel: localStorage.getItem('ecoLevel') || 'Eco Warrior Level 2',
        stats: {
            co2Saved: '245',
            greenTrips: '32',
            treesSaved: '12'
        },
        activities: [
            {
                type: 'bicycle',
                title: 'Bike Sharing Trip',
                details: '20 minutes • 2.5 km • 0.5 kg CO2 saved',
                time: '2 hours ago'
            },
            {
                type: 'car-side',
                title: 'Electric Car Share',
                details: '45 minutes • 15 km • 2.3 kg CO2 saved',
                time: 'Yesterday'
            }
        ]
    };

    // Update profile header
    document.querySelector('.profile-info h2').textContent = userData.name;
    document.querySelector('.profile-info p').textContent = `Member since ${userData.memberSince}`;
    document.querySelector('.eco-status').textContent = userData.ecoLevel;

    // Update stats
    const statsContainer = document.querySelector('.stats-grid');
    if (statsContainer) {
        const co2Stat = statsContainer.querySelector('.stat-card:nth-child(1) p');
        const tripsStats = statsContainer.querySelector('.stat-card:nth-child(2) p');
        const treesStats = statsContainer.querySelector('.stat-card:nth-child(3) p');

        if (co2Stat) co2Stat.textContent = `${userData.stats.co2Saved} kg`;
        if (tripsStats) tripsStats.textContent = `${userData.stats.greenTrips} trips`;
        if (treesStats) treesStats.textContent = `${userData.stats.treesSaved} trees`;
    }

    // Update activities
    const activityList = document.querySelector('.activity-list');
    if (activityList && userData.activities.length > 0) {
        activityList.innerHTML = userData.activities.map(activity => `
            <div class="activity-item">
                <i class="fas fa-${activity.type}"></i>
                <div class="activity-details">
                    <h4>${activity.title}</h4>
                    <p>${activity.details}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }
}

// Logout function
function logout() {
    // Clear auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('memberSince');
    localStorage.removeItem('ecoLevel');

    // Show success notification
    showNotification('Logged out successfully', 'success');

    // Update UI
    updateAuthUI();

    // Redirect to home if on a protected page
    if (window.location.pathname.includes('/features/')) {
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    }
}

// Update UI based on auth state
function updateAuthUI() {
    const authButtons = document.querySelectorAll('.auth-buttons');
    const profileIcons = document.querySelectorAll('.profile-icon');
    const protectedFeatures = document.querySelectorAll('.protected-feature');
    
    if (isAuthenticated()) {
        authButtons.forEach(btn => btn.style.display = 'none');
        profileIcons.forEach(icon => icon.style.display = 'flex');
        protectedFeatures.forEach(feature => {
            feature.classList.remove('disabled');
            feature.removeAttribute('disabled');
        });
    } else {
        authButtons.forEach(btn => btn.style.display = 'flex');
        profileIcons.forEach(icon => icon.style.display = 'none');
        protectedFeatures.forEach(feature => {
            feature.classList.add('disabled');
            feature.setAttribute('disabled', 'true');
            
            // Add click handler to show login prompt
            feature.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showLoginPrompt();
            });
        });
    }
}

// Show login prompt for protected features
function showLoginPrompt() {
    const notification = document.createElement('div');
    notification.className = 'notification warning';
    notification.innerHTML = `
        <i class="fas fa-lock"></i>
        <span>Please <a href="../auth/login.html" style="color: white; text-decoration: underline;">login</a> to access this feature</span>
    `;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        background: '#f39c12',
        color: 'white',
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: '1000',
        animation: 'slideIn 0.3s ease forwards'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Form validation functions
function validateRegistrationForm(firstName, lastName, email, password, confirmPassword, city, terms) {
    if (!firstName || !lastName) {
        showNotification('Please enter your full name', 'error');
        return false;
    }

    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    if (password.length < 8) {
        showNotification('Password must be at least 8 characters long', 'error');
        return false;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return false;
    }

    if (!city) {
        showNotification('Please enter your city', 'error');
        return false;
    }

    if (!terms) {
        showNotification('Please accept the terms and conditions', 'error');
        return false;
    }

    return true;
}

function validateResetForm(code, newPassword, confirmPassword) {
    if (!code || code.length !== 6) {
        showNotification('Please enter a valid 6-digit code', 'error');
        return false;
    }

    if (newPassword.length < 8) {
        showNotification('Password must be at least 8 characters long', 'error');
        return false;
    }

    if (newPassword !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return false;
    }

    return true;
} 