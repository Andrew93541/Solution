document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

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

    // Password strength checker
    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value;
        const strength = checkPasswordStrength(password);
        updatePasswordStrengthUI(strength);
    });

    // Form submission
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (passwordInput.value !== confirmPasswordInput.value) {
            alert("Passwords don't match!");
            return;
        }

        const signupBtn = document.querySelector('.signup-btn');
        const originalBtnText = signupBtn.innerHTML;
        
        signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        signupBtn.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            signupBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
            signupBtn.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                window.location.href = '/dashborad/pages/landing.html';
            }, 1000);
        } catch (error) {
            signupBtn.innerHTML = '<i class="fas fa-times"></i> Error';
            signupBtn.style.backgroundColor = '#dc3545';
            
            setTimeout(() => {
                signupBtn.innerHTML = originalBtnText;
                signupBtn.style.backgroundColor = '';
                signupBtn.disabled = false;
            }, 2000);
        }
    });

    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        return strength;
    }

    function updatePasswordStrengthUI(strength) {
        const strengthMeter = document.querySelector('.strength-meter div');
        const percentage = (strength / 5) * 100;
        strengthMeter.style.width = `${percentage}%`;
        
        if (strength <= 2) strengthMeter.style.backgroundColor = '#dc3545';
        else if (strength <= 4) strengthMeter.style.backgroundColor = '#ffc107';
        else strengthMeter.style.backgroundColor = '#28a745';
    }
});