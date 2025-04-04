document.addEventListener('DOMContentLoaded', () => {
    initializeChallenges();
    initializeFilters();
    initializeUserProgress();
    initializeMyChallenges();
});

// Sample data for challenges
const challenges = [
    {
        id: 1,
        title: 'Zero Waste Week',
        category: 'waste',
        difficulty: 'medium',
        duration: '7 days',
        description: 'Challenge yourself to produce zero waste for an entire week. Learn about composting, recycling, and reducing single-use items.',
        icon: 'fa-recycle',
        status: 'active',
        participants: 156,
        points: 500,
        progress: 65,
        endDate: '2024-04-15'
    },
    {
        id: 2,
        title: 'Green Commute Month',
        category: 'transport',
        difficulty: 'hard',
        duration: '30 days',
        description: 'Commit to using only sustainable transportation methods for a month. Walk, bike, or use public transport instead of driving.',
        icon: 'fa-bicycle',
        status: 'upcoming',
        participants: 89,
        points: 1000,
        progress: 0,
        startDate: '2024-05-01'
    },
    {
        id: 3,
        title: 'Energy Saver Challenge',
        category: 'energy',
        difficulty: 'easy',
        duration: '14 days',
        description: 'Reduce your energy consumption by 20% in two weeks. Learn about energy-efficient practices and smart home solutions.',
        icon: 'fa-bolt',
        status: 'active',
        participants: 234,
        points: 300,
        progress: 85,
        endDate: '2024-04-20'
    },
    {
        id: 4,
        title: 'Water Conservation',
        category: 'water',
        difficulty: 'medium',
        duration: '21 days',
        description: 'Track and reduce your water usage. Implement water-saving techniques and learn about sustainable water management.',
        icon: 'fa-tint',
        status: 'active',
        participants: 167,
        points: 400,
        progress: 45,
        endDate: '2024-04-25'
    }
];

// Sample data for user progress
const userProgress = {
    completedChallenges: 12,
    activeChallenges: 3,
    totalPoints: 2500
};

// Store joined challenges in localStorage
let joinedChallenges = JSON.parse(localStorage.getItem('joinedChallenges')) || [];

function initializeMyChallenges() {
    updateMyChallengesList();
}

function updateMyChallengesList() {
    const myChallengesList = document.querySelector('.my-challenges-list');
    if (!myChallengesList) return;

    if (joinedChallenges.length === 0) {
        myChallengesList.innerHTML = `
            <div class="my-challenge-item">
                <i class="fas fa-info-circle"></i>
                <div class="my-challenge-info">
                    <div class="my-challenge-title">No challenges joined yet</div>
                    <div class="my-challenge-progress">Join a challenge to track your progress</div>
                </div>
            </div>
        `;
        return;
    }

    myChallengesList.innerHTML = joinedChallenges.map(challengeId => {
        const challenge = challenges.find(c => c.id === challengeId);
        if (!challenge) return '';

        return `
            <div class="my-challenge-item" onclick="showChallengeDetails(${challenge.id})">
                <i class="fas ${challenge.icon}"></i>
                <div class="my-challenge-info">
                    <div class="my-challenge-title">${challenge.title}</div>
                    <div class="my-challenge-progress">Progress: ${challenge.progress}%</div>
                    <div class="my-challenge-progress-bar">
                        <div class="my-challenge-progress-fill" style="width: ${challenge.progress}%"></div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function showChallengeDetails(challengeId) {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${challenge.title}</h2>
            <div class="challenge-details">
                <p>${challenge.description}</p>
                <div class="challenge-stats">
                    <div class="challenge-stat">
                        <i class="fas fa-users"></i>
                        <span>${challenge.participants} participants</span>
                    </div>
                    <div class="challenge-stat">
                        <i class="fas fa-star"></i>
                        <span>${challenge.points} points</span>
                    </div>
                    <div class="challenge-stat">
                        <i class="fas fa-clock"></i>
                        <span>${challenge.duration}</span>
                    </div>
                </div>
                <div class="challenge-progress">
                    <div class="progress-info">
                        <span>Your Progress</span>
                        <span>${challenge.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${challenge.progress}%"></div>
                    </div>
                </div>
            </div>
            <div class="form-actions">
                <button class="log-progress-btn" onclick="logProgress(${challenge.id})">Log Progress</button>
                <button class="cancel-btn" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function initializeChallenges() {
    const challengesGrid = document.querySelector('.challenges-grid');
    if (!challengesGrid) return;

    challengesGrid.innerHTML = challenges.map(challenge => `
        <div class="challenge-card">
            <div class="challenge-header">
                <i class="fas ${challenge.icon}"></i>
                <h3>${challenge.title}</h3>
                <span class="challenge-status ${challenge.status}">${challenge.status}</span>
            </div>
            <p class="challenge-description">${challenge.description}</p>
            <div class="challenge-stats">
                <div class="challenge-stat">
                    <i class="fas fa-users"></i>
                    <span>${challenge.participants} participants</span>
                </div>
                <div class="challenge-stat">
                    <i class="fas fa-star"></i>
                    <span>${challenge.points} points</span>
                </div>
                <div class="challenge-stat">
                    <i class="fas fa-clock"></i>
                    <span>${challenge.duration}</span>
                </div>
            </div>
            <div class="challenge-progress">
                <div class="progress-info">
                    <span>Progress</span>
                    <span>${challenge.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${challenge.progress}%"></div>
                </div>
            </div>
            <div class="challenge-actions">
                <button class="join-btn" onclick="joinChallenge(${challenge.id})">
                    ${challenge.status === 'active' ? 'Join Challenge' : 'Coming Soon'}
                </button>
                <button class="log-progress-btn" onclick="logProgress(${challenge.id})">
                    Log Progress
                </button>
            </div>
        </div>
    `).join('');
}

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            filterChallenges(category);
        });
    });
}

function filterChallenges(category) {
    const filteredChallenges = category === 'all' 
        ? challenges 
        : challenges.filter(challenge => challenge.category === category);

    const challengesGrid = document.querySelector('.challenges-grid');
    if (challengesGrid) {
        challengesGrid.innerHTML = filteredChallenges.map(challenge => `
            <div class="challenge-card">
                <div class="challenge-header">
                    <i class="fas ${challenge.icon}"></i>
                    <h3>${challenge.title}</h3>
                    <span class="challenge-status ${challenge.status}">${challenge.status}</span>
                </div>
                <p class="challenge-description">${challenge.description}</p>
                <div class="challenge-stats">
                    <div class="challenge-stat">
                        <i class="fas fa-users"></i>
                        <span>${challenge.participants} participants</span>
                    </div>
                    <div class="challenge-stat">
                        <i class="fas fa-star"></i>
                        <span>${challenge.points} points</span>
                    </div>
                    <div class="challenge-stat">
                        <i class="fas fa-clock"></i>
                        <span>${challenge.duration}</span>
                    </div>
                </div>
                <div class="challenge-progress">
                    <div class="progress-info">
                        <span>Progress</span>
                        <span>${challenge.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${challenge.progress}%"></div>
                    </div>
                </div>
                <div class="challenge-actions">
                    <button class="join-btn" onclick="joinChallenge(${challenge.id})">
                        ${challenge.status === 'active' ? 'Join Challenge' : 'Coming Soon'}
                    </button>
                    <button class="log-progress-btn" onclick="logProgress(${challenge.id})">
                        Log Progress
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function initializeUserProgress() {
    const progressStats = document.querySelector('.progress-stats');
    if (!progressStats) return;

    progressStats.innerHTML = `
        <div class="stat-item">
            <i class="fas fa-trophy"></i>
            <span class="stat-value">${userProgress.completedChallenges}</span>
            <span class="stat-label">Completed</span>
        </div>
        <div class="stat-item">
            <i class="fas fa-fire"></i>
            <span class="stat-value">${userProgress.activeChallenges}</span>
            <span class="stat-label">Active</span>
        </div>
        <div class="stat-item">
            <i class="fas fa-star"></i>
            <span class="stat-value">${userProgress.totalPoints}</span>
            <span class="stat-label">Points</span>
        </div>
    `;
}

function joinChallenge(challengeId) {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge || challenge.status !== 'active') return;

    // Check if already joined
    if (joinedChallenges.includes(challengeId)) {
        showNotification('You have already joined this challenge!', 'info');
        return;
    }

    // Add to joined challenges
    joinedChallenges.push(challengeId);
    localStorage.setItem('joinedChallenges', JSON.stringify(joinedChallenges));

    // Update UI
    updateMyChallengesList();
    updateUserProgress();

    showNotification('Successfully joined the challenge!', 'success');
}

function updateUserProgress() {
    userProgress.activeChallenges = joinedChallenges.length;
    const progressStats = document.querySelector('.progress-stats');
    if (progressStats) {
        progressStats.innerHTML = `
            <div class="stat-item">
                <i class="fas fa-trophy"></i>
                <span class="stat-value">${userProgress.completedChallenges}</span>
                <span class="stat-label">Completed</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-fire"></i>
                <span class="stat-value">${userProgress.activeChallenges}</span>
                <span class="stat-label">Active</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-star"></i>
                <span class="stat-value">${userProgress.totalPoints}</span>
                <span class="stat-label">Points</span>
            </div>
        `;
    }
}

function logProgress(challengeId) {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;

    // Create and show modal for logging progress
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Log Progress - ${challenge.title}</h2>
            <form id="progress-form" onsubmit="submitProgress(event, ${challengeId})">
                <div class="form-group">
                    <label for="progress-percentage">Progress Percentage</label>
                    <input type="number" id="progress-percentage" min="0" max="100" required>
                </div>
                <div class="form-group">
                    <label for="progress-notes">Notes</label>
                    <textarea id="progress-notes" rows="4"></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="submit-btn">Submit Progress</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
}

function submitProgress(event, challengeId) {
    event.preventDefault();
    const percentage = document.getElementById('progress-percentage').value;
    const notes = document.getElementById('progress-notes').value;

    // Here you would typically make an API call to update the backend
    showNotification('Progress logged successfully!', 'success');
    closeModal();
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
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

// Add styles for modal and notification
const styles = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        width: 90%;
        max-width: 500px;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: #333;
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;
    }

    .form-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .cancel-btn,
    .submit-btn {
        flex: 1;
        padding: 0.8rem;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s;
    }

    .cancel-btn {
        background: #f8f9fa;
        color: #666;
    }

    .submit-btn {
        background: #f39c12;
        color: white;
    }

    .notification {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 2rem;
        border-radius: 5px;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s;
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .notification.success {
        background: #e8f5e9;
        color: #2e7d32;
    }

    .notification.error {
        background: #ffebee;
        color: #c62828;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);