// Community Forums Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initializeForums();
    initializeCategories();
    initializeViewOptions();
    initializeSearch();
    initializeNewTopicModal();
    initializePagination();
    initializeSocialFeatures();
});

// Sample data for forum topics with Twitter-like content
const topics = [
    {
        id: 1,
        title: 'Just installed solar panels on my home! 🌞',
        category: 'energy',
        author: {
            name: 'EcoWarrior',
            avatar: 'https://i.pravatar.cc/150?img=1',
            handle: '@EcoWarrior',
            verified: true
        },
        content: 'Excited to share that I\'ve just completed my solar panel installation! The process took about 2 days and the team was amazing. Already seeing a 40% reduction in my electricity bill. #SolarPower #RenewableEnergy',
        tags: ['solar', 'renewable-energy', 'installation', 'savings'],
        stats: {
            views: 245,
            replies: 12,
            likes: 45,
            reposts: 8
        },
        timestamp: '2024-03-15T10:30:00Z',
        isLiked: false,
        isReposted: false,
        isBookmarked: false,
        replies: [
            {
                id: 101,
                author: {
                    name: 'GreenTech',
                    avatar: 'https://i.pravatar.cc/150?img=5',
                    handle: '@GreenTech'
                },
                content: 'That\'s amazing! How much did the installation cost?',
                timestamp: '2024-03-15T10:35:00Z',
                likes: 3
            }
        ]
    },
    {
        id: 2,
        title: 'My zero-waste journey starts today! 🌱',
        category: 'recycling',
        author: {
            name: 'ZeroWasteLife',
            avatar: 'https://i.pravatar.cc/150?img=2',
            handle: '@ZeroWasteLife',
            verified: true
        },
        content: 'Starting my zero-waste journey today! First step: replaced all single-use plastics with reusable alternatives. Check out my new sustainable kitchen setup! #ZeroWaste #SustainableLiving',
        tags: ['zero-waste', 'sustainable-living', 'plastic-free'],
        stats: {
            views: 189,
            replies: 8,
            likes: 32,
            reposts: 15
        },
        timestamp: '2024-03-15T09:15:00Z',
        isLiked: false,
        isReposted: false,
        isBookmarked: false,
        replies: []
    },
    {
        id: 3,
        title: 'Community Garden Update: First Harvest! 🥬',
        category: 'food',
        author: {
            name: 'UrbanFarmer',
            avatar: 'https://i.pravatar.cc/150?img=3',
            handle: '@UrbanFarmer'
        },
        content: 'Our community garden\'s first harvest is in! We grew organic vegetables using sustainable methods. The whole neighborhood came together to share the bounty. #CommunityGarden #UrbanFarming',
        tags: ['gardening', 'community', 'sustainable-food', 'harvest'],
        stats: {
            views: 312,
            replies: 15,
            likes: 67,
            reposts: 23
        },
        timestamp: '2024-03-14T15:45:00Z',
        isLiked: false,
        isReposted: false,
        isBookmarked: false,
        replies: [
            {
                id: 102,
                author: {
                    name: 'GreenThumb',
                    avatar: 'https://i.pravatar.cc/150?img=6',
                    handle: '@GreenThumb'
                },
                content: 'This is incredible! Would love to join next time!',
                timestamp: '2024-03-14T16:00:00Z',
                likes: 5
            }
        ]
    },
    {
        id: 4,
        title: 'Electric Bike Commute: Day 1 🚲',
        category: 'transport',
        author: {
            name: 'EcoCommuter',
            avatar: 'https://i.pravatar.cc/150?img=4',
            handle: '@EcoCommuter',
            verified: true
        },
        content: 'Switched to an electric bike for my daily commute. 10 miles each way, and I\'m loving it! No more traffic jams, and I\'m reducing my carbon footprint. #SustainableTransport #EcoCommute',
        tags: ['electric-bike', 'commute', 'sustainable-transport'],
        stats: {
            views: 178,
            replies: 6,
            likes: 28,
            reposts: 12
        },
        timestamp: '2024-03-14T14:20:00Z',
        isLiked: false,
        isReposted: false,
        isBookmarked: false,
        replies: []
    }
];

let currentCategory = 'all';
let currentView = 'latest';
let currentPage = 1;
const itemsPerPage = 10;

function initializeForums() {
    displayTopics();
}

function displayTopics() {
    const topicsList = document.querySelector('.topics-list');
    if (!topicsList) return;

    let filteredTopics = filterTopics(topics);
    filteredTopics = sortTopics(filteredTopics);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTopics = filteredTopics.slice(startIndex, endIndex);

    topicsList.innerHTML = paginatedTopics.map(topic => `
        <div class="topic-item">
            <div class="topic-icon">
                <img src="${topic.author.avatar}" alt="${topic.author.name}" class="author-avatar">
            </div>
            <div class="topic-content">
                <div class="topic-header">
                    <div class="author-info">
                        <span class="author-name">${topic.author.name}</span>
                        ${topic.author.verified ? '<i class="fas fa-check-circle verified"></i>' : ''}
                        <span class="author-handle">${topic.author.handle}</span>
                        <span class="topic-time">${formatTimeAgo(topic.timestamp)}</span>
                    </div>
                    <button class="topic-menu-btn" title="More options">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
                <a href="#" class="topic-title">${topic.title}</a>
                <p class="topic-preview">${topic.content}</p>
                <div class="topic-tags">
                    ${topic.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                <div class="topic-actions">
                    <button class="action-btn ${topic.isLiked ? 'active' : ''}" data-action="like" data-topic-id="${topic.id}">
                        <i class="fas fa-heart"></i>
                        <span>${topic.stats.likes}</span>
                    </button>
                    <button class="action-btn ${topic.isReposted ? 'active' : ''}" data-action="repost" data-topic-id="${topic.id}">
                        <i class="fas fa-retweet"></i>
                        <span>${topic.stats.reposts}</span>
                    </button>
                    <button class="action-btn" data-action="reply" data-topic-id="${topic.id}">
                        <i class="fas fa-comment"></i>
                        <span>${topic.stats.replies}</span>
                    </button>
                    <button class="action-btn" data-action="share" data-topic-id="${topic.id}">
                        <i class="fas fa-share"></i>
                    </button>
                    <button class="action-btn ${topic.isBookmarked ? 'active' : ''}" data-action="bookmark" data-topic-id="${topic.id}">
                        <i class="fas fa-bookmark"></i>
                    </button>
                </div>
                ${topic.replies.length > 0 ? `
                    <div class="topic-replies">
                        ${topic.replies.map(reply => `
                            <div class="reply-item">
                                <img src="${reply.author.avatar}" alt="${reply.author.name}" class="reply-avatar">
                                <div class="reply-content">
                                    <div class="reply-header">
                                        <span class="reply-author">${reply.author.name}</span>
                                        <span class="reply-handle">${reply.author.handle}</span>
                                        <span class="reply-time">${formatTimeAgo(reply.timestamp)}</span>
                                    </div>
                                    <p class="reply-text">${reply.content}</p>
                                    <button class="action-btn" data-action="like" data-reply-id="${reply.id}">
                                        <i class="fas fa-heart"></i>
                                        <span>${reply.likes}</span>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');

    updatePagination(filteredTopics.length);
    initializeTopicActions();
}

function getCategoryIcon(category) {
    const icons = {
        recycling: 'fa-recycle',
        energy: 'fa-bolt',
        transport: 'fa-bicycle',
        food: 'fa-leaf',
        building: 'fa-home',
        events: 'fa-calendar'
    };
    return icons[category] || 'fa-comments';
}

function formatTimeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 60) {
        return `${minutes}m ago`;
    } else if (hours < 24) {
        return `${hours}h ago`;
    } else {
        return `${days}d ago`;
    }
}

function filterTopics(topics) {
    return topics.filter(topic => {
        if (currentCategory !== 'all' && topic.category !== currentCategory) {
            return false;
        }
        return true;
    });
}

function sortTopics(topics) {
    switch (currentView) {
        case 'popular':
            return [...topics].sort((a, b) => b.stats.views - a.stats.views);
        case 'unanswered':
            return [...topics].sort((a, b) => a.stats.replies - b.stats.replies);
        case 'latest':
        default:
            return [...topics].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
}

function initializeCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            currentPage = 1;
            displayTopics();
        });
    });
}

function initializeViewOptions() {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentView = button.dataset.view;
            currentPage = 1;
            displayTopics();
        });
    });
}

function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-icon');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase().trim();
            if (query) {
                const filteredTopics = topics.filter(topic => 
                    topic.title.toLowerCase().includes(query) ||
                    topic.content.toLowerCase().includes(query) ||
                    topic.tags.some(tag => tag.toLowerCase().includes(query))
                );
                displayFilteredTopics(filteredTopics);
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.toLowerCase().trim();
                if (query) {
                    const filteredTopics = topics.filter(topic => 
                        topic.title.toLowerCase().includes(query) ||
                        topic.content.toLowerCase().includes(query) ||
                        topic.tags.some(tag => tag.toLowerCase().includes(query))
                    );
                    displayFilteredTopics(filteredTopics);
                }
            }
        });
    }
}

function displayFilteredTopics(filteredTopics) {
    const topicsList = document.querySelector('.topics-list');
    if (!topicsList) return;

    topicsList.innerHTML = filteredTopics.map(topic => `
        <div class="topic-item">
            <div class="topic-icon">
                <i class="fas ${getCategoryIcon(topic.category)}"></i>
            </div>
            <div class="topic-content">
                <a href="#" class="topic-title">${topic.title}</a>
                <div class="topic-meta">
                    <span>Posted by ${topic.author.name}</span>
                    <span>•</span>
                    <span>${formatTimeAgo(topic.timestamp)}</span>
                </div>
                <p class="topic-preview">${topic.content}</p>
                <div class="topic-tags">
                    ${topic.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="topic-stats">
                    <span class="stat">
                        <i class="fas fa-eye"></i>
                        ${topic.stats.views}
                    </span>
                    <span class="stat">
                        <i class="fas fa-comments"></i>
                        ${topic.stats.replies}
                    </span>
                    <span class="stat">
                        <i class="fas fa-heart"></i>
                        ${topic.stats.likes}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

function initializeNewTopicModal() {
    const newTopicBtn = document.querySelector('.new-topic-btn');
    const modal = document.getElementById('newTopicModal');
    const closeModal = document.querySelector('.close-modal');
    const form = document.getElementById('newTopicForm');
    const contentInput = document.getElementById('topicContent');
    const charCount = document.getElementById('charCount');
    const submitBtn = document.querySelector('.submit-btn');
    const categoryButtons = document.querySelectorAll('.topic-categories .category-btn');
    const tagInput = document.getElementById('topicTags');
    const suggestedTags = document.querySelectorAll('.suggested-tags .tag');

    // Open modal
    if (newTopicBtn) {
        newTopicBtn.addEventListener('click', () => {
            modal.classList.add('active');
            contentInput.focus();
        });
    }

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            form.reset();
            resetForm();
        });
    }

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            form.reset();
            resetForm();
        }
    });

    // Character counter
    if (contentInput && charCount) {
        contentInput.addEventListener('input', () => {
            const count = contentInput.value.length;
            charCount.textContent = count;
            updateSubmitButton(count);
        });
    }

    // Category selection
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            document.getElementById('topicCategory').value = button.dataset.category;
            updateSubmitButton(contentInput.value.length);
        });
    });

    // Tag selection
    suggestedTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const currentTags = tagInput.value.split(',').map(t => t.trim());
            const tagText = tag.textContent;
            
            if (currentTags.includes(tagText)) {
                // Remove tag if already selected
                tagInput.value = currentTags.filter(t => t !== tagText).join(', ');
            } else {
                // Add tag if not selected
                tagInput.value = [...currentTags, tagText].join(', ');
            }
        });
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const content = contentInput.value.trim();
            const category = document.getElementById('topicCategory').value;
            const tags = tagInput.value.split(',').map(tag => tag.trim()).filter(tag => tag);

            if (!content || !category) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Create new topic
            const newTopic = {
                id: topics.length + 1,
                title: content.split('\n')[0], // First line as title
                category: category,
                author: {
                    name: 'Current User',
                    avatar: 'https://i.pravatar.cc/150?img=1',
                    handle: '@CurrentUser',
                    verified: false
                },
                content: content,
                tags: tags,
                stats: {
                    views: 0,
                    replies: 0,
                    likes: 0,
                    reposts: 0
                },
                timestamp: new Date().toISOString(),
                isLiked: false,
                isReposted: false,
                isBookmarked: false,
                replies: []
            };

            // Add to topics array
            topics.unshift(newTopic);

            // Show success message
            showNotification('Topic posted successfully!', 'success');
            
            // Close modal and reset form
            modal.classList.remove('active');
            form.reset();
            resetForm();

            // Refresh topics display
            displayTopics();
        });
    }
}

function updateSubmitButton(contentLength) {
    const submitBtn = document.querySelector('.submit-btn');
    const category = document.getElementById('topicCategory').value;
    
    submitBtn.disabled = contentLength === 0 || !category;
}

function resetForm() {
    // Reset category buttons
    document.querySelectorAll('.topic-categories .category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Reset character counter
    document.getElementById('charCount').textContent = '0';
    
    // Reset submit button
    updateSubmitButton(0);
}

function initializePagination() {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;

    pagination.addEventListener('click', (e) => {
        if (e.target.classList.contains('page-btn')) {
            const page = parseInt(e.target.textContent);
            if (!isNaN(page)) {
                currentPage = page;
                displayTopics();
            } else if (e.target.textContent === 'Previous') {
                if (currentPage > 1) {
                    currentPage--;
                    displayTopics();
                }
            } else if (e.target.textContent === 'Next') {
                const totalPages = Math.ceil(filterTopics(topics).length / itemsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    displayTopics();
                }
            }
        }
    });
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;

    const pageNumbers = pagination.querySelector('.page-numbers');
    const prevBtn = pagination.querySelector('.page-btn:first-child');
    const nextBtn = pagination.querySelector('.page-btn:last-child');

    // Update previous button
    prevBtn.disabled = currentPage === 1;

    // Update page numbers
    let pageNumbersHtml = '';
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            pageNumbersHtml += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}">${i}</button>
            `;
        } else if (
            i === currentPage - 2 ||
            i === currentPage + 2
        ) {
            pageNumbersHtml += '<span>...</span>';
        }
    }
    pageNumbers.innerHTML = pageNumbersHtml;

    // Update next button
    nextBtn.disabled = currentPage === totalPages;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function initializeSocialFeatures() {
    initializeTopicActions();
}

function initializeTopicActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const action = button.dataset.action;
            const topicId = parseInt(button.dataset.topicId);
            const topic = topics.find(t => t.id === topicId);

            if (!topic) return;

            switch (action) {
                case 'like':
                    topic.isLiked = !topic.isLiked;
                    topic.stats.likes += topic.isLiked ? 1 : -1;
                    button.classList.toggle('active');
                    button.querySelector('span').textContent = topic.stats.likes;
                    break;
                case 'repost':
                    topic.isReposted = !topic.isReposted;
                    topic.stats.reposts += topic.isReposted ? 1 : -1;
                    button.classList.toggle('active');
                    button.querySelector('span').textContent = topic.stats.reposts;
                    if (topic.isReposted) {
                        showNotification('Topic reposted!', 'success');
                    }
                    break;
                case 'bookmark':
                    topic.isBookmarked = !topic.isBookmarked;
                    button.classList.toggle('active');
                    showNotification(topic.isBookmarked ? 'Topic bookmarked!' : 'Topic removed from bookmarks', 'info');
                    break;
                case 'reply':
                    // Implement reply functionality
                    showNotification('Reply feature coming soon!', 'info');
                    break;
                case 'share':
                    // Implement share functionality
                    showNotification('Share feature coming soon!', 'info');
                    break;
            }
        });
    });
} 