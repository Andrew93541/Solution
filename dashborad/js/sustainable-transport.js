// Sustainable Transportation Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeRoutePlanning();
    initializeMap();
    initializeRouteDetails();
    initializeCarbonSavings();
});

// Sample data (in a real application, this would come from an API)
const transportData = {
    transportOptions: [
        {
            id: 'bike',
            name: 'Bicycle',
            icon: 'fas fa-bicycle',
            carbonPerKm: 0,
            caloriesPerKm: 30,
            avgSpeed: 15
        },
        {
            id: 'walk',
            name: 'Walking',
            icon: 'fas fa-walking',
            carbonPerKm: 0,
            caloriesPerKm: 60,
            avgSpeed: 5
        },
        {
            id: 'bus',
            name: 'Public Bus',
            icon: 'fas fa-bus',
            carbonPerKm: 0.1,
            caloriesPerKm: 0,
            avgSpeed: 30
        },
        {
            id: 'train',
            name: 'Train',
            icon: 'fas fa-train',
            carbonPerKm: 0.05,
            caloriesPerKm: 0,
            avgSpeed: 60
        },
        {
            id: 'car',
            name: 'Car',
            icon: 'fas fa-car',
            carbonPerKm: 0.2,
            caloriesPerKm: 0,
            avgSpeed: 40
        }
    ],
    savedRoutes: []
};

// Initialize Route Planning
function initializeRoutePlanning() {
    const routeForm = document.querySelector('.route-form');
    if (!routeForm) return;

    // Create transport options
    const optionsContainer = document.querySelector('.route-options');
    if (optionsContainer) {
        transportData.transportOptions.forEach(option => {
            const optionElement = createTransportOption(option);
            optionsContainer.appendChild(optionElement);
        });
    }

    // Handle form submission
    routeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const routeData = {
            from: formData.get('from'),
            to: formData.get('to'),
            date: formData.get('date'),
            time: formData.get('time'),
            selectedTransport: document.querySelector('.transport-option.selected')?.dataset.id
        };

        if (routeData.selectedTransport) {
            calculateRoute(routeData);
        } else {
            showNotification('Please select a transport option');
        }
    });
}

// Create Transport Option
function createTransportOption(option) {
    const div = document.createElement('div');
    div.className = 'transport-option';
    div.dataset.id = option.id;
    div.innerHTML = `
        <i class="${option.icon}"></i>
        <span>${option.name}</span>
    `;

    div.addEventListener('click', () => {
        document.querySelectorAll('.transport-option').forEach(opt => 
            opt.classList.remove('selected'));
        div.classList.add('selected');
    });

    return div;
}

// Initialize Map
function initializeMap() {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;

    // In a real application, this would initialize a map service (e.g., Google Maps, Mapbox)
    // For now, we'll just create a placeholder
    mapContainer.innerHTML = `
        <div style="width: 100%; height: 100%; background: #e9ecef; display: flex; align-items: center; justify-content: center;">
            <p style="color: #7f8c8d;">Map will be displayed here</p>
        </div>
    `;
}

// Initialize Route Details
function initializeRouteDetails() {
    const detailsSection = document.querySelector('.route-details');
    if (!detailsSection) return;

    // Load saved routes
    const savedRoutes = JSON.parse(localStorage.getItem('savedRoutes') || '[]');
    transportData.savedRoutes = savedRoutes;

    // Display saved routes if any
    if (savedRoutes.length > 0) {
        displaySavedRoutes(savedRoutes);
    }
}

// Calculate Route
function calculateRoute(routeData) {
    // In a real application, this would use a routing API
    // For now, we'll simulate route calculation
    const transport = transportData.transportOptions.find(
        opt => opt.id === routeData.selectedTransport
    );

    const route = {
        ...routeData,
        distance: calculateDistance(routeData.from, routeData.to),
        duration: calculateDuration(routeData.from, routeData.to, transport.avgSpeed),
        carbon: calculateCarbon(routeData.from, routeData.to, transport.carbonPerKm),
        calories: calculateCalories(routeData.from, routeData.to, transport.caloriesPerKm)
    };

    displayRouteDetails(route);
    updateMap(route);
}

// Display Route Details
function displayRouteDetails(route) {
    const detailsGrid = document.querySelector('.details-grid');
    if (!detailsGrid) return;

    detailsGrid.innerHTML = `
        <div class="detail-card">
            <i class="fas fa-route"></i>
            <h3>Distance</h3>
            <p>${route.distance.toFixed(1)} km</p>
        </div>
        <div class="detail-card">
            <i class="fas fa-clock"></i>
            <h3>Duration</h3>
            <p>${route.duration} min</p>
        </div>
        <div class="detail-card">
            <i class="fas fa-leaf"></i>
            <h3>Carbon Saved</h3>
            <p>${route.carbon.toFixed(1)} kg</p>
        </div>
        <div class="detail-card">
            <i class="fas fa-fire"></i>
            <h3>Calories</h3>
            <p>${route.calories.toFixed(0)} kcal</p>
        </div>
    `;

    // Add save route button
    const saveButton = document.createElement('button');
    saveButton.className = 'action-button';
    saveButton.textContent = 'Save Route';
    saveButton.addEventListener('click', () => saveRoute(route));
    detailsGrid.appendChild(saveButton);
}

// Update Map
function updateMap(route) {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;

    // In a real application, this would update the map with the route
    mapContainer.innerHTML = `
        <div style="width: 100%; height: 100%; background: #e9ecef; display: flex; align-items: center; justify-content: center;">
            <p style="color: #7f8c8d;">Route from ${route.from} to ${route.to}</p>
        </div>
    `;
}

// Initialize Carbon Savings
function initializeCarbonSavings() {
    const savingsSection = document.querySelector('.savings-section');
    if (!savingsSection) return;

    // Create chart
    const chartContainer = document.querySelector('.savings-chart');
    if (chartContainer) {
        createSavingsChart(chartContainer);
    }

    // Display savings stats
    displaySavingsStats();
}

// Create Savings Chart
function createSavingsChart(container) {
    // In a real application, this would use a charting library
    // For now, we'll create a simple visualization
    const ctx = document.createElement('canvas');
    container.appendChild(ctx);

    // Sample data
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [10, 15, 8, 20, 12, 18]
    };

    // In a real application, this would create a proper chart
    container.innerHTML = `
        <div style="width: 100%; height: 100%; background: #e9ecef; display: flex; align-items: center; justify-content: center;">
            <p style="color: #7f8c8d;">Carbon savings chart will be displayed here</p>
        </div>
    `;
}

// Display Savings Stats
function displaySavingsStats() {
    const statsContainer = document.querySelector('.savings-stats');
    if (!statsContainer) return;

    const totalSaved = transportData.savedRoutes.reduce((sum, route) => sum + route.carbon, 0);
    const totalCalories = transportData.savedRoutes.reduce((sum, route) => sum + route.calories, 0);

    statsContainer.innerHTML = `
        <div class="stat-card">
            <h3>Total Carbon Saved</h3>
            <p>${totalSaved.toFixed(1)} kg</p>
        </div>
        <div class="stat-card">
            <h3>Total Calories Burned</h3>
            <p>${totalCalories.toFixed(0)} kcal</p>
        </div>
        <div class="stat-card">
            <h3>Saved Routes</h3>
            <p>${transportData.savedRoutes.length}</p>
        </div>
    `;
}

// Utility Functions
function calculateDistance(from, to) {
    // In a real application, this would use a geocoding service
    return Math.random() * 10 + 1; // Simulated distance
}

function calculateDuration(from, to, speed) {
    const distance = calculateDistance(from, to);
    return Math.round((distance / speed) * 60); // Duration in minutes
}

function calculateCarbon(from, to, carbonPerKm) {
    const distance = calculateDistance(from, to);
    return distance * carbonPerKm;
}

function calculateCalories(from, to, caloriesPerKm) {
    const distance = calculateDistance(from, to);
    return distance * caloriesPerKm;
}

function saveRoute(route) {
    transportData.savedRoutes.push(route);
    localStorage.setItem('savedRoutes', JSON.stringify(transportData.savedRoutes));
    displaySavingsStats();
    showNotification('Route saved successfully');
}

function displaySavedRoutes(routes) {
    const container = document.createElement('div');
    container.className = 'saved-routes';
    container.innerHTML = `
        <h3>Saved Routes</h3>
        <div class="routes-list">
            ${routes.map(route => `
                <div class="route-item">
                    <div class="route-info">
                        <strong>${route.from} → ${route.to}</strong>
                        <span>${route.distance.toFixed(1)} km</span>
                    </div>
                    <button class="action-button" onclick="loadRoute(${JSON.stringify(route)})">
                        Load
                    </button>
                </div>
            `).join('')}
        </div>
    `;

    const detailsSection = document.querySelector('.route-details');
    if (detailsSection) {
        detailsSection.appendChild(container);
    }
}

function loadRoute(route) {
    // Load route data into form
    const form = document.querySelector('.route-form');
    if (form) {
        form.querySelector('[name="from"]').value = route.from;
        form.querySelector('[name="to"]').value = route.to;
        form.querySelector('[name="date"]').value = route.date;
        form.querySelector('[name="time"]').value = route.time;
        
        // Select transport option
        const transportOption = document.querySelector(`.transport-option[data-id="${route.selectedTransport}"]`);
        if (transportOption) {
            transportOption.click();
        }
    }

    // Calculate and display route
    calculateRoute(route);
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
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
        background: #27ae60;
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

    .saved-routes {
        margin-top: 2rem;
    }

    .routes-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .route-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 5px;
    }

    .route-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .route-info strong {
        color: #2c3e50;
    }

    .route-info span {
        color: #7f8c8d;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style); 