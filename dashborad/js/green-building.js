// Green Building Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeAssessmentForm();
    initializeEnergyCharts();
    initializeMaterials();
    initializeCertifications();
    initializeCharts();
    startRealTimeUpdates();
});

// Sample data (in a real application, this would come from an API)
const buildingData = {
    assessment: {
        buildingType: "Commercial",
        size: 5000,
        location: "Urban",
        yearBuilt: 2020
    },
    energyData: {
        consumption: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            values: [1200, 1100, 900, 800, 700, 600]
        },
        efficiency: {
            labels: ["Heating", "Cooling", "Lighting", "Equipment", "Other"],
            values: [35, 25, 20, 15, 5]
        }
    },
    materials: [
        {
            id: 1,
            name: "Recycled Steel",
            description: "High-strength steel with 80% recycled content",
            attributes: ["Recycled", "Durable", "Energy Efficient"],
            image: "/images/materials/steel.jpg"
        },
        {
            id: 2,
            name: "Bamboo Flooring",
            description: "Sustainable bamboo with FSC certification",
            attributes: ["Renewable", "Low VOC", "Biodegradable"],
            image: "/images/materials/bamboo.jpg"
        }
    ],
    certifications: [
        {
            id: 1,
            name: "LEED Gold",
            icon: "fas fa-leaf",
            progress: 75,
            requirements: ["Energy Efficiency", "Water Conservation", "Materials"]
        },
        {
            id: 2,
            name: "BREEAM Excellent",
            icon: "fas fa-star",
            progress: 60,
            requirements: ["Energy", "Water", "Materials", "Waste"]
        }
    ]
};

// Initialize Assessment Form
function initializeAssessmentForm() {
    const form = document.querySelector('.assessment-form');
    if (!form) return;

    // Populate form with existing data
    Object.keys(buildingData.assessment).forEach(key => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = buildingData.assessment[key];
        }
    });

    // Add form submission handler
    form.addEventListener('submit', handleAssessmentSubmit);
}

// Handle Assessment Form Submission
function handleAssessmentSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // In a real application, this would send data to an API
    console.log('Assessment data:', data);
    showNotification('Assessment submitted successfully');
}

// Initialize Energy Charts
function initializeEnergyCharts() {
    const consumptionChart = document.querySelector('.chart-container:nth-child(1)').getContext('2d');
    const efficiencyChart = document.querySelector('.chart-container:nth-child(2)').getContext('2d');

    // Energy Consumption Chart
    new Chart(consumptionChart, {
        type: 'line',
        data: {
            labels: buildingData.energyData.consumption.labels,
            datasets: [{
                label: 'Energy Consumption (kWh)',
                data: buildingData.energyData.consumption.values,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Energy Consumption'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Energy Efficiency Chart
    new Chart(efficiencyChart, {
        type: 'doughnut',
        data: {
            labels: buildingData.energyData.efficiency.labels,
            datasets: [{
                data: buildingData.energyData.efficiency.values,
                backgroundColor: [
                    '#2ecc71',
                    '#27ae60',
                    '#1abc9c',
                    '#16a085',
                    '#3498db'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Energy Usage Distribution'
                }
            }
        }
    });
}

// Initialize Materials
function initializeMaterials() {
    const materialsGrid = document.querySelector('.materials-grid');
    if (!materialsGrid) return;

    materialsGrid.innerHTML = '';

    buildingData.materials.forEach(material => {
        const card = document.createElement('div');
        card.className = 'material-card';
        card.innerHTML = `
            <div class="material-image" style="background-image: url('${material.image}')"></div>
            <div class="material-content">
                <h3 class="material-title">${material.name}</h3>
                <p class="material-description">${material.description}</p>
                <div class="material-attributes">
                    ${material.attributes.map(attr => `
                        <span class="attribute-badge">${attr}</span>
                    `).join('')}
                </div>
                <button class="action-btn" data-material-id="${material.id}">
                    View Details
                </button>
            </div>
        `;

        card.querySelector('.action-btn').addEventListener('click', () => {
            viewMaterialDetails(material.id);
        });

        materialsGrid.appendChild(card);
    });
}

// View Material Details
function viewMaterialDetails(materialId) {
    const material = buildingData.materials.find(m => m.id === materialId);
    if (material) {
        // In a real application, this would open a modal or navigate to a detail page
        console.log('Viewing material:', material);
    }
}

// Initialize Certifications
function initializeCertifications() {
    const certificationsGrid = document.querySelector('.certifications-grid');
    if (!certificationsGrid) return;

    certificationsGrid.innerHTML = '';

    buildingData.certifications.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'certification-card';
        card.innerHTML = `
            <div class="certification-icon">
                <i class="${cert.icon}"></i>
            </div>
            <h3 class="certification-title">${cert.name}</h3>
            <div class="certification-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${cert.progress}%"></div>
                </div>
                <div class="progress-text">${cert.progress}% Complete</div>
            </div>
            <div class="certification-requirements">
                ${cert.requirements.map(req => `
                    <div class="requirement-item">${req}</div>
                `).join('')}
            </div>
        `;

        certificationsGrid.appendChild(card);
    });
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

    .requirement-item {
        font-size: 0.9rem;
        color: #7f8c8d;
        margin-top: 0.5rem;
    }
`;
document.head.appendChild(style);

// Green Building JavaScript

// Sample data for charts
const energyConsumptionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Energy Consumption (kWh)',
        data: [2500, 2200, 1800, 1500, 1200, 1000],
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

const energySourcesData = {
    labels: ['Solar', 'Wind', 'Grid', 'Other'],
    datasets: [{
        data: [40, 25, 30, 5],
        backgroundColor: [
            '#f1c40f',
            '#3498db',
            '#e74c3c',
            '#95a5a6'
        ]
    }]
};

const peakUsageData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [{
        label: 'Energy Usage (kW)',
        data: [2, 1.5, 4, 6, 5, 3],
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

const costSavingsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Cost Savings ($)',
        data: [500, 800, 1200, 1500, 1800, 2000],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

const waterUsageData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Water Usage (m³)',
        data: [120, 110, 100, 90, 85, 80],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

const waterSourcesData = {
    labels: ['Municipal', 'Rainwater', 'Recycled', 'Other'],
    datasets: [{
        data: [60, 20, 15, 5],
        backgroundColor: [
            '#3498db',
            '#2ecc71',
            '#f1c40f',
            '#95a5a6'
        ]
    }]
};

const conservationImpactData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Water Saved (m³)',
        data: [20, 25, 30, 35, 40, 45],
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

function initializeCharts() {
    // Energy Consumption Chart
    const energyConsumptionCtx = document.getElementById('energyConsumptionChart').getContext('2d');
    new Chart(energyConsumptionCtx, {
        type: 'line',
        data: energyConsumptionData,
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

    // Energy Sources Chart
    const energySourcesCtx = document.getElementById('energySourcesChart').getContext('2d');
    new Chart(energySourcesCtx, {
        type: 'doughnut',
        data: energySourcesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${percentage}%`;
                        }
                    }
                }
            }
        }
    });

    // Peak Usage Chart
    const peakUsageCtx = document.getElementById('peakUsageChart').getContext('2d');
    new Chart(peakUsageCtx, {
        type: 'line',
        data: peakUsageData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} kW`;
                        }
                    }
                }
            }
        }
    });

    // Cost Savings Chart
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
                            return `$${context.parsed.y}`;
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
                            return `${context.parsed.y} m³`;
                        }
                    }
                }
            }
        }
    });

    // Water Sources Chart
    const waterSourcesCtx = document.getElementById('waterSourcesChart').getContext('2d');
    new Chart(waterSourcesCtx, {
        type: 'doughnut',
        data: waterSourcesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${percentage}%`;
                        }
                    }
                }
            }
        }
    });

    // Conservation Impact Chart
    const conservationImpactCtx = document.getElementById('conservationImpactChart').getContext('2d');
    new Chart(conservationImpactCtx, {
        type: 'line',
        data: conservationImpactData,
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
}

function startRealTimeUpdates() {
    // Update metrics every 5 seconds
    setInterval(updateMetrics, 5000);
}

function updateMetrics() {
    // Simulate real-time updates (replace with actual API calls)
    const metrics = {
        carbonFootprint: (245.8 + Math.random() * 2).toFixed(1),
        renewableEnergy: (65 + Math.random() * 2).toFixed(1),
        wasteDiversion: (85 + Math.random() * 2).toFixed(1),
        greenSpace: (30 + Math.random() * 2).toFixed(1)
    };

    document.querySelector('.metric-value:nth-child(1)').textContent = `${metrics.carbonFootprint} tCO2e`;
    document.querySelector('.metric-value:nth-child(2)').textContent = `${metrics.renewableEnergy}%`;
    document.querySelector('.metric-value:nth-child(3)').textContent = `${metrics.wasteDiversion}%`;
    document.querySelector('.metric-value:nth-child(4)').textContent = `${metrics.greenSpace}%`;
}

// Add event listeners for recommendation implementation
document.querySelectorAll('.recommendation-item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h4').textContent;
        showImplementationModal(title);
    });
});

function showImplementationModal(title) {
    const modal = document.createElement('div');
    modal.className = 'implementation-modal';
    modal.innerHTML = `
        <div class="implementation-modal-content">
            <h3>Implement ${title}</h3>
            <p>Would you like to proceed with implementing this recommendation?</p>
            <div class="modal-buttons">
                <button class="cancel-btn">Cancel</button>
                <button class="confirm-btn">Confirm</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.remove();
    });

    modal.querySelector('.confirm-btn').addEventListener('click', () => {
        // Handle implementation (replace with actual API call)
        showNotification('Recommendation implementation started!', 'success');
        modal.remove();
    });
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