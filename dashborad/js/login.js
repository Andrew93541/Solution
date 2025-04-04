document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Add floating label animation
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Handle form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const loginBtn = document.querySelector('.login-btn');
        const originalBtnText = loginBtn.innerHTML;
        
        // Show loading state
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        loginBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Example validation
            if (emailInput.value === 'admin@example.com' && passwordInput.value === 'password') {
                // Success animation
                loginBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                loginBtn.style.backgroundColor = '#28a745';
                
                // Updated redirect path
                setTimeout(() => {
                    window.location.href = '/dashborad/pages/main.html';
                }, 1000);
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            // Error animation
            loginBtn.innerHTML = '<i class="fas fa-times"></i> Error';
            loginBtn.style.backgroundColor = '#dc3545';
            
            setTimeout(() => {
                loginBtn.innerHTML = originalBtnText;
                loginBtn.style.backgroundColor = '';
                loginBtn.disabled = false;
            }, 2000);
        }
    });

    // Social login handlers
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Add your social login logic here
            console.log(`${btn.classList[1]} login clicked`);
        });
    });
});