// Recycling Platform JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    initializeSearch();
    initializeCharts();
    initializeRewards();
    startRealTimeUpdates();
});

// Sample data for charts
const materialData = {
    labels: ['Plastic', 'Paper', 'Glass', 'Metal', 'Electronics'],
    datasets: [{
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#f1c40f',
            '#e74c3c',
            '#9b59b6'
        ]
    }]
};

const trendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Recycling Volume (kg)',
        data: [120, 150, 180, 200, 220, 250],
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

const carbonData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Carbon Saved (kg CO2)',
        data: [60, 75, 90, 100, 110, 125],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
        fill: true
    }]
};

const communityData = {
    labels: ['Your Household', 'Neighborhood', 'City Average'],
    datasets: [{
        label: 'Recycling Rate (%)',
        data: [85, 65, 45],
        backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#f1c40f'
        ]
    }]
};

// Sample recycling centers data
const recyclingCenters = [
    {
        id: 1,
        name: 'Green Valley Recycling Center',
        address: '123 Green Street, City',
        types: ['plastic', 'paper', 'glass', 'metal'],
        rating: 4.5,
        distance: '0.8 km',
        hours: 'Mon-Sat, 8:00 AM - 6:00 PM',
        phone: '(555) 123-4567',
        coordinates: { lat: 0, lng: 0 }
    },
    {
        id: 2,
        name: 'EcoTech Recycling',
        address: '456 Eco Avenue, City',
        types: ['electronics', 'metal', 'plastic'],
        rating: 4.2,
        distance: '1.2 km',
        hours: 'Mon-Fri, 9:00 AM - 5:00 PM',
        phone: '(555) 987-6543',
        coordinates: { lat: 0, lng: 0 }
    }
];

let map;
let markers = [];

function initializeMap() {
    // Initialize map (replace with your preferred map service)
    map = new google.maps.Map(document.getElementById('recyclingMap'), {
        center: { lat: 0, lng: 0 },
        zoom: 12,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
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

    // Add markers for recycling centers
    addRecyclingCenterMarkers();
}

function addRecyclingCenterMarkers() {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    // Add new markers
    recyclingCenters.forEach(center => {
        const marker = new google.maps.Marker({
            position: center.coordinates,
            map: map,
            title: center.name,
            icon: {
                url: 'path/to/recycling-marker.png',
                scaledSize: new google.maps.Size(32, 32)
            }
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: createInfoWindowContent(center)
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        markers.push(marker);
    });
}

function createInfoWindowContent(center) {
    return `
        <div class="info-window">
            <h3>${center.name}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${center.address}</p>
            <p><i class="fas fa-clock"></i> ${center.hours}</p>
            <p><i class="fas fa-phone"></i> ${center.phone}</p>
            <div class="center-types">
                ${center.types.map(type => `<span class="type-tag">${type}</span>`).join('')}
            </div>
            <button class="directions-btn" onclick="getDirections(${center.coordinates.lat}, ${center.coordinates.lng})">
                Get Directions
            </button>
        </div>
    `;
}

function initializeSearch() {
    const searchInput = document.getElementById('recyclingSearch');
    const materialSelect = document.getElementById('materialType');
    const distanceSelect = document.getElementById('distance');
    const suggestions = document.getElementById('searchSuggestions');

    // Add input event listener for search
    searchInput.addEventListener('input', debounce(handleSearch, 300));

    // Add change event listeners for filters
    materialSelect.addEventListener('change', filterCenters);
    distanceSelect.addEventListener('change', filterCenters);

    function handleSearch(event) {
        const query = event.target.value.trim();

        if (query.length < 2) {
            suggestions.classList.remove('active');
            return;
        }

        // Simulate search results (replace with actual API call)
        const results = recyclingCenters.filter(center => 
            center.name.toLowerCase().includes(query.toLowerCase()) ||
            center.address.toLowerCase().includes(query.toLowerCase())
        );

        displaySearchResults(results);
    }

    function displaySearchResults(results) {
        suggestions.innerHTML = results.map(center => `
            <div class="suggestion-item" data-id="${center.id}">
                <div class="suggestion-name">${center.name}</div>
                <div class="suggestion-address">${center.address}</div>
                <div class="suggestion-distance">${center.distance}</div>
            </div>
        `).join('');

        suggestions.classList.add('active');

        // Add click handlers to suggestions
        suggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const center = recyclingCenters.find(c => c.id === parseInt(item.dataset.id));
                if (center) {
                    map.setCenter(center.coordinates);
                    map.setZoom(15);
                    searchInput.value = center.name;
                    suggestions.classList.remove('active');
                }
            });
        });
    }

    function filterCenters() {
        const material = materialSelect.value;
        const distance = parseInt(distanceSelect.value);

        const filteredCenters = recyclingCenters.filter(center => {
            const matchesMaterial = material === 'all' || center.types.includes(material);
            const centerDistance = parseFloat(center.distance);
            const matchesDistance = centerDistance <= distance;

            return matchesMaterial && matchesDistance;
        });

        updateCentersList(filteredCenters);
        updateMapMarkers(filteredCenters);
    }
}

function updateCentersList(centers) {
    const centersList = document.getElementById('centersList');
    centersList.innerHTML = centers.map(center => `
        <div class="center-card">
            <div class="center-header">
                <h4>${center.name}</h4>
                <span class="rating">
                    ${createRatingStars(center.rating)}
                </span>
            </div>
            <div class="center-info">
                <p><i class="fas fa-map-marker-alt"></i> ${center.address}</p>
                <p><i class="fas fa-clock"></i> ${center.hours}</p>
                <p><i class="fas fa-phone"></i> ${center.phone}</p>
            </div>
            <div class="center-types">
                ${center.types.map(type => `<span class="type-tag">${type}</span>`).join('')}
            </div>
            <button class="directions-btn" onclick="getDirections(${center.coordinates.lat}, ${center.coordinates.lng})">
                Get Directions
            </button>
        </div>
    `).join('');
}

function createRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

function updateMapMarkers(centers) {
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    centers.forEach(center => {
        const marker = new google.maps.Marker({
            position: center.coordinates,
            map: map,
            title: center.name
        });
        markers.push(marker);
    });
}

function initializeCharts() {
    // Material Distribution Chart
    const materialCtx = document.getElementById('materialChart').getContext('2d');
    new Chart(materialCtx, {
        type: 'doughnut',
        data: materialData,
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
                            return `${context.label}: ${value}kg (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    // Recycling Trends Chart
    const trendsCtx = document.getElementById('trendsChart').getContext('2d');
    new Chart(trendsCtx, {
        type: 'line',
        data: trendsData,
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

    // Carbon Impact Chart
    const carbonCtx = document.getElementById('carbonChart').getContext('2d');
    new Chart(carbonCtx, {
        type: 'line',
        data: carbonData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} kg CO2`;
                        }
                    }
                }
            }
        }
    });

    // Community Impact Chart
    const communityCtx = document.getElementById('communityChart').getContext('2d');
    new Chart(communityCtx, {
        type: 'bar',
        data: communityData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y}%`;
                        }
                    }
                }
            }
        }
    });
}

function initializeRewards() {
    const redeemButtons = document.querySelectorAll('.redeem-btn');
    
    redeemButtons.forEach(button => {
        button.addEventListener('click', () => {
            const rewardItem = button.closest('.reward-item');
            const rewardName = rewardItem.querySelector('h4').textContent;
            const points = parseInt(rewardItem.querySelector('p').textContent);
            
            showRewardConfirmation(rewardName, points);
        });
    });
}

function showRewardConfirmation(rewardName, points) {
    // Create and show confirmation modal
    const modal = document.createElement('div');
    modal.className = 'reward-modal';
    modal.innerHTML = `
        <div class="reward-modal-content">
            <h3>Redeem Reward</h3>
            <p>Are you sure you want to redeem "${rewardName}" for ${points} points?</p>
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
        // Handle reward redemption (replace with actual API call)
        showNotification('Reward redeemed successfully!', 'success');
        modal.remove();
    });
}

function startRealTimeUpdates() {
    // Update stats every 5 seconds
    setInterval(updateStats, 5000);
}

function updateStats() {
    // Simulate real-time updates (replace with actual API calls)
    const stats = {
        totalRecycled: (245.8 + Math.random() * 2).toFixed(1),
        carbonSaved: (1245 + Math.random() * 10).toFixed(1),
        recyclingRate: (85 + Math.random() * 2).toFixed(1),
        communityRank: Math.floor(Math.random() * 5) + 10
    };

    document.getElementById('totalRecycled').textContent = `${stats.totalRecycled} kg`;
    document.getElementById('carbonSaved').textContent = `${stats.carbonSaved} kg CO2`;
    document.getElementById('recyclingRate').textContent = `${stats.recyclingRate}%`;
    document.getElementById('communityRank').textContent = `#${stats.communityRank}`;
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

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to get directions (replace with actual implementation)
function getDirections(lat, lng) {
    // Implement directions functionality
    showNotification('Directions feature coming soon!', 'info');
} 