// Initialize the recycling platform
document.addEventListener('DOMContentLoaded', function() {
    initDashboardStats();
    initRecyclingCategories();
    initRecyclingMap();
    initScheduleReminders();
});

// Sample data for recycling statistics
const recyclingStats = {
    totalRecycled: 1234,
    treesSaved: 45,
    waterSaved: 2500,
    recyclingPoints: 850
};

// Sample data for recycling categories
const recyclingCategories = {
    paper: {
        name: 'Paper & Cardboard',
        amount: 125,
        icon: 'fa-newspaper'
    },
    glass: {
        name: 'Glass',
        amount: 85,
        icon: 'fa-wine-bottle'
    },
    plastic: {
        name: 'Plastic',
        amount: 95,
        icon: 'fa-box'
    },
    electronics: {
        name: 'Electronics',
        amount: 45,
        icon: 'fa-car-battery'
    }
};

// Sample data for recycling centers
const recyclingCenters = [
    {
        name: 'City Recycling Center',
        type: 'center',
        location: { lat: 40.7128, lng: -74.0060 },
        materials: ['paper', 'glass', 'plastic', 'electronics']
    },
    {
        name: 'Community Drop-off Point',
        type: 'dropoff',
        location: { lat: 40.7580, lng: -73.9855 },
        materials: ['paper', 'glass', 'plastic']
    },
    {
        name: 'Electronics Processing Facility',
        type: 'facility',
        location: { lat: 40.7829, lng: -73.9654 },
        materials: ['electronics']
    }
];

// Initialize dashboard statistics with animation
function initDashboardStats() {
    animateValue('total-recycled', 0, recyclingStats.totalRecycled, 2000);
    animateValue('trees-saved', 0, recyclingStats.treesSaved, 2000);
    animateValue('water-saved', 0, recyclingStats.waterSaved, 2000);
    animateValue('recycling-points', 0, recyclingStats.recyclingPoints, 2000);
}

// Animate number counting
function animateValue(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize recycling categories and logging functionality
function initRecyclingCategories() {
    const logButtons = document.querySelectorAll('.btn-log');
    logButtons.forEach(button => {
        button.addEventListener('click', function() {
            showLogDialog(this.closest('.category-card'));
        });
    });
}

// Show dialog for logging recycling
function showLogDialog(categoryCard) {
    const categoryName = categoryCard.querySelector('h3').textContent;
    const dialog = createLogDialog(categoryName);
    document.body.appendChild(dialog);
    dialog.showModal();
}

// Create dialog element for logging recycling
function createLogDialog(categoryName) {
    const dialog = document.createElement('dialog');
    dialog.className = 'log-dialog';
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    dialog.innerHTML = `
        <h3>Log Recycling - ${categoryName}</h3>
        <form method="dialog" id="recyclingForm">
            <div class="form-group">
                <label for="amount">Amount (kg)</label>
                <input type="number" 
                       id="amount" 
                       min="0.1" 
                       max="1000" 
                       step="0.1" 
                       required 
                       placeholder="Enter amount in kilograms">
                <small class="input-hint">Enter a value between 0.1 and 1000 kg</small>
            </div>
            <div class="form-group">
                <label for="date">Date</label>
                <input type="date" 
                       id="date" 
                       required 
                       max="${today}" 
                       value="${today}">
                <small class="input-hint">Select today or a past date</small>
            </div>
            <div class="form-group">
                <label for="notes">Notes (optional)</label>
                <textarea id="notes" 
                         rows="3" 
                         placeholder="Add any additional notes about your recycling"></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-cancel">Cancel</button>
                <button type="submit" class="btn-submit">Log Recycling</button>
            </div>
        </form>
    `;

    // Handle form submission with validation
    dialog.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(dialog.querySelector('#amount').value);
        const date = dialog.querySelector('#date').value;
        const notes = dialog.querySelector('#notes').value;

        if (amount < 0.1 || amount > 1000) {
            showNotification('Please enter a valid amount between 0.1 and 1000 kg', 'error');
            return;
        }

        if (new Date(date) > new Date()) {
            showNotification('Please select today or a past date', 'error');
            return;
        }

        logRecycling(categoryName, amount, date, notes);
        dialog.close();
    });

    // Handle cancel button
    dialog.querySelector('.btn-cancel').addEventListener('click', () => {
        if (isFormDirty(dialog)) {
            if (confirm('Are you sure you want to cancel? Your entries will be lost.')) {
                dialog.close();
            }
        } else {
            dialog.close();
        }
    });

    // Handle input validation
    const amountInput = dialog.querySelector('#amount');
    amountInput.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        if (value < 0.1 || value > 1000) {
            e.target.setCustomValidity('Please enter a value between 0.1 and 1000 kg');
        } else {
            e.target.setCustomValidity('');
        }
    });

    return dialog;
}

// Check if form has been modified
function isFormDirty(dialog) {
    const amount = dialog.querySelector('#amount').value;
    const notes = dialog.querySelector('#notes').value;
    const today = new Date().toISOString().split('T')[0];
    const date = dialog.querySelector('#date').value;

    return amount !== '' || notes !== '' || date !== today;
}

// Log recycling data with enhanced functionality
function logRecycling(category, amount, date, notes = '') {
    // Here you would typically send this data to a server
    console.log('Logging recycling:', { category, amount, date, notes });
    
    // Calculate environmental impact
    const impact = calculateEnvironmentalImpact(category, amount);
    
    // Update UI
    updateCategoryStats(category, amount);
    updateEnvironmentalImpact(impact);
    
    // Show success notification with impact
    showNotification(`
        Successfully logged ${amount}kg of ${category}<br>
        <small>You just saved ${impact.trees.toFixed(1)} trees and ${impact.water.toFixed(1)}L of water!</small>
    `, 'success');
}

// Calculate environmental impact based on recycling amount
function calculateEnvironmentalImpact(category, amount) {
    const impactFactors = {
        'Paper & Cardboard': { treesPerKg: 0.017, waterPerKg: 28.5 },
        'Glass': { treesPerKg: 0.005, waterPerKg: 12.5 },
        'Plastic': { treesPerKg: 0.010, waterPerKg: 22.0 },
        'Electronics': { treesPerKg: 0.025, waterPerKg: 35.0 }
    };

    const factor = impactFactors[category] || { treesPerKg: 0.01, waterPerKg: 20.0 };
    return {
        trees: amount * factor.treesPerKg,
        water: amount * factor.waterPerKg
    };
}

// Update environmental impact statistics
function updateEnvironmentalImpact(impact) {
    const treesSaved = document.getElementById('trees-saved');
    const waterSaved = document.getElementById('water-saved');
    
    if (treesSaved) {
        const currentTrees = parseInt(treesSaved.textContent);
        animateValue('trees-saved', currentTrees, currentTrees + Math.round(impact.trees), 1000);
    }
    
    if (waterSaved) {
        const currentWater = parseInt(waterSaved.textContent);
        animateValue('water-saved', currentWater, currentWater + Math.round(impact.water), 1000);
    }
}

// Enhanced notification function with types
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
        <div class="notification-content">${message}</div>
    `;
    document.body.appendChild(notification);

    // Add slide-in animation
    notification.style.animation = 'slideIn 0.3s ease forwards';

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Initialize schedule reminders
function initScheduleReminders() {
    const reminderButtons = document.querySelectorAll('.btn-reminder');
    reminderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const scheduleCard = this.closest('.schedule-card');
            const day = scheduleCard.querySelector('.schedule-date span').textContent;
            const type = scheduleCard.querySelector('.schedule-details h3').textContent;
            const time = scheduleCard.querySelector('.schedule-details p').textContent;
            setReminder(day, type, time);
        });
    });
}

// Set a reminder for recycling collection
function setReminder(day, type, time) {
    // Here you would typically integrate with a calendar API or notification system
    console.log('Setting reminder for:', { day, type, time });
    showNotification(`Reminder set for ${type} collection on ${day}`);
}

// Initialize recycling map placeholder
function initRecyclingMap() {
    const mapPlaceholder = document.getElementById('recycling-map');
    if (!mapPlaceholder) return;

    // Add click event to show message
    mapPlaceholder.addEventListener('click', () => {
        showNotification('Map functionality will be available soon');
    });
} 