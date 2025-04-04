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