// Sample posts data
const posts = [
    {
        id: 1,
        username: "Eco Warrior",
        handle: "@ecowarrior",
        time: "2h",
        content: "Just installed solar panels on my roof! 🌞 The energy savings are incredible. Anyone else made the switch to solar recently?",
        image: "https://via.placeholder.com/600x400",
        likes: 56,
        comments: 24,
        retweets: 12
    },
    {
        id: 2,
        username: "Green Living",
        handle: "@greenliving",
        time: "4h",
        content: "Tips for reducing plastic waste in your daily life: \n1. Use reusable shopping bags\n2. Carry a reusable water bottle\n3. Say no to plastic straws\n4. Buy in bulk\nWhat are your favorite ways to reduce plastic?",
        likes: 89,
        comments: 42,
        retweets: 18
    }
];

// Sample users data
const suggestedUsers = [
    {
        id: 1,
        username: "Eco Innovator",
        handle: "@ecoinnovator",
        avatar: "https://via.placeholder.com/50"
    },
    {
        id: 2,
        username: "Green Tech",
        handle: "@greentech",
        avatar: "https://via.placeholder.com/50"
    }
];

// Sample trending topics
const trendingTopics = [
    {
        category: "Environment",
        hashtag: "#ClimateAction",
        posts: "2.5K"
    },
    {
        category: "Sustainability",
        hashtag: "#ZeroWaste",
        posts: "1.8K"
    },
    {
        category: "Energy",
        hashtag: "#RenewableEnergy",
        posts: "1.2K"
    }
];

// Mobile navigation functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('active');
});

// Post form functionality
const postForm = document.querySelector('.post-form');
const postTextarea = postForm?.querySelector('textarea');
const postSubmitBtn = postForm?.querySelector('.post-submit');
const postsFeed = document.querySelector('.posts-feed');
const searchInput = document.querySelector('.search-box input');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    renderSuggestedUsers();
    renderTrendingTopics();
    setupEventListeners();
    setupExplore();
});

// Render posts
function renderPosts() {
    postsFeed.innerHTML = posts.map(post => `
        <article class="post" data-id="${post.id}">
            <div class="post-header">
                <img src="https://via.placeholder.com/50" alt="User Avatar" class="user-avatar">
                <div class="post-user-info">
                    <h4>${post.username}</h4>
                    <span>${post.handle} · ${post.time}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
                ${post.image ? `
                    <div class="post-image">
                        <img src="${post.image}" alt="Post Image">
                    </div>
                ` : ''}
            </div>
            <div class="post-actions">
                <button title="Comment"><i class="far fa-comment"></i> ${post.comments}</button>
                <button title="Retweet"><i class="fas fa-retweet"></i> ${post.retweets}</button>
                <button title="Like"><i class="far fa-heart"></i> ${post.likes}</button>
                <button title="Share"><i class="far fa-share-square"></i></button>
            </div>
        </article>
    `).join('');
}

// Render suggested users
function renderSuggestedUsers() {
    const usersContainer = document.querySelector('.suggested-users');
    usersContainer.innerHTML = `
        <h3>Who to follow</h3>
        ${suggestedUsers.map(user => `
            <div class="user" data-id="${user.id}">
                <img src="${user.avatar}" alt="User Avatar">
                <div class="user-info">
                    <h4>${user.username}</h4>
                    <span>${user.handle}</span>
                </div>
                <button>Follow</button>
            </div>
        `).join('')}
    `;
}

// Render trending topics
function renderTrendingTopics() {
    const topicsContainer = document.querySelector('.trending-topics');
    topicsContainer.innerHTML = `
        <h3>Trending Topics</h3>
        ${trendingTopics.map(topic => `
            <div class="topic">
                <span class="topic-category">${topic.category}</span>
                <h4>${topic.hashtag}</h4>
                <span class="topic-count">${topic.posts} posts</span>
            </div>
        `).join('')}
    `;
}

// Setup event listeners
function setupEventListeners() {
    // Post form submission
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = postTextarea.value.trim();
        if (content) {
            const newPost = {
                id: posts.length + 1,
                username: "Current User",
                handle: "@currentuser",
                time: "now",
                content: content,
                likes: 0,
                comments: 0,
                retweets: 0
            };
            posts.unshift(newPost);
            renderPosts();
            postTextarea.value = '';
        }
    });

    // Post actions (like, retweet, etc.)
    postsFeed.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        const post = button.closest('.post');
        const postId = parseInt(post.dataset.id);
        const action = button.title.toLowerCase();

        if (action === 'like') {
            const likeCount = button.querySelector('i').nextSibling;
            const currentLikes = parseInt(likeCount.textContent);
            likeCount.textContent = currentLikes + 1;
            button.classList.toggle('liked');
        }
    });

    // Follow button
    document.querySelector('.suggested-users').addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button && button.textContent === 'Follow') {
            button.textContent = 'Following';
            button.classList.add('following');
        } else if (button && button.textContent === 'Following') {
            button.textContent = 'Follow';
            button.classList.remove('following');
        }
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPosts = posts.filter(post => 
            post.content.toLowerCase().includes(searchTerm) ||
            post.username.toLowerCase().includes(searchTerm)
        );
        if (searchTerm) {
            renderFilteredPosts(filteredPosts);
        } else {
            renderPosts();
        }
    });
}

// Render filtered posts
function renderFilteredPosts(filteredPosts) {
    postsFeed.innerHTML = filteredPosts.map(post => `
        <article class="post" data-id="${post.id}">
            <div class="post-header">
                <img src="https://via.placeholder.com/50" alt="User Avatar" class="user-avatar">
                <div class="post-user-info">
                    <h4>${post.username}</h4>
                    <span>${post.handle} · ${post.time}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
                ${post.image ? `
                    <div class="post-image">
                        <img src="${post.image}" alt="Post Image">
                    </div>
                ` : ''}
            </div>
            <div class="post-actions">
                <button title="Comment"><i class="far fa-comment"></i> ${post.comments}</button>
                <button title="Retweet"><i class="fas fa-retweet"></i> ${post.retweets}</button>
                <button title="Like"><i class="far fa-heart"></i> ${post.likes}</button>
                <button title="Share"><i class="far fa-share-square"></i></button>
            </div>
        </article>
    `).join('');
}

// Explore functionality
function setupExplore() {
    const exploreLink = document.querySelector('a[title="Explore"]');
    const mainContent = document.querySelector('.community-main');
    const trendingTopics = document.querySelector('.trending-topics');
    
    exploreLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active state
        document.querySelector('.sidebar-nav a.active').classList.remove('active');
        exploreLink.classList.add('active');
        
        // Create explore content
        const exploreContent = `
            <div class="explore-content">
                <div class="explore-header">
                    <h2>Explore</h2>
                    <div class="explore-filters">
                        <button class="filter-btn active" data-filter="trending">Trending</button>
                        <button class="filter-btn" data-filter="hashtags">Hashtags</button>
                        <button class="filter-btn" data-filter="news">News</button>
                    </div>
                </div>
                <div class="explore-feed">
                    ${renderTrendingContent()}
                </div>
            </div>
        `;
        
        mainContent.innerHTML = exploreContent;
        
        // Setup filter buttons
        setupExploreFilters();
    });
}

function renderTrendingContent() {
    return `
        <div class="trending-section">
            <h3>Trending in EcoCities</h3>
            <div class="trending-items">
                ${trendingTopics.map((topic, index) => `
                    <div class="trending-item">
                        <span class="trending-rank">${index + 1}</span>
                        <div class="trending-info">
                            <h4>${topic.hashtag}</h4>
                            <p>${topic.posts} posts</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function setupExploreFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update content based on filter
            const filter = button.dataset.filter;
            const exploreFeed = document.querySelector('.explore-feed');
            
            switch(filter) {
                case 'trending':
                    exploreFeed.innerHTML = renderTrendingContent();
                    break;
                case 'hashtags':
                    exploreFeed.innerHTML = renderHashtagsContent();
                    break;
                case 'news':
                    exploreFeed.innerHTML = renderNewsContent();
                    break;
            }
        });
    });
}

function renderHashtagsContent() {
    return `
        <div class="hashtags-section">
            <h3>Popular Hashtags</h3>
            <div class="hashtags-grid">
                ${hashtags.map(hashtag => `
                    <div class="hashtag-item">
                        <h4>${hashtag.name}</h4>
                        <p>${hashtag.posts} posts</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderNewsContent() {
    return `
        <div class="news-section">
            <h3>Latest News</h3>
            <div class="news-feed">
                ${news.map(item => `
                    <div class="news-item">
                        <div class="news-header">
                            <img src="${item.image}" alt="${item.title}">
                            <div class="news-info">
                                <h4>${item.title}</h4>
                                <span>${item.source} · ${item.time}</span>
                            </div>
                        </div>
                        <p>${item.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Function to create a new post element
function createPostElement(content, userAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', userName = 'User', userHandle = '@user') {
    const post = document.createElement('article');
    post.className = 'post';
    
    const currentTime = new Date();
    const timeString = 'just now';

    post.innerHTML = `
        <div class="post-header">
            <img src="${userAvatar}" alt="User Avatar" class="user-avatar">
            <div class="post-user-info">
                <h4>${userName}</h4>
                <span>${userHandle} · ${timeString}</span>
            </div>
        </div>
        <div class="post-content">
            <p>${content}</p>
        </div>
        <div class="post-actions">
            <button title="Comment"><i class="far fa-comment"></i> 0</button>
            <button title="Retweet"><i class="fas fa-retweet"></i> 0</button>
            <button title="Like"><i class="far fa-heart"></i> 0</button>
            <button title="Share"><i class="far fa-share-square"></i></button>
        </div>
    `;

    return post;
}

// Post submit functionality
postSubmitBtn?.addEventListener('click', () => {
    const content = postTextarea?.value.trim();
    if (content) {
        const newPost = createPostElement(content);
        postsFeed?.insertBefore(newPost, postsFeed.firstChild);
        if (postTextarea) postTextarea.value = '';
    }
});

// Post media upload buttons
const mediaButtons = document.querySelectorAll('.post-options button');
mediaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real application, this would open a media upload dialog
        alert('Media upload functionality would be implemented here');
    });
});

// Like, Comment, Retweet, and Share functionality
document.addEventListener('click', (e) => {
    const target = e.target;
    const button = target.closest('.post-actions button');
    
    if (button) {
        const action = button.title.toLowerCase();
        const icon = button.querySelector('i');
        const countElement = button.childNodes[1];
        
        switch(action) {
            case 'like':
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
                icon.classList.toggle('text-red');
                let likeCount = parseInt(countElement.textContent) || 0;
                countElement.textContent = icon.classList.contains('fas') ? likeCount + 1 : likeCount - 1;
                break;
            case 'retweet':
                icon.classList.toggle('active');
                let retweetCount = parseInt(countElement.textContent) || 0;
                countElement.textContent = icon.classList.contains('active') ? retweetCount + 1 : retweetCount - 1;
                break;
            case 'comment':
                // In a real application, this would open a comment dialog
                alert('Comment dialog would open here');
                break;
            case 'share':
                // In a real application, this would open a share dialog
                alert('Share dialog would open here');
                break;
        }
    }
});

// Follow button functionality
const followButtons = document.querySelectorAll('.suggested-users .user button');
followButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === 'Follow') {
            button.textContent = 'Following';
            button.classList.add('following');
        } else {
            button.textContent = 'Follow';
            button.classList.remove('following');
        }
    });
});

// Sidebar navigation functionality
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Post button in sidebar
const sidebarPostButton = document.querySelector('.post-button');
sidebarPostButton?.addEventListener('click', () => {
    // Scroll to post form and focus textarea
    postForm?.scrollIntoView({ behavior: 'smooth' });
    postTextarea?.focus();
}); 