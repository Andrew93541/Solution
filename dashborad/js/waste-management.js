// Waste Management Page JavaScript

// Initialize Chart.js for waste composition
document.addEventListener('DOMContentLoaded', function() {
    // Waste Composition Chart
    const wasteCompositionCtx = document.getElementById('wasteCompositionChart').getContext('2d');
    new Chart(wasteCompositionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Organic', 'Recyclable', 'Non-Recyclable', 'Hazardous'],
            datasets: [{
                data: [40, 35, 20, 5],
                backgroundColor: [
                    '#2ecc71',  // Organic - Green
                    '#3498db',  // Recyclable - Blue
                    '#e74c3c',  // Non-Recyclable - Red
                    '#f1c40f'   // Hazardous - Yellow
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Initialize Composting Map
    initializeCompostMap();

    // Add event listeners for optimization buttons
    initializeOptimizationButtons();

    // Add event listeners for strategy implementation buttons
    initializeStrategyButtons();

    // Add event listeners for report download buttons
    initializeReportButtons();
});

// Initialize the composting locations map
function initializeCompostMap() {
    // This would typically use a mapping library like Leaflet or Google Maps
    // For now, we'll just log that the map should be initialized
    console.log('Initializing composting locations map');
}

// Handle optimization button clicks
function initializeOptimizationButtons() {
    const optimizeButtons = document.querySelectorAll('.optimize-btn');
    optimizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optimizationType = this.closest('.optimization-item').querySelector('h4').textContent;
            handleOptimization(optimizationType);
        });
    });
}

// Handle strategy implementation button clicks
function initializeStrategyButtons() {
    const implementButtons = document.querySelectorAll('.implement-btn');
    implementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const strategyType = this.closest('.strategy-card').querySelector('h4').textContent;
            handleStrategyImplementation(strategyType);
        });
    });
}

// Handle report download button clicks
function initializeReportButtons() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reportType = this.closest('.report-card').querySelector('h3').textContent;
            handleReportDownload(reportType);
        });
    });
}

// Handle optimization requests
function handleOptimization(optimizationType) {
    // Show loading state
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Optimizing...';
    button.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Update efficiency rate
        const rateElement = button.closest('.optimization-item').querySelector('.rate');
        const currentRate = parseInt(rateElement.textContent);
        const newRate = Math.min(currentRate + 5, 100);
        rateElement.textContent = `${newRate}%`;

        // Reset button state
        button.textContent = originalText;
        button.disabled = false;

        // Show success message
        showNotification(`${optimizationType} optimization completed successfully!`);
    }, 2000);
}

// Handle strategy implementation
function handleStrategyImplementation(strategyType) {
    // Show loading state
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Implementing...';
    button.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Update impact amount
        const amountElement = button.closest('.strategy-card').querySelector('.amount');
        const currentAmount = parseInt(amountElement.textContent);
        const newAmount = Math.min(currentAmount + 5, 100);
        amountElement.textContent = `${newAmount}%`;

        // Reset button state
        button.textContent = originalText;
        button.disabled = false;

        // Show success message
        showNotification(`${strategyType} strategy implemented successfully!`);
    }, 2000);
}

// Handle report downloads
function handleReportDownload(reportType) {
    // Show loading state
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Downloading...';
    button.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button state
        button.textContent = originalText;
        button.disabled = false;

        // Show success message
        showNotification(`${reportType} report downloaded successfully!`);
    }, 2000);
}

// Show notification message
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Add notification to page
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
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