// Resilient Infrastructure JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    initializeInfrastructureMap();
    startRealTimeUpdates();
    initializeEventListeners();
});

// Sample data for charts
const energyUsageData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Energy Usage (kWh)',
        data: [2500, 2200, 2800, 2400, 2600, 2300],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

const waterManagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: 'Water Usage (m³)',
        data: [150, 140, 160, 145, 155, 130, 145],
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

const wasteProcessingData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
        label: 'Waste Processed (tons)',
        data: [25, 28, 22, 30],
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

function initializeCharts() {
    // Energy Usage Chart
    const energyUsageCtx = document.getElementById('energyUsageChart').getContext('2d');
    new Chart(energyUsageCtx, {
        type: 'line',
        data: energyUsageData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} kWh`;
                        }
                    }
                }
            }
        }
    });

    // Water Management Chart
    const waterManagementCtx = document.getElementById('waterManagementChart').getContext('2d');
    new Chart(waterManagementCtx, {
        type: 'line',
        data: waterManagementData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} m³`;
                        }
                    }
                }
            }
        }
    });

    // Waste Processing Chart
    const wasteProcessingCtx = document.getElementById('wasteProcessingChart').getContext('2d');
    new Chart(wasteProcessingCtx, {
        type: 'line',
        data: wasteProcessingData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} tons`;
                        }
                    }
                }
            }
        }
    });
}

function initializeInfrastructureMap() {
    // Initialize the infrastructure map (replace with actual map implementation)
    const mapContainer = document.getElementById('infrastructureMap');
    if (mapContainer) {
        // Add map initialization code here
        // This could be Google Maps, Leaflet, or another mapping library
        mapContainer.innerHTML = '<div class="map-placeholder">Infrastructure Map Loading...</div>';
    }
}

function startRealTimeUpdates() {
    // Update stats every 5 seconds
    setInterval(updateStats, 5000);
}

function updateStats() {
    // Simulate stats updates (replace with actual API calls)
    const stats = {
        operational: (98 + Math.random() * 1).toFixed(1),
        alerts: Math.floor(1 + Math.random() * 2),
        maintenance: Math.floor(4 + Math.random() * 2)
    };

    document.querySelector('.stat-value:nth-child(1)').textContent = `${stats.operational}%`;
    document.querySelector('.stat-value:nth-child(2)').textContent = stats.alerts;
    document.querySelector('.stat-value:nth-child(3)').textContent = stats.maintenance;
}

function initializeEventListeners() {
    // Add event listeners for action buttons
    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', handleActionButtonClick);
    });

    // Add event listeners for alert items
    document.querySelectorAll('.alert-item').forEach(item => {
        item.addEventListener('click', handleAlertItemClick);
    });
}

function handleActionButtonClick(event) {
    const button = event.currentTarget;
    const action = button.textContent.toLowerCase();

    switch (action) {
        case 'view details':
            handleAlertDetails(button);
            break;
        case 'schedule':
            handleMaintenanceSchedule(button);
            break;
    }
}

function handleAlertItemClick(event) {
    const alertItem = event.currentTarget;
    const alertTitle = alertItem.querySelector('h4').textContent;
    showAlertDetails(alertTitle);
}

function handleAlertDetails(button) {
    const alertItem = button.closest('.alert-item');
    const alertTitle = alertItem.querySelector('h4').textContent;
    showAlertDetails(alertTitle);
}

function handleMaintenanceSchedule(button) {
    const maintenanceItem = button.closest('.maintenance-item');
    const maintenanceTitle = maintenanceItem.querySelector('h4').textContent;
    showMaintenanceSchedule(maintenanceTitle);
}

function showAlertDetails(alertTitle) {
    showNotification(`Loading details for ${alertTitle}...`, 'info');
    // Implement alert details modal or navigation
}

function showMaintenanceSchedule(maintenanceTitle) {
    showNotification(`Scheduling maintenance for ${maintenanceTitle}...`, 'info');
    // Implement maintenance scheduling modal or navigation
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
        background: #3498db;
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