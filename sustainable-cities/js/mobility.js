document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map
    initMap();
    
    // Initialize filters
    initFilters();
    
    // Initialize mobility cards
    initMobilityCards();
    
    // Initialize stats counter
    initStatsCounter();
    
    // Initialize WebSocket
    initWebSocket();
    
    // Start periodic updates for stats
    setInterval(updateStats, 30000); // Update every 30 seconds
});

// API Configuration
const API_CONFIG = {
    baseUrl: 'https://api.ecocities.com/v1', // Replace with your actual API endpoint
    endpoints: {
        mobility: '/mobility',
        reservations: '/reservations',
        notifications: '/notifications'
    }
};

// Sample mobility data with more locations
const mobilityData = {
    bikes: [
        {
            id: 'bike1',
            type: 'bike',
            name: 'City Bikes',
            location: 'Central Station',
            coordinates: { lat: 51.5074, lng: -0.1278 },
            available: 15,
            parking: 8,
            status: 'available',
            pricePerHour: 5,
            features: ['basket', 'lights', 'bell']
        },
        {
            id: 'bike2',
            type: 'bike',
            name: 'Park Bikes',
            location: 'Hyde Park',
            coordinates: { lat: 51.5073, lng: -0.1657 },
            available: 20,
            parking: 12,
            status: 'available',
            pricePerHour: 5,
            features: ['basket', 'lights', 'bell', 'child-seat']
        },
        {
            id: 'bike3',
            type: 'bike',
            name: 'River Bikes',
            location: 'Thames Path',
            coordinates: { lat: 51.5081, lng: -0.1198 },
            available: 8,
            parking: 15,
            status: 'available',
            pricePerHour: 6,
            features: ['electric-assist', 'lights', 'bell']
        }
    ],
    scooters: [
        {
            id: 'scooter1',
            type: 'scooter',
            name: 'E-Scooters',
            location: 'Market Square',
            coordinates: { lat: 51.5074, lng: -0.1268 },
            available: 12,
            battery: 100,
            status: 'available',
            pricePerMinute: 0.25,
            range: '25km'
        },
        {
            id: 'scooter2',
            type: 'scooter',
            name: 'City Scooters',
            location: 'Business District',
            coordinates: { lat: 51.5159, lng: -0.1288 },
            available: 18,
            battery: 90,
            status: 'available',
            pricePerMinute: 0.25,
            range: '30km'
        },
        {
            id: 'scooter3',
            type: 'scooter',
            name: 'Express Scooters',
            location: 'Shopping Center',
            coordinates: { lat: 51.5142, lng: -0.1298 },
            available: 5,
            battery: 85,
            status: 'available',
            pricePerMinute: 0.30,
            range: '35km'
        }
    ],
    cars: [
        {
            id: 'car1',
            type: 'car',
            name: 'Electric Car Share',
            location: 'West End Hub',
            coordinates: { lat: 51.5074, lng: -0.1258 },
            models: ['Tesla Model 3', 'Nissan Leaf'],
            status: 'coming_soon',
            availableFrom: 'July 2024',
            pricePerHour: 15
        },
        {
            id: 'car2',
            type: 'car',
            name: 'Green Fleet',
            location: 'East Station',
            coordinates: { lat: 51.5183, lng: -0.1238 },
            models: ['BMW i3', 'Hyundai Kona Electric'],
            available: 3,
            status: 'available',
            pricePerHour: 12
        },
        {
            id: 'car3',
            type: 'car',
            name: 'Urban EVs',
            location: 'North Hub',
            coordinates: { lat: 51.5224, lng: -0.1278 },
            models: ['Volkswagen ID.3', 'Renault Zoe'],
            available: 5,
            status: 'available',
            pricePerHour: 10
        }
    ]
};

// WebSocket connection for real-time updates
let websocket;

function initWebSocket() {
    websocket = new WebSocket('wss://api.ecocities.com/ws'); // Replace with your WebSocket endpoint

    websocket.onopen = () => {
        console.log('WebSocket connected');
        // Subscribe to real-time updates
        websocket.send(JSON.stringify({
            type: 'subscribe',
            channels: ['mobility_updates', 'reservations']
        }));
    };

    websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleRealtimeUpdate(data);
    };

    websocket.onclose = () => {
        console.log('WebSocket disconnected');
        // Attempt to reconnect after 5 seconds
        setTimeout(initWebSocket, 5000);
    };
}

// Handle real-time updates
function handleRealtimeUpdate(data) {
    switch (data.type) {
        case 'availability_update':
            updateVehicleAvailability(data.vehicleId, data.availability);
            break;
        case 'reservation_update':
            handleReservationUpdate(data.reservation);
            break;
        case 'vehicle_status':
            updateVehicleStatus(data.vehicleId, data.status);
            break;
    }
}

// Update vehicle availability in UI
function updateVehicleAvailability(vehicleId, availability) {
    const card = document.querySelector(`[data-id="${vehicleId}"]`);
    if (card) {
        const availableElement = card.querySelector('.station-info p:nth-child(2)');
        if (availableElement) {
            const icon = getVehicleTypeIcon(card.dataset.type);
            availableElement.innerHTML = `<i class="${icon}"></i> ${availability} available`;
        }
    }
}

// Get appropriate icon for vehicle type
function getVehicleTypeIcon(type) {
    switch (type) {
        case 'bike': return 'fas fa-bicycle';
        case 'scooter': return 'fas fa-bolt';
        case 'car': return 'fas fa-car';
        default: return 'fas fa-circle';
    }
}

// API calls for reservations
async function makeReservation(vehicleId, userId) {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.reservations}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getUserToken()}`
            },
            body: JSON.stringify({
                vehicleId,
                userId,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) throw new Error('Reservation failed');

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Reservation error:', error);
        throw error;
    }
}

// Handle reservation updates
function handleReservationUpdate(reservation) {
    const { vehicleId, status } = reservation;
    const card = document.querySelector(`[data-id="${vehicleId}"]`);
    
    if (card) {
        const statusBadge = card.querySelector('.availability-badge');
        statusBadge.textContent = status;
        statusBadge.className = `availability-badge ${status.toLowerCase().replace(' ', '-')}`;
    }
}

// Setup notification preferences
async function setupNotifications(userId, preferences) {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.notifications}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getUserToken()}`
            },
            body: JSON.stringify({
                userId,
                preferences
            })
        });

        if (!response.ok) throw new Error('Failed to setup notifications');

        return await response.json();
    } catch (error) {
        console.error('Notification setup error:', error);
        throw error;
    }
}

// Initialize Google Maps
function initMap() {
    // This function will be called when the Google Maps API is loaded
    if (typeof google === 'undefined') {
        console.log('Google Maps API not loaded');
        return;
    }

    const mapOptions = {
        center: { lat: 51.5074, lng: -0.1278 },
        zoom: 13,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{ "color": "#f5f5f5" }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{ "color": "#c9c9c9" }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{ "color": "#e5e5e5" }]
            }
        ]
    };

    const map = new google.maps.Map(document.getElementById('mobility-map'), mapOptions);
    
    // Add markers for all mobility options
    addMarkers(map);
}

// Add markers to the map
function addMarkers(map) {
    // Add bike markers
    mobilityData.bikes.forEach(bike => {
        const marker = new google.maps.Marker({
            position: bike.coordinates,
            map: map,
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                scaledSize: new google.maps.Size(32, 32)
            },
            title: bike.name
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info-window">
                    <h3>${bike.name}</h3>
                    <p>${bike.available} bikes available</p>
                    <p>${bike.parking} parking spots</p>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });

    // Add similar markers for scooters and cars
    // ... (similar code for other mobility types)
}

// Initialize filters
function initFilters() {
    const transportType = document.getElementById('transport-type');
    const location = document.getElementById('location');
    const availability = document.getElementById('availability');

    // Add event listeners
    [transportType, location, availability].forEach(filter => {
        filter.addEventListener('change', updateMobilityCards);
    });
}

// Update mobility cards based on filters
function updateMobilityCards() {
    const transportType = document.getElementById('transport-type').value;
    const location = document.getElementById('location').value;
    const availability = document.getElementById('availability').value;

    const cards = document.querySelectorAll('.mobility-card');
    
    cards.forEach(card => {
        let show = true;

        // Apply filters
        if (transportType !== 'all') {
            const cardType = card.dataset.type;
            if (cardType !== transportType) show = false;
        }

        if (location !== 'all') {
            const cardLocation = card.dataset.location;
            if (cardLocation !== location) show = false;
        }

        if (availability !== 'all') {
            const cardAvailability = card.dataset.availability;
            if (cardAvailability !== availability) show = false;
        }

        // Show/hide card
        card.style.display = show ? 'block' : 'none';
    });
}

// Initialize mobility cards
function initMobilityCards() {
    const mobilityGrid = document.querySelector('.mobility-grid');
    mobilityGrid.innerHTML = ''; // Clear existing cards
    
    // Render all mobility options
    mobilityData.bikes.forEach(bike => renderMobilityCard(bike, mobilityGrid));
    mobilityData.scooters.forEach(scooter => renderMobilityCard(scooter, mobilityGrid));
    mobilityData.cars.forEach(car => renderMobilityCard(car, mobilityGrid));
    
    // Add event listeners to all cards
    const cards = document.querySelectorAll('.mobility-card');
    cards.forEach(card => {
        // Add reserve button functionality
        const reserveBtn = card.querySelector('.btn-reserve');
        if (reserveBtn) {
            reserveBtn.addEventListener('click', () => handleReservation(card));
        }

        // Add notify button functionality
        const notifyBtn = card.querySelector('.btn-notify');
        if (notifyBtn) {
            notifyBtn.addEventListener('click', () => handleNotification(card));
        }

        // Add directions button functionality
        const directionsBtn = card.querySelector('.btn-directions');
        if (directionsBtn) {
            directionsBtn.addEventListener('click', () => handleDirections(card));
        }
    });
}

// Render a single mobility card
function renderMobilityCard(data, container) {
    const card = document.createElement('div');
    card.className = 'mobility-card';
    card.dataset.id = data.id;
    card.dataset.type = data.type;
    card.dataset.location = data.location;
    
    const icon = getVehicleTypeIcon(data.type);
    const statusClass = data.status.toLowerCase().replace(' ', '-');
    
    let details = '';
    if (data.type === 'car') {
        details = `
            <p><i class="fas fa-car"></i> ${data.models.join(', ')}</p>
            <p><i class="fas fa-clock"></i> ${data.status === 'coming_soon' ? `Available from ${data.availableFrom}` : `${data.available} available`}</p>
            <p><i class="fas fa-tag"></i> $${data.pricePerHour}/hour</p>
        `;
    } else if (data.type === 'scooter') {
        details = `
            <p><i class="fas fa-charging-station"></i> ${data.available} scooters</p>
            <p><i class="fas fa-battery-full"></i> ${data.battery}% Battery</p>
            <p><i class="fas fa-route"></i> Range: ${data.range}</p>
        `;
    } else {
        details = `
            <p><i class="fas fa-bicycle"></i> ${data.available} bikes available</p>
            <p><i class="fas fa-parking"></i> ${data.parking} parking spots</p>
            <p><i class="fas fa-tag"></i> $${data.pricePerHour}/hour</p>
        `;
    }

    card.innerHTML = `
        <div class="mobility-card-header">
            <i class="${icon}"></i>
            <h3>${data.name}</h3>
            <span class="availability-badge ${statusClass}">${data.status}</span>
        </div>
        <div class="mobility-card-content">
            <div class="station-info">
                <p><i class="fas fa-map-marker-alt"></i> ${data.location}</p>
                ${details}
            </div>
            <div class="mobility-actions">
                ${data.status === 'coming_soon' 
                    ? '<button class="btn-notify">Notify Me</button>'
                    : '<button class="btn-reserve">Reserve Now</button>'
                }
                <button class="btn-directions" title="Get Directions">
                    <i class="fas fa-directions"></i>
                </button>
            </div>
        </div>
    `;
    
    container.appendChild(card);
}

// Handle reservation
function handleReservation(card) {
    const mobilityId = card.dataset.id;
    const mobilityType = card.dataset.type;

    // Show confirmation modal
    showModal({
        title: 'Confirm Reservation',
        message: `Would you like to reserve this ${mobilityType}?`,
        confirmText: 'Reserve Now',
        onConfirm: () => {
            // Simulate API call
            setTimeout(() => {
                showNotification('Success', `Your ${mobilityType} has been reserved!`, 'success');
                updateAvailability(card);
            }, 1000);
        }
    });
}

// Handle notification signup
function handleNotification(card) {
    const mobilityId = card.dataset.id;
    const mobilityType = card.dataset.type;

    // Show notification signup modal
    showModal({
        title: 'Get Notified',
        message: 'Enter your email to be notified when this becomes available:',
        input: 'email',
        confirmText: 'Notify Me',
        onConfirm: (email) => {
            // Simulate API call
            setTimeout(() => {
                showNotification('Success', `We'll notify you when the ${mobilityType} becomes available!`, 'success');
            }, 1000);
        }
    });
}

// Handle directions
function handleDirections(card) {
    const location = card.dataset.location;
    
    // Open in Google Maps
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`);
}

// Initialize stats counter
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-card p');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        animateValue(stat, 0, target, 2000);
    });
}

// Animate number counter
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current.toLocaleString();
        
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Show modal
function showModal({ title, message, input, confirmText, onConfirm }) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            <p>${message}</p>
            ${input ? `<input type="${input}" placeholder="Enter your ${input}">` : ''}
            <div class="modal-actions">
                <button class="btn-cancel">Cancel</button>
                <button class="btn-confirm">${confirmText}</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    const cancelBtn = modal.querySelector('.btn-cancel');
    const confirmBtn = modal.querySelector('.btn-confirm');
    const inputField = input ? modal.querySelector('input') : null;

    cancelBtn.addEventListener('click', () => {
        modal.remove();
    });

    confirmBtn.addEventListener('click', () => {
        if (input) {
            onConfirm(inputField.value);
        } else {
            onConfirm();
        }
        modal.remove();
    });
}

// Show notification
function showNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <h4>${title}</h4>
        <p>${message}</p>
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update availability
function updateAvailability(card) {
    const availableElement = card.querySelector('.station-info p:nth-child(2)');
    const currentAvailable = parseInt(availableElement.textContent);
    
    if (currentAvailable > 0) {
        availableElement.innerHTML = `<i class="fas fa-bicycle"></i> ${currentAvailable - 1} available`;
    }
}

// Periodic stats update
async function updateStats() {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.mobility}/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        
        const stats = await response.json();
        updateStatsDisplay(stats);
    } catch (error) {
        console.error('Stats update error:', error);
    }
}

// Update stats display
function updateStatsDisplay(stats) {
    const { co2Saved, activeUsers, totalTrips } = stats;
    
    document.querySelector('.stat-card:nth-child(1) p').textContent = `${co2Saved.toLocaleString()} kg`;
    document.querySelector('.stat-card:nth-child(2) p').textContent = activeUsers.toLocaleString();
    document.querySelector('.stat-card:nth-child(3) p').textContent = totalTrips.toLocaleString();
}

// Utility function to get user token
function getUserToken() {
    return localStorage.getItem('userToken'); // Implement your token storage/retrieval logic
}

// Update vehicle status
function updateVehicleStatus(vehicleId, status) {
    const card = document.querySelector(`[data-id="${vehicleId}"]`);
    if (card) {
        const statusBadge = card.querySelector('.availability-badge');
        statusBadge.textContent = status;
        statusBadge.className = `availability-badge ${status.toLowerCase().replace(' ', '-')}`;
    }
} 