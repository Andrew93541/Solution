// Sustainable Agriculture Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeFarmPlanning();
    initializeCropManagement();
    initializeSoilHealth();
    initializeWaterManagement();
});

// Sample data (in a real application, this would come from an API)
const agricultureData = {
    crops: [
        {
            id: 1,
            name: "Organic Tomatoes",
            description: "Heirloom tomatoes grown using sustainable methods",
            image: "/images/crops/tomatoes.jpg",
            plantingDate: "2024-03-15",
            harvestDate: "2024-07-15",
            waterNeeds: "Medium",
            soilType: "Loamy",
            status: "Growing"
        },
        {
            id: 2,
            name: "Free-Range Eggs",
            description: "Pasture-raised chicken eggs",
            image: "/images/crops/eggs.jpg",
            startDate: "2024-01-01",
            waterNeeds: "Low",
            soilType: "Not Applicable",
            status: "Active"
        }
    ],
    soilReadings: [
        {
            id: 1,
            date: "2024-03-01",
            pH: 6.5,
            nitrogen: 45,
            phosphorus: 30,
            potassium: 40
        }
    ],
    waterUsage: {
        daily: 150,
        weekly: 1050,
        monthly: 4500,
        efficiency: 85
    }
};

// Initialize Farm Planning
function initializeFarmPlanning() {
    const planningSection = document.querySelector('.planning-section');
    if (!planningSection) return;

    const planningGrid = document.querySelector('.planning-grid');
    if (!planningGrid) return;

    // Create planning cards
    const plans = [
        {
            title: "Crop Rotation",
            icon: "fas fa-sync",
            description: "Plan your crop rotation schedule for optimal soil health",
            action: "Create Rotation Plan"
        },
        {
            title: "Water Management",
            icon: "fas fa-tint",
            description: "Optimize irrigation and water usage patterns",
            action: "Set Water Schedule"
        },
        {
            title: "Soil Health",
            icon: "fas fa-seedling",
            description: "Monitor and improve soil quality metrics",
            action: "View Soil Report"
        }
    ];

    planningGrid.innerHTML = plans.map(plan => `
        <div class="plan-card">
            <h3><i class="${plan.icon}"></i> ${plan.title}</h3>
            <p>${plan.description}</p>
            <button class="action-button" onclick="handlePlanAction('${plan.title}')">
                ${plan.action}
            </button>
        </div>
    `).join('');
}

// Initialize Crop Management
function initializeCropManagement() {
    const cropSection = document.querySelector('.crop-section');
    if (!cropSection) return;

    const cropGrid = document.querySelector('.crop-grid');
    if (!cropGrid) return;

    // Display crops
    cropGrid.innerHTML = agricultureData.crops.map(crop => `
        <div class="crop-card">
            <div class="crop-image" style="background-image: url('${crop.image}')"></div>
            <div class="crop-content">
                <h3>${crop.name}</h3>
                <p>${crop.description}</p>
                <div class="crop-meta">
                    <span><i class="fas fa-tint"></i> ${crop.waterNeeds}</span>
                    <span><i class="fas fa-seedling"></i> ${crop.soilType}</span>
                </div>
                <div class="crop-meta">
                    <span><i class="fas fa-calendar"></i> ${crop.status}</span>
                    <span><i class="fas fa-clock"></i> ${calculateDaysRemaining(crop)} days</span>
                </div>
                <button class="action-button" onclick="viewCropDetails(${crop.id})">
                    View Details
                </button>
            </div>
        </div>
    `).join('');
}

// Initialize Soil Health
function initializeSoilHealth() {
    const soilSection = document.querySelector('.soil-section');
    if (!soilSection) return;

    const soilGrid = document.querySelector('.soil-grid');
    if (!soilGrid) return;

    // Get latest soil reading
    const latestReading = agricultureData.soilReadings[agricultureData.soilReadings.length - 1];

    soilGrid.innerHTML = `
        <div class="soil-card">
            <i class="fas fa-flask"></i>
            <h3>pH Level</h3>
            <p>${latestReading.pH}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(latestReading.pH / 14) * 100}%"></div>
            </div>
        </div>
        <div class="soil-card">
            <i class="fas fa-atom"></i>
            <h3>Nitrogen</h3>
            <p>${latestReading.nitrogen} mg/kg</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(latestReading.nitrogen / 100) * 100}%"></div>
            </div>
        </div>
        <div class="soil-card">
            <i class="fas fa-leaf"></i>
            <h3>Phosphorus</h3>
            <p>${latestReading.phosphorus} mg/kg</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(latestReading.phosphorus / 100) * 100}%"></div>
            </div>
        </div>
        <div class="soil-card">
            <i class="fas fa-seedling"></i>
            <h3>Potassium</h3>
            <p>${latestReading.potassium} mg/kg</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(latestReading.potassium / 100) * 100}%"></div>
            </div>
        </div>
    `;
}

// Initialize Water Management
function initializeWaterManagement() {
    const waterSection = document.querySelector('.water-section');
    if (!waterSection) return;

    const waterChart = document.querySelector('.water-chart');
    if (!waterChart) return;

    // Create water usage chart
    // In a real application, this would use a charting library
    waterChart.innerHTML = `
        <div style="width: 100%; height: 100%; background: #e9ecef; display: flex; align-items: center; justify-content: center;">
            <p style="color: #7f8c8d;">Water usage chart will be displayed here</p>
        </div>
    `;

    // Display water stats
    const waterStats = document.querySelector('.water-stats');
    if (waterStats) {
        waterStats.innerHTML = `
            <div class="water-stat">
                <h3>Daily Usage</h3>
                <p>${agricultureData.waterUsage.daily} L</p>
            </div>
            <div class="water-stat">
                <h3>Weekly Usage</h3>
                <p>${agricultureData.waterUsage.weekly} L</p>
            </div>
            <div class="water-stat">
                <h3>Monthly Usage</h3>
                <p>${agricultureData.waterUsage.monthly} L</p>
            </div>
            <div class="water-stat">
                <h3>Efficiency</h3>
                <p>${agricultureData.waterUsage.efficiency}%</p>
            </div>
        `;
    }
}

// Utility Functions
function calculateDaysRemaining(crop) {
    if (!crop.harvestDate) return 0;
    const harvest = new Date(crop.harvestDate);
    const today = new Date();
    const diffTime = harvest - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function handlePlanAction(planTitle) {
    switch (planTitle) {
        case "Crop Rotation":
            showNotification("Opening crop rotation planner...");
            break;
        case "Water Management":
            showNotification("Opening water management dashboard...");
            break;
        case "Soil Health":
            showNotification("Opening soil health report...");
            break;
    }
}

function viewCropDetails(cropId) {
    const crop = agricultureData.crops.find(c => c.id === cropId);
    if (!crop) return;

    // In a real application, this would open a modal or navigate to a details page
    showNotification(`Viewing details for ${crop.name}`);
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