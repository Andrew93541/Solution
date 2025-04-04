document.addEventListener('DOMContentLoaded', function() {
    initializeCalculator();
    initializeChart();
});

function initializeCalculator() {
    const form = document.getElementById('carbonForm');
    form.addEventListener('submit', handleFormSubmit);
}

function initializeChart() {
    const ctx = document.getElementById('impactChart').getContext('2d');
    window.impactChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Energy', 'Transportation', 'Waste'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#e74c3c'
                ]
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
}

function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form values
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const gas = parseFloat(document.getElementById('gas').value) || 0;
    const carMiles = parseFloat(document.getElementById('carMiles').value) || 0;
    const publicTransport = parseFloat(document.getElementById('publicTransport').value) || 0;
    const waste = parseFloat(document.getElementById('waste').value) || 0;
    const recycling = parseFloat(document.getElementById('recycling').value) || 0;

    // Calculate carbon footprint
    const energyFootprint = calculateEnergyFootprint(electricity, gas);
    const transportFootprint = calculateTransportFootprint(carMiles, publicTransport);
    const wasteFootprint = calculateWasteFootprint(waste, recycling);

    const totalFootprint = energyFootprint + transportFootprint + wasteFootprint;

    // Update results
    updateResults(totalFootprint, energyFootprint, transportFootprint, wasteFootprint);
    
    // Generate recommendations
    generateRecommendations(totalFootprint, energyFootprint, transportFootprint, wasteFootprint);
}

function calculateEnergyFootprint(electricity, gas) {
    // Average CO2 emissions per kWh for electricity and gas
    const electricityFactor = 0.5; // kg CO2 per kWh
    const gasFactor = 2.1; // kg CO2 per kWh

    return (electricity * electricityFactor) + (gas * gasFactor);
}

function calculateTransportFootprint(carMiles, publicTransport) {
    // Average CO2 emissions per mile for car and public transport
    const carFactor = 0.4; // kg CO2 per mile
    const publicTransportFactor = 0.1; // kg CO2 per trip

    return (carMiles * carFactor) + (publicTransport * publicTransportFactor);
}

function calculateWasteFootprint(waste, recycling) {
    // Average CO2 emissions per kg for waste and recycling
    const wasteFactor = 2.5; // kg CO2 per kg of waste
    const recyclingFactor = 0.5; // kg CO2 per kg of recycling

    return (waste * wasteFactor) - (recycling * recyclingFactor);
}

function updateResults(total, energy, transport, waste) {
    // Update total impact
    const impactValue = document.querySelector('.impact-value');
    impactValue.textContent = `${total.toFixed(1)} kg CO2`;

    // Update chart
    window.impactChart.data.datasets[0].data = [energy, transport, waste];
    window.impactChart.update();
}

function generateRecommendations(total, energy, transport, waste) {
    const recommendations = [];
    
    // Energy recommendations
    if (energy > 1000) {
        recommendations.push({
            icon: 'fa-bolt',
            title: 'Switch to LED Bulbs',
            description: 'Replace traditional bulbs with LED bulbs to save up to 80% on energy costs.',
            savings: 'Save 200 kg CO2/year'
        });
    }

    // Transportation recommendations
    if (transport > 500) {
        recommendations.push({
            icon: 'fa-bicycle',
            title: 'Use Public Transport',
            description: 'Consider using public transport or carpooling to reduce emissions.',
            savings: 'Save 300 kg CO2/year'
        });
    }

    // Waste recommendations
    if (waste > 200) {
        recommendations.push({
            icon: 'fa-recycle',
            title: 'Increase Recycling',
            description: 'Improve your recycling habits to reduce waste-related emissions.',
            savings: 'Save 150 kg CO2/year'
        });
    }

    // Display recommendations
    const recommendationsList = document.querySelector('.recommendations-list');
    recommendationsList.innerHTML = recommendations.map(rec => `
        <div class="recommendation-item">
            <div class="recommendation-icon">
                <i class="fas ${rec.icon}"></i>
            </div>
            <div class="recommendation-content">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
                <span class="savings">${rec.savings}</span>
            </div>
        </div>
    `).join('');
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

// Add notification styles
const style = document.createElement('style');
style.textContent = `
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