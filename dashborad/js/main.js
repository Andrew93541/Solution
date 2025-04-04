adocument.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        } else {
            navbar.style.background = 'transparent';
        }
    });

    // Button hover effects
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.transition = 'transform 0.3s ease';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Stats animation
    const statsSection = document.querySelector('.stats');
    let animated = false;

    const animateStats = () => {
        if (animated) return;
        
        document.querySelectorAll('.stat-box h3').forEach(stat => {
            const target = parseInt(stat.textContent);
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    stat.textContent = Math.ceil(count) + '+';
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + '+';
                }
            };

            updateCount();
        });

        animated = true;
    };

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === statsSection) {
                    animateStats();
                }
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.2 });

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Navigation smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
  // Search functionality
  const searchInput = document.querySelector('.search-input');
  searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const posts = document.querySelectorAll('.post-card');
      
      posts.forEach(post => {
          const title = post.querySelector('.post-title').textContent.toLowerCase();
          const preview = post.querySelector('.post-preview').textContent.toLowerCase();
          
          if (title.includes(searchTerm) || preview.includes(searchTerm)) {
              post.style.display = 'block';
          } else {
              post.style.display = 'none';
          }
      });
  });

  // Filter functionality
  const filterDropdown = document.querySelector('.filter-dropdown');
  filterDropdown.addEventListener('change', (e) => {
      const selectedCategory = e.target.value.toLowerCase();
      const posts = document.querySelectorAll('.post-card');
      
      posts.forEach(post => {
          const category = post.querySelector('.post-category').textContent.toLowerCase();
          
          if (!selectedCategory || category === selectedCategory) {
              post.style.display = 'block';
          } else {
              post.style.display = 'none';
          }
      });
  });

  // New Post Button
  const newPostBtn = document.querySelector('.new-post-btn');
  newPostBtn.addEventListener('click', () => {
      alert('Create new post functionality will be implemented here!');
  });