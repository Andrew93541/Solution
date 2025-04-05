// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Tab Functionality
const tabs = document.querySelectorAll('.tab');
const postsSection = document.querySelector('.posts-section');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Here you would typically fetch and display the appropriate content
        // based on the selected tab
        const tabType = tab.getAttribute('data-tab');
        // Simulate content loading
        simulateContentLoading(tabType);
    });
});

function simulateContentLoading(tabType) {
    postsSection.style.opacity = '0';
    setTimeout(() => {
        // In a real application, you would fetch and update the content here
        postsSection.style.opacity = '1';
    }, 300);
}

// Post Interaction Animations
const postCards = document.querySelectorAll('.post-card');
const interactionButtons = document.querySelectorAll('.interactions button');

postCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

interactionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = button.querySelector('i');
        
        // Add animation class
        icon.classList.add('fa-bounce');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            icon.classList.remove('fa-bounce');
        }, 1000);
        
        // Toggle active state for like button
        if (icon.classList.contains('fa-heart')) {
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        }
    });
});

// Floating Action Button Animation
const fab = document.querySelector('.fab');

fab.addEventListener('mouseenter', () => {
    fab.style.transform = 'scale(1.1)';
});

fab.addEventListener('mouseleave', () => {
    fab.style.transform = 'scale(1)';
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add loading animation for initial page load
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}); 