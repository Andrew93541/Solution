// Urban Farming JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    initializeFarmMap();
    startRealTimeUpdates();
    initializeEventListeners();
});

// Sample data for charts
const cropGrowthData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [{
        label: 'Crop Growth (cm)',
        data: [5, 12, 25, 40, 55, 70],
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

const waterUsageData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: 'Water Usage (L)',
        data: [20, 25, 18, 22, 20, 15, 20],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

const yieldPredictionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Expected Yield (kg)',
        data: [50, 75, 100, 150, 200, 250],
        borderColor: '#f1c40f',
        backgroundColor: 'rgba(241, 196, 15, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

function initializeCharts() {
    // Crop Growth Chart
    const cropGrowthCtx = document.getElementById('cropGrowthChart').getContext('2d');
    new Chart(cropGrowthCtx, {
        type: 'line',
        data: cropGrowthData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} cm`;
                        }
                    }
                }
            }
        }
    });

    // Water Usage Chart
    const waterUsageCtx = document.getElementById('waterUsageChart').getContext('2d');
    new Chart(waterUsageCtx, {
        type: 'line',
        data: waterUsageData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} L`;
                        }
                    }
                }
            }
        }
    });

    // Yield Prediction Chart
    const yieldPredictionCtx = document.getElementById('yieldPredictionChart').getContext('2d');
    new Chart(yieldPredictionCtx, {
        type: 'line',
        data: yieldPredictionData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} kg`;
                        }
                    }
                }
            }
        }
    });
}

function initializeFarmMap() {
    // Initialize the farm map (replace with actual map implementation)
    const mapContainer = document.getElementById('farmMap');
    if (mapContainer) {
        // Add map initialization code here
        // This could be Google Maps, Leaflet, or another mapping library
        mapContainer.innerHTML = '<div class="map-placeholder">Farm Map Loading...</div>';
    }
}

function startRealTimeUpdates() {
    // Update weather and stats every 5 seconds
    setInterval(updateWeather, 5000);
    setInterval(updateStats, 5000);
}

function updateWeather() {
    // Simulate weather updates (replace with actual API calls)
    const weatherData = {
        temperature: (24 + Math.random() * 2).toFixed(1),
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy'][Math.floor(Math.random() * 3)],
        forecast: [
            { day: 'Mon', temp: (22 + Math.random() * 2).toFixed(1), icon: 'sun' },
            { day: 'Tue', temp: (20 + Math.random() * 2).toFixed(1), icon: 'cloud-sun' },
            { day: 'Wed', temp: (18 + Math.random() * 2).toFixed(1), icon: 'cloud' }
        ]
    };

    // Update current weather
    document.querySelector('.temperature').textContent = `${weatherData.temperature}°C`;
    document.querySelector('.condition').textContent = weatherData.condition;

    // Update forecast
    const forecastItems = document.querySelectorAll('.forecast-item');
    forecastItems.forEach((item, index) => {
        const forecast = weatherData.forecast[index];
        item.querySelector('.day').textContent = forecast.day;
        item.querySelector('.temp').textContent = `${forecast.temp}°C`;
        item.querySelector('i').className = `fas fa-${forecast.icon}`;
    });
}

function updateStats() {
    // Simulate stats updates (replace with actual API calls)
    const stats = {
        activeCrops: Math.floor(12 + Math.random() * 2),
        growthRate: (85 + Math.random() * 5).toFixed(1),
        waterEfficiency: (65 + Math.random() * 5).toFixed(1)
    };

    document.querySelector('.stat-value:nth-child(1)').textContent = stats.activeCrops;
    document.querySelector('.stat-value:nth-child(2)').textContent = `${stats.growthRate}%`;
    document.querySelector('.stat-value:nth-child(3)').textContent = `${stats.waterEfficiency}%`;
}

function initializeEventListeners() {
    // Add event listeners for action buttons
    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', handleActionButtonClick);
    });

    // Add event listeners for crop items
    document.querySelectorAll('.crop-item').forEach(item => {
        item.addEventListener('click', handleCropItemClick);
    });
}

function handleActionButtonClick(event) {
    const button = event.currentTarget;
    const action = button.textContent.toLowerCase();

    switch (action) {
        case 'view market details':
            showMarketDetails();
            break;
        case 'register':
            handleWorkshopRegistration(button);
            break;
        case 'participate':
            handleExchangeParticipation(button);
            break;
        case 'view guides':
            showGrowingGuides();
            break;
        case 'watch videos':
            showVideoTutorials();
            break;
        case 'join community':
            showCommunityOptions();
            break;
    }
}

function handleCropItemClick(event) {
    const cropItem = event.currentTarget;
    const cropName = cropItem.querySelector('h4').textContent;
    showCropDetails(cropName);
}

function showMarketDetails() {
    showNotification('Opening market details...', 'info');
    // Implement market details modal or navigation
}

function handleWorkshopRegistration(button) {
    const workshopTitle = button.closest('.workshop-item').querySelector('h4').textContent;
    showNotification(`Registering for: ${workshopTitle}`, 'success');
    // Implement workshop registration logic
}

function handleExchangeParticipation(button) {
    const exchangeType = button.closest('.exchange-item').querySelector('h4').textContent;
    showNotification(`Joining ${exchangeType}...`, 'success');
    // Implement exchange participation logic
}

function showGrowingGuides() {
    showNotification('Loading growing guides...', 'info');
    // Implement guides display logic
}

function showVideoTutorials() {
    showNotification('Loading video tutorials...', 'info');
    // Implement video tutorials display logic
}

function showCommunityOptions() {
    showNotification('Loading community options...', 'info');
    // Implement community options display logic
}

function showCropDetails(cropName) {
    showNotification(`Loading details for ${cropName}...`, 'info');
    // Implement crop details display logic
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification styles dynamically
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }

    .notification.info {
        background: #3498db;
    }

    .notification.success {
        background: #2ecc71;
    }

    .notification.warning {
        background: #f1c40f;
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

    .map-placeholder {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        color: #666;
        font-size: 1.1rem;
    }
`;
document.head.appendChild(style); 