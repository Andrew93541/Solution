// Urban Planning Tools Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeZoningMap();
    initializeImpactCharts();
    initializeTransportMap();
    initializeSpaceCards();
    initializeFilters();
});

// Sample data (in a real application, this would come from an API)
const urbanData = {
    zones: [
        {
            id: 1,
            name: "Residential",
            color: "#9b59b6",
            maxHeight: 30,
            far: 2.5,
            setback: 5
        },
        {
            id: 2,
            name: "Commercial",
            color: "#3498db",
            maxHeight: 45,
            far: 3.5,
            setback: 3
        },
        {
            id: 3,
            name: "Mixed Use",
            color: "#2ecc71",
            maxHeight: 35,
            far: 3.0,
            setback: 4
        }
    ],
    impactData: {
        environmental: {
            labels: ["Carbon Emissions", "Water Usage", "Energy Consumption", "Waste Generation"],
            values: [75, 60, 85, 45]
        },
        social: {
            labels: ["Affordability", "Accessibility", "Community Space", "Public Services"],
            values: [80, 70, 65, 75]
        }
    },
    publicSpaces: [
        {
            id: 1,
            name: "Central Park",
            description: "Large urban park with recreational facilities",
            features: ["Playground", "Sports Fields", "Walking Trails"],
            image: "/images/spaces/park1.jpg"
        },
        {
            id: 2,
            name: "Community Plaza",
            description: "Public gathering space with seating and events",
            features: ["Seating Area", "Event Space", "Food Vendors"],
            image: "/images/spaces/plaza1.jpg"
        }
    ],
    transportOptions: [
        {
            id: 1,
            name: "Bus Rapid Transit",
            icon: "fas fa-bus",
            coverage: 75,
            frequency: 15,
            ridership: 50000
        },
        {
            id: 2,
            name: "Light Rail",
            icon: "fas fa-train",
            coverage: 60,
            frequency: 10,
            ridership: 75000
        }
    ]
};

// Initialize Zoning Map
function initializeZoningMap() {
    const mapContainer = document.querySelector('.map-container');
    const zoneSelector = document.querySelector('.zone-selector');
    const zoneDetails = document.querySelector('.zone-details');

    // Create zone selector options
    urbanData.zones.forEach(zone => {
        const option = document.createElement('div');
        option.className = 'zone-option';
        option.innerHTML = `
            <div class="zone-color" style="background: ${zone.color}"></div>
            <span>${zone.name}</span>
        `;
        option.addEventListener('click', () => updateZoneDisplay(zone));
        zoneSelector.appendChild(option);
    });

    // In a real application, this would initialize a map library
    console.log('Initializing zoning map...');
}

// Update Zone Display
function updateZoneDisplay(zone) {
    const zoneDetails = document.querySelector('.zone-details');
    const options = document.querySelectorAll('.zone-option');
    
    // Update active state
    options.forEach(opt => opt.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Update zone details
    zoneDetails.innerHTML = `
        <div class="zone-parameter">
            <span>Maximum Height</span>
            <span>${zone.maxHeight}m</span>
        </div>
        <div class="zone-parameter">
            <span>Floor Area Ratio (FAR)</span>
            <span>${zone.far}</span>
        </div>
        <div class="zone-parameter">
            <span>Setback Requirements</span>
            <span>${zone.setback}m</span>
        </div>
    `;
}

// Initialize Impact Charts
function initializeImpactCharts() {
    const envChart = document.querySelector('.chart-container:nth-child(1)').getContext('2d');
    const socialChart = document.querySelector('.chart-container:nth-child(2)').getContext('2d');

    // Environmental Impact Chart
    new Chart(envChart, {
        type: 'bar',
        data: {
            labels: urbanData.impactData.environmental.labels,
            datasets: [{
                data: urbanData.impactData.environmental.values,
                backgroundColor: '#9b59b6',
                borderColor: '#8e44ad',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Environmental Impact'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Social Impact Chart
    new Chart(socialChart, {
        type: 'radar',
        data: {
            labels: urbanData.impactData.social.labels,
            datasets: [{
                data: urbanData.impactData.social.values,
                backgroundColor: 'rgba(155, 89, 182, 0.2)',
                borderColor: '#9b59b6',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Social Impact'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Initialize Transport Map
function initializeTransportMap() {
    const transportMap = document.querySelector('.transport-map');
    const transportOptions = document.querySelector('.transport-options');

    // Create transport option cards
    urbanData.transportOptions.forEach(option => {
        const card = document.createElement('div');
        card.className = 'transport-card';
        card.innerHTML = `
            <div class="transport-icon">
                <i class="${option.icon}"></i>
            </div>
            <h3 class="transport-title">${option.name}</h3>
            <div class="transport-stats">
                <div class="stat-item">
                    <div class="stat-value">${option.coverage}%</div>
                    <div class="stat-label">Coverage</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${option.frequency}</div>
                    <div class="stat-label">Frequency (min)</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${option.ridership}</div>
                    <div class="stat-label">Daily Ridership</div>
                </div>
            </div>
        `;
        transportOptions.appendChild(card);
    });

    // In a real application, this would initialize a map library
    console.log('Initializing transport map...');
}

// Initialize Space Cards
function initializeSpaceCards() {
    const spaceGrid = document.querySelector('.space-grid');
    spaceGrid.innerHTML = '';

    urbanData.publicSpaces.forEach(space => {
        const card = document.createElement('div');
        card.className = 'space-card';
        card.innerHTML = `
            <div class="space-image" style="background-image: url('${space.image}')"></div>
            <div class="space-content">
                <h3 class="space-title">${space.name}</h3>
                <p class="space-description">${space.description}</p>
                <div class="space-features">
                    ${space.features.map(feature => `
                        <span class="feature-badge">${feature}</span>
                    `).join('')}
                </div>
                <button class="action-btn" data-space-id="${space.id}">
                    View Details
                </button>
            </div>
        `;

        card.querySelector('.action-btn').addEventListener('click', () => {
            viewSpaceDetails(space.id);
        });

        spaceGrid.appendChild(card);
    });
}

// View Space Details
function viewSpaceDetails(spaceId) {
    const space = urbanData.publicSpaces.find(s => s.id === spaceId);
    if (space) {
        // In a real application, this would open a modal or navigate to a detail page
        console.log('Viewing space:', space);
    }
}

// Initialize Filters
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            applyFilter(filter);
        });
    });
}

// Apply Filter
function applyFilter(filter) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // In a real application, this would filter the displayed items
    console.log('Applying filter:', filter);
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
        background: #9b59b6;
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

    .zone-color {
        width: 20px;
        height: 20px;
        border-radius: 4px;
    }
`;
document.head.appendChild(style); 