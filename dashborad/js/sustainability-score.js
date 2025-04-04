document.addEventListener('DOMContentLoaded', function() {
    initializeScoreChart();
    initializeCategoryScores();
    initializeAchievements();
    setupActionButtons();
});

// Sample data for user's sustainability scores
const userScores = {
    energy: 65,
    waste: 45,
    transport: 80,
    water: 70,
    total: 260
};

// Sample achievements data
const achievements = [
    {
        id: 1,
        title: 'Energy Saver',
        description: 'Reduced energy consumption by 20%',
        icon: 'fa-bolt',
        unlocked: true
    },
    {
        id: 2,
        title: 'Recycling Pro',
        description: 'Recycled 100kg of materials',
        icon: 'fa-recycle',
        unlocked: true
    },
    {
        id: 3,
        title: 'Green Commuter',
        description: 'Used sustainable transport 30 times',
        icon: 'fa-bicycle',
        unlocked: false
    },
    {
        id: 4,
        title: 'Water Guardian',
        description: 'Reduced water usage by 25%',
        icon: 'fa-tint',
        unlocked: false
    }
];

function initializeScoreChart() {
    const ctx = document.getElementById('scoreChart').getContext('2d');
    window.scoreChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Energy', 'Waste', 'Transport', 'Water'],
            datasets: [{
                label: 'Your Scores',
                data: [userScores.energy, userScores.waste, userScores.transport, userScores.water],
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                borderColor: '#2ecc71',
                pointBackgroundColor: '#2ecc71',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#2ecc71'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

function initializeCategoryScores() {
    // Update total score
    const scoreValue = document.querySelector('.score-value');
    const scoreLevel = document.querySelector('.score-level');
    scoreValue.textContent = userScores.total;
    scoreLevel.textContent = getScoreLevel(userScores.total);

    // Update category scores
    Object.entries(userScores).forEach(([category, score]) => {
        if (category !== 'total') {
            const categorySection = document.querySelector(`[data-category="${category}"]`).closest('.category-section');
            const progressBar = categorySection.querySelector('.progress');
            const scoreSpan = categorySection.querySelector('.score');
            
            progressBar.style.width = `${score}%`;
            scoreSpan.textContent = `${score}/100`;
        }
    });
}

function getScoreLevel(total) {
    if (total >= 400) return 'Eco Master';
    if (total >= 300) return 'Green Champion';
    if (total >= 200) return 'Eco Warrior';
    if (total >= 100) return 'Green Explorer';
    return 'Beginner';
}

function initializeAchievements() {
    const achievementsGrid = document.querySelector('.achievements-grid');
    achievementsGrid.innerHTML = achievements.map(achievement => `
        <div class="achievement-card ${achievement.unlocked ? '' : 'locked'}">
            <div class="achievement-icon">
                <i class="fas ${achievement.icon}"></i>
            </div>
            <h3 class="achievement-title">${achievement.title}</h3>
            <p class="achievement-description">${achievement.description}</p>
        </div>
    `).join('');
}

function setupActionButtons() {
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            handleAction(category);
        });
    });
}

function handleAction(category) {
    // Show action modal based on category
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = getActionModalContent(category);
    
    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.close');
    const closeModalBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.remove();
    closeModalBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    // Handle form submission
    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleActionSubmit(category, form);
    });
}

function getActionModalContent(category) {
    const modalContents = {
        energy: `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Energy Audit</h2>
                <form>
                    <div class="form-group">
                        <label>Current Energy Usage (kWh)</label>
                        <input type="number" required>
                    </div>
                    <div class="form-group">
                        <label>Target Reduction (%)</label>
                        <input type="number" required>
                    </div>
                    <div class="form-group">
                        <label>Implementation Plan</label>
                        <textarea required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Submit Audit</button>
                    <button type="button" class="close-modal">Cancel</button>
                </form>
            </div>
        `,
        waste: `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Recycling Program</h2>
                <form>
                    <div class="form-group">
                        <label>Current Waste (kg/month)</label>
                        <input type="number" required>
                    </div>
                    <div class="form-group">
                        <label>Recycling Target (kg/month)</label>
                        <input type="number" required>
                    </div>
                    <div class="form-group">
                        <label>Program Details</label>
                        <textarea required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Start Program</button>
                    <button type="button" class="close-modal">Cancel</button>
                </form>
            </div>
        `,
        transport: `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Green Commute Log</h2>
                <form>
                    <div class="form-group">
                        <label>Transport Type</label>
                        <select required>
                            <option value="bicycle">Bicycle</option>
                            <option value="public">Public Transport</option>
                            <option value="walking">Walking</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Distance (km)</label>
                        <input type="number" required>
                    </div>
                    <div class="form-group">
                        <label>Date</label>
                        <input type="date" required>
                    </div>
                    <button type="submit" class="submit-btn">Log Commute</button>
                    <button type="button" class="close-modal">Cancel</button>
                </form>
            </div>
        `,
        water: `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Water Conservation</h2>
                <form>
                    <div class="form-group">
                        <label>Current Water Usage (L/day)</label>
                        <input type="number" required>
                    </div>
                    <div class="form-group">
                        <label>Conservation Target (%)</label>
                        <input type="number" required>
                    </div>
                    <div class="form-group">
                        <label>Implementation Plan</label>
                        <textarea required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Save Plan</button>
                    <button type="button" class="close-modal">Cancel</button>
                </form>
            </div>
        `
    };

    return modalContents[category];
}

function handleActionSubmit(category, form) {
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    showNotification('Action completed successfully!', 'success');
    form.closest('.modal').remove();
}

// Add notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add modal and notification styles
const style = document.createElement('style');
style.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        width: 90%;
        max-width: 500px;
        position: relative;
    }

    .close {
        position: absolute;
        right: 1rem;
        top: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: #333;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;
    }

    .form-group textarea {
        height: 100px;
        resize: vertical;
    }

    .submit-btn,
    .close-modal {
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        margin-right: 1rem;
    }

    .submit-btn {
        background: #2ecc71;
        color: white;
    }

    .close-modal {
        background: #f8f9fa;
        color: #666;
    }

    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
    }

    .notification.success {
        background: #2ecc71;
    }

    .notification.error {
        background: #e74c3c;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);