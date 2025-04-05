// Sample challenge data
const challenges = [
    {
        id: 1,
        title: "Meatless Monday",
        category: "food",
        type: "weekly",
        difficulty: "beginner",
        description: "Go meatless for one day and reduce your carbon footprint. Try new vegetarian recipes and discover plant-based alternatives.",
        points: 100,
        duration: "1 day",
        rewards: [
            "100 eco-points",
            "Reduced carbon footprint",
            "Health benefits"
        ],
        tips: [
            "Plan your meals in advance",
            "Try new vegetarian recipes",
            "Explore local farmers' markets"
        ],
        impact: {
            co2: 2.5,
            trees: 0.1,
            water: 2000
        },
        streak: 0,
        lastCompleted: null
    },
    {
        id: 2,
        title: "Bike to Work",
        category: "transportation",
        type: "daily",
        difficulty: "intermediate",
        description: "Leave your car at home and bike to work for a week. Reduce emissions and get some exercise!",
        points: 150,
        duration: "5 days",
        rewards: [
            "150 eco-points",
            "Improved fitness",
            "Reduced transportation costs"
        ],
        tips: [
            "Plan your route in advance",
            "Check weather forecast",
            "Ensure your bike is in good condition"
        ],
        impact: {
            co2: 25,
            trees: 1,
            water: 0
        },
        streak: 0,
        lastCompleted: null
    },
    {
        id: 3,
        title: "Zero Waste Challenge",
        category: "waste",
        type: "monthly",
        difficulty: "advanced",
        description: "Reduce your waste production to zero for a month. Focus on reusing, recycling, and composting.",
        points: 300,
        duration: "30 days",
        rewards: [
            "300 eco-points",
            "Reduced waste production",
            "Sustainable lifestyle habits"
        ],
        tips: [
            "Use reusable containers",
            "Compost organic waste",
            "Buy in bulk",
            "Repair instead of replace"
        ],
        impact: {
            co2: 50,
            trees: 2,
            water: 5000
        },
        streak: 0,
        lastCompleted: null
    },
    {
        id: 4,
        title: "Energy Saver",
        category: "energy",
        type: "daily",
        difficulty: "intermediate",
        description: "Reduce your energy consumption by 20% for a week. Unplug devices, use natural light, and optimize heating/cooling.",
        points: 200,
        duration: "7 days",
        rewards: [
            "200 eco-points",
            "Lower energy bills",
            "Reduced carbon footprint"
        ],
        tips: [
            "Unplug unused electronics",
            "Use energy-efficient appliances",
            "Optimize thermostat settings"
        ],
        impact: {
            co2: 15,
            trees: 0.5,
            water: 0
        },
        streak: 0,
        lastCompleted: null
    },
    {
        id: 5,
        title: "Water Conservation",
        category: "water",
        type: "weekly",
        difficulty: "beginner",
        description: "Reduce your water usage by implementing water-saving habits and fixtures.",
        points: 120,
        duration: "7 days",
        rewards: [
            "120 eco-points",
            "Lower water bills",
            "Water conservation skills"
        ],
        tips: [
            "Fix leaky faucets",
            "Take shorter showers",
            "Collect rainwater for plants"
        ],
        impact: {
            co2: 5,
            trees: 0.2,
            water: 1000
        },
        streak: 0,
        lastCompleted: null
    }
];

// User progress data
let userProgress = {
    points: 0,
    completed: 0,
    impact: {
        co2: 0,
        trees: 0,
        water: 0
    },
    activeChallenges: [],
    achievements: {
        beginner: false,
        intermediate: false,
        expert: false
    },
    streaks: {},
    level: 1,
    badges: []
};

// DOM Elements
const challengesGrid = document.querySelector('.challenges-grid');
const typeFilter = document.getElementById('challenge-type');
const categoryFilter = document.getElementById('challenge-category');
const difficultyFilter = document.getElementById('challenge-difficulty');
const modal = document.querySelector('.challenge-modal');
const closeModal = document.querySelector('.close-modal');
const pointsElement = document.querySelector('.points');
const completedElement = document.querySelector('.completed');
const impactElement = document.querySelector('.impact');
const progressFill = document.querySelector('.progress-fill');
const nextLevelElement = document.querySelector('.next-level');
const achievementElements = document.querySelectorAll('.achievement');
const treeCounter = document.querySelector('.tree-counter span');
const waterCounter = document.querySelector('.water-counter span');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadChallenges();
    setupEventListeners();
    updateProgress();
    loadUserProgress();
    checkDailyStreaks();
});

// Load challenges into the grid
function loadChallenges(filteredChallenges = challenges) {
    challengesGrid.innerHTML = '';
    filteredChallenges.forEach(challenge => {
        const card = createChallengeCard(challenge);
        challengesGrid.appendChild(card);
    });
}

// Create a challenge card element
function createChallengeCard(challenge) {
    const card = document.createElement('div');
    card.className = 'challenge-card';
    card.innerHTML = `
        <div class="challenge-card-header">
            <h3>${challenge.title}</h3>
            <div class="challenge-category-badge">${challenge.category}</div>
            <div class="challenge-difficulty-badge difficulty-${challenge.difficulty}">${challenge.difficulty}</div>
        </div>
        <div class="challenge-card-body">
            <p class="challenge-description">${challenge.description}</p>
            <div class="challenge-meta">
                <span class="challenge-points"><i class="fas fa-star"></i> ${challenge.points} points</span>
                <span class="challenge-duration"><i class="fas fa-clock"></i> ${challenge.duration}</span>
            </div>
            ${challenge.streak > 0 ? `<div class="challenge-streak"><i class="fas fa-fire"></i> ${challenge.streak} day streak</div>` : ''}
        </div>
    `;
    card.addEventListener('click', () => showChallengeDetails(challenge));
    return card;
}

// Show challenge details in modal
function showChallengeDetails(challenge) {
    const modal = document.querySelector('.challenge-modal');
    const title = modal.querySelector('.challenge-title');
    const category = modal.querySelector('.challenge-category');
    const difficulty = modal.querySelector('.challenge-difficulty');
    const duration = modal.querySelector('.challenge-duration');
    const description = modal.querySelector('.challenge-description');
    const rewardsList = modal.querySelector('.rewards-list');
    const tipsList = modal.querySelector('.tips-list');
    const impactDetails = modal.querySelector('.impact-details');
    const startButton = modal.querySelector('.start-challenge');
    const completeButton = modal.querySelector('.complete-challenge');

    title.textContent = challenge.title;
    category.textContent = challenge.category;
    difficulty.textContent = challenge.difficulty;
    difficulty.className = `challenge-difficulty difficulty-${challenge.difficulty}`;
    duration.textContent = challenge.duration;
    description.textContent = challenge.description;

    rewardsList.innerHTML = challenge.rewards.map(reward => `
        <li><i class="fas fa-gift"></i> ${reward}</li>
    `).join('');

    tipsList.innerHTML = challenge.tips.map(tip => `
        <li><i class="fas fa-lightbulb"></i> ${tip}</li>
    `).join('');

    impactDetails.innerHTML = `
        <div class="impact-item">
            <i class="fas fa-cloud"></i>
            <p>${challenge.impact.co2} kg CO₂ saved</p>
        </div>
        <div class="impact-item">
            <i class="fas fa-tree"></i>
            <p>${challenge.impact.trees} trees saved</p>
        </div>
        <div class="impact-item">
            <i class="fas fa-tint"></i>
            <p>${challenge.impact.water} liters water saved</p>
        </div>
    `;

    // Check if challenge is already active
    const isActive = userProgress.activeChallenges.includes(challenge.id);
    startButton.style.display = isActive ? 'none' : 'block';
    completeButton.style.display = isActive ? 'block' : 'none';

    startButton.onclick = () => startChallenge(challenge);
    completeButton.onclick = () => completeChallenge(challenge);

    modal.classList.add('active');
}

// Start a challenge
function startChallenge(challenge) {
    if (!userProgress.activeChallenges.includes(challenge.id)) {
        userProgress.activeChallenges.push(challenge.id);
        showNotification(`Started challenge: ${challenge.title}`, 'success');
        updateProgress();
        saveUserProgress();
        modal.classList.remove('active');
    }
}

// Complete a challenge
function completeChallenge(challenge) {
    if (userProgress.activeChallenges.includes(challenge.id)) {
        userProgress.activeChallenges = userProgress.activeChallenges.filter(id => id !== challenge.id);
        userProgress.points += challenge.points;
        userProgress.completed++;
        userProgress.impact.co2 += challenge.impact.co2;
        userProgress.impact.trees += challenge.impact.trees;
        userProgress.impact.water += challenge.impact.water;

        // Update streak
        const today = new Date().toDateString();
        if (challenge.lastCompleted === today) {
            challenge.streak++;
        } else {
            challenge.streak = 1;
        }
        challenge.lastCompleted = today;

        // Check achievements
        if (userProgress.completed >= 5) userProgress.achievements.beginner = true;
        if (userProgress.completed >= 10) userProgress.achievements.intermediate = true;
        if (userProgress.completed >= 25) userProgress.achievements.expert = true;

        // Check level up
        const newLevel = Math.floor(userProgress.points / 500) + 1;
        if (newLevel > userProgress.level) {
            userProgress.level = newLevel;
            showNotification(`Level Up! You're now level ${newLevel}`, 'success');
        }

        showNotification(`Completed challenge: ${challenge.title}! Earned ${challenge.points} points`, 'success');
        updateProgress();
        saveUserProgress();
        modal.classList.remove('active');
    }
}

// Update progress display
function updateProgress() {
    pointsElement.textContent = userProgress.points;
    completedElement.textContent = userProgress.completed;
    impactElement.textContent = `${userProgress.impact.co2.toFixed(1)} kg CO₂ saved`;
    treeCounter.textContent = `${userProgress.impact.trees.toFixed(1)} trees saved`;
    waterCounter.textContent = `${userProgress.impact.water.toFixed(0)} liters saved`;

    // Update progress bar
    const nextLevel = Math.ceil(userProgress.points / 500) * 500;
    const progress = (userProgress.points % 500) / 500 * 100;
    progressFill.style.width = `${progress}%`;
    nextLevelElement.textContent = `Next Level: ${nextLevel} points`;

    // Update achievements
    achievementElements[0].classList.toggle('earned', userProgress.achievements.beginner);
    achievementElements[1].classList.toggle('earned', userProgress.achievements.intermediate);
    achievementElements[2].classList.toggle('earned', userProgress.achievements.expert);
}

// Check daily streaks
function checkDailyStreaks() {
    const today = new Date().toDateString();
    challenges.forEach(challenge => {
        if (challenge.lastCompleted && challenge.lastCompleted !== today) {
            challenge.streak = 0;
        }
    });
    saveUserProgress();
}

// Setup event listeners
function setupEventListeners() {
    // Filter challenges
    typeFilter.addEventListener('change', filterChallenges);
    categoryFilter.addEventListener('change', filterChallenges);
    difficultyFilter.addEventListener('change', filterChallenges);

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Share challenge
    document.querySelector('.share-challenge').addEventListener('click', () => {
        const challengeTitle = document.querySelector('.challenge-title').textContent;
        if (navigator.share) {
            navigator.share({
                title: 'Eco-Friendly Challenge',
                text: `Join me in completing the "${challengeTitle}" challenge!`,
                url: window.location.href
            });
        } else {
            showNotification('Sharing is not supported in your browser', 'info');
        }
    });
}

// Filter challenges based on selected filters
function filterChallenges() {
    const type = typeFilter.value;
    const category = categoryFilter.value;
    const difficulty = difficultyFilter.value;

    const filteredChallenges = challenges.filter(challenge => {
        const typeMatch = type === 'all' || challenge.type === type;
        const categoryMatch = category === 'all' || challenge.category === category;
        const difficultyMatch = difficulty === 'all' || challenge.difficulty === difficulty;
        return typeMatch && categoryMatch && difficultyMatch;
    });

    loadChallenges(filteredChallenges);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Save user progress to localStorage
function saveUserProgress() {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
    localStorage.setItem('challenges', JSON.stringify(challenges));
}

// Load user progress from localStorage
function loadUserProgress() {
    const savedProgress = localStorage.getItem('userProgress');
    const savedChallenges = localStorage.getItem('challenges');
    if (savedProgress) {
        userProgress = JSON.parse(savedProgress);
        updateProgress();
    }
    if (savedChallenges) {
        const parsedChallenges = JSON.parse(savedChallenges);
        challenges.forEach(challenge => {
            const savedChallenge = parsedChallenges.find(c => c.id === challenge.id);
            if (savedChallenge) {
                challenge.streak = savedChallenge.streak;
                challenge.lastCompleted = savedChallenge.lastCompleted;
            }
        });
    }
} 