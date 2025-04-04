// Urban Mobility Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    initializeTransportButtons();
    initializeRoutePlanner();
    initializeMap();
    initializeLocationSearch();
    initializeTripHistory();
    startRealTimeUpdates();
});

// Sample data for charts
const transportMixData = {
    labels: ['Cycling', 'Walking', 'Public Transit', 'Car'],
    datasets: [{
        data: [40, 25, 20, 15],
        backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#f1c40f',
            '#e74c3c'
        ]
    }]
};

const carbonImpactData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: 'Carbon Saved (kg)',
        data: [0.8, 1.2, 0.9, 1.5, 1.1, 0.7, 0.6],
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

const distanceData = {
    labels: ['Cycling', 'Walking', 'Public Transit'],
    datasets: [{
        label: 'Distance (km)',
        data: [45.2, 12.8, 28.5],
        backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#f1c40f'
        ]
    }]
};

// New chart data
const costSavingsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Cost Savings ($)',
        data: [120, 150, 180, 200, 220, 250],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

const peakUsageData = {
    labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
    datasets: [{
        label: 'Usage Count',
        data: [150, 450, 200, 300, 400, 100],
        backgroundColor: '#2ecc71'
    }]
};

const weatherImpactData = {
    labels: ['Sunny', 'Cloudy', 'Rainy', 'Snowy'],
    datasets: [{
        label: 'Average Distance (km)',
        data: [5.2, 4.8, 3.5, 2.1],
        backgroundColor: [
            '#f1c40f',
            '#bdc3c7',
            '#3498db',
            '#ecf0f1'
        ]
    }]
};

// Sample trip history data
const tripHistoryData = [
    {
        id: 1,
        date: '2024-03-15',
        mode: 'bike',
        route: 'Home → Work',
        distance: '5.2 km',
        duration: '25 mins',
        carbonSaved: '0.8 kg'
    },
    {
        id: 2,
        date: '2024-03-14',
        mode: 'transit',
        route: 'Work → Shopping',
        distance: '3.8 km',
        duration: '20 mins',
        carbonSaved: '0.5 kg'
    },
    {
        id: 3,
        date: '2024-03-13',
        mode: 'walk',
        route: 'Home → Park',
        distance: '1.2 km',
        duration: '15 mins',
        carbonSaved: '0.2 kg'
    }
];

let map;
let markers = [];
let routePolyline;

function initializeMap() {
    // Initialize map (replace with your preferred map service)
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 12,
        styles: [
            {
                featureType: 'transit',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
            }
        ]
    });

    // Initialize map controls
    document.getElementById('zoomIn').addEventListener('click', () => {
        map.setZoom(map.getZoom() + 1);
    });

    document.getElementById('zoomOut').addEventListener('click', () => {
        map.setZoom(map.getZoom() - 1);
    });

    document.getElementById('resetMap').addEventListener('click', () => {
        map.setZoom(12);
        map.setCenter({ lat: 0, lng: 0 });
    });
}

function initializeLocationSearch() {
    const startInput = document.getElementById('startLocation');
    const endInput = document.getElementById('endLocation');
    const startSuggestions = document.getElementById('startSuggestions');
    const endSuggestions = document.getElementById('endSuggestions');

    // Add input event listeners for location search
    startInput.addEventListener('input', debounce(handleLocationSearch, 300));
    endInput.addEventListener('input', debounce(handleLocationSearch, 300));

    function handleLocationSearch(event) {
        const input = event.target;
        const suggestions = input.id === 'startLocation' ? startSuggestions : endSuggestions;
        const query = input.value.trim();

        if (query.length < 2) {
            suggestions.classList.remove('active');
            return;
        }

        // Simulate location search (replace with actual API call)
        const mockResults = [
            { name: 'Central Station', lat: 0, lng: 0 },
            { name: 'City Park', lat: 0, lng: 0 },
            { name: 'Shopping Mall', lat: 0, lng: 0 }
        ];

        displaySuggestions(suggestions, mockResults);
    }

    function displaySuggestions(container, results) {
        container.innerHTML = results.map(result => `
            <div class="suggestion-item" data-lat="${result.lat}" data-lng="${result.lng}">
                ${result.name}
            </div>
        `).join('');

        container.classList.add('active');

        // Add click handlers to suggestions
        container.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const input = container.id === 'startSuggestions' ? startInput : endInput;
                input.value = item.textContent;
                container.classList.remove('active');
                updateMap();
            });
        });
    }
}

function initializeCharts() {
    // Transport Mix Chart
    const transportMixCtx = document.getElementById('transportMixChart').getContext('2d');
    new Chart(transportMixCtx, {
        type: 'doughnut',
        data: transportMixData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${value}% (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });

    // Carbon Impact Chart
    const carbonImpactCtx = document.getElementById('carbonImpactChart').getContext('2d');
    new Chart(carbonImpactCtx, {
        type: 'line',
        data: carbonImpactData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)} kg`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'kg CO2'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Distance Chart
    const distanceCtx = document.getElementById('distanceChart').getContext('2d');
    new Chart(distanceCtx, {
        type: 'bar',
        data: distanceData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)} km`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'km'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Initialize new charts
    const costSavingsCtx = document.getElementById('costSavingsChart').getContext('2d');
    new Chart(costSavingsCtx, {
        type: 'line',
        data: costSavingsData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed.y.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });

    const peakUsageCtx = document.getElementById('peakUsageChart').getContext('2d');
    new Chart(peakUsageCtx, {
        type: 'bar',
        data: peakUsageData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' }
            }
        }
    });

    const weatherImpactCtx = document.getElementById('weatherImpactChart').getContext('2d');
    new Chart(weatherImpactCtx, {
        type: 'bar',
        data: weatherImpactData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y.toFixed(1)} km`;
                        }
                    }
                }
            }
        }
    });
}

function initializeTransportButtons() {
    const transportButtons = document.querySelectorAll('.transport-btn');
    
    transportButtons.forEach(button => {
        button.addEventListener('click', () => {
            transportButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

function initializeRoutePlanner() {
    const planRouteBtn = document.querySelector('.plan-route-btn');
    const startInput = document.getElementById('startLocation');
    const endInput = document.getElementById('endLocation');
    
    planRouteBtn.addEventListener('click', () => {
        const start = startInput.value.trim();
        const end = endInput.value.trim();
        
        if (!start || !end) {
            showNotification('Please enter both start and end locations', 'error');
            return;
        }

        // Get selected transport mode
        const activeMode = document.querySelector('.transport-btn.active').dataset.mode;
        
        // Simulate route planning
        showNotification('Planning your route...', 'info');
        
        setTimeout(() => {
            // Update map placeholder with route
            const mapPlaceholder = document.querySelector('.map-placeholder');
            mapPlaceholder.innerHTML = `
                <div class="route-details">
                    <h3>Route Details</h3>
                    <div class="route-info">
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <span>Duration: 25 mins</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-route"></i>
                            <span>Distance: 3.2 km</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-leaf"></i>
                            <span>Carbon Saved: 0.8 kg</span>
                        </div>
                    </div>
                </div>
            `;
            
            showNotification('Route planned successfully!', 'success');
        }, 1500);
    });
}

function startRealTimeUpdates() {
    // Simulate real-time updates every 5 seconds
    setInterval(() => {
        updateRealTimeData();
    }, 5000);
}

function updateRealTimeData() {
    // Update stats with random fluctuations
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach(stat => {
        const currentValue = parseFloat(stat.textContent);
        const fluctuation = (Math.random() - 0.5) * 0.2; // Random value between -0.1 and 0.1
        const newValue = Math.max(0, currentValue + fluctuation);
        stat.textContent = newValue.toFixed(1);
    });

    // Update trends
    updateTrends();
}

function updateTrends() {
    const trends = document.querySelectorAll('.stat-trend');
    trends.forEach(trend => {
        const isPositive = Math.random() > 0.5;
        const percentage = (Math.random() * 10).toFixed(1);
        
        trend.className = `stat-trend ${isPositive ? 'positive' : 'negative'}`;
        trend.innerHTML = `
            <i class="fas fa-arrow-${isPositive ? 'up' : 'down'}"></i>
            <span>${percentage}% this week</span>
        `;
    });
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