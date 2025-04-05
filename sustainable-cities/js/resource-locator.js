// Initialize the map and global variables
let map;
let markers = [];
let currentLocation = null;
let geocoder;
let infoWindow;

// Sample resource data (in a real application, this would come from a database)
const resources = [
    {
        id: 1,
        name: "Green Valley Recycling Center",
        type: "recycling",
        lat: 51.505,
        lng: -0.09,
        address: "123 Eco Street, Green Valley",
        rating: 4.8,
        distance: "2.5 miles",
        description: "A comprehensive recycling center accepting paper, plastic, glass, and electronic waste.",
        hours: "Mon-Fri: 8am-6pm, Sat: 9am-4pm",
        phone: "+1 (555) 123-4567"
    },
    {
        id: 2,
        name: "Sunshine Solar Solutions",
        type: "solar",
        lat: 51.51,
        lng: -0.1,
        address: "456 Solar Avenue, Sun City",
        rating: 4.9,
        distance: "3.1 miles",
        description: "Professional solar panel installation and maintenance services.",
        hours: "Mon-Sat: 9am-5pm",
        phone: "+1 (555) 234-5678"
    },
    {
        id: 3,
        name: "Community Garden Hub",
        type: "garden",
        lat: 51.515,
        lng: -0.08,
        address: "789 Garden Lane, Green Valley",
        rating: 4.7,
        distance: "1.8 miles",
        description: "Community garden space with workshops and resources for urban farming.",
        hours: "Daily: 7am-7pm",
        phone: "+1 (555) 345-6789"
    }
];

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    initializeEventListeners();
    loadResources();
    getCurrentLocation();
});

// Initialize the map
function initializeMap() {
    // Initialize map with default center
    map = L.map('map').setView([51.505, -0.09], 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Initialize info window
    infoWindow = L.popup();
}

// Initialize all event listeners
function initializeEventListeners() {
    // Search location
    const searchButton = document.querySelector('.search-box button');
    const searchInput = document.getElementById('location-search');
    
    searchButton.addEventListener('click', () => {
        const location = searchInput.value;
        if (location) {
            searchLocation(location);
        }
    });

    // Filter resources
    const resourceTypeSelect = document.getElementById('resource-type');
    resourceTypeSelect.addEventListener('change', filterResources);

    // Form submission
    const resourceForm = document.querySelector('.resource-form');
    resourceForm.addEventListener('submit', handleResourceSubmission);

    // View details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const resourceId = this.dataset.resourceId;
            showResourceDetails(resourceId);
        });
    });
}

// Load resources onto the map and list
function loadResources() {
    clearMarkers();
    updateResourceList(resources);
    addResourceMarkers(resources);
}

// Clear all markers from the map
function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}

// Add markers for resources
function addResourceMarkers(resources) {
    resources.forEach(resource => {
        const marker = L.marker([resource.lat, resource.lng])
            .bindPopup(createPopupContent(resource))
            .on('click', () => highlightResourceCard(resource.id));
        
        markers.push(marker);
        marker.addTo(map);
    });
}

// Create popup content for markers
function createPopupContent(resource) {
    return `
        <div class="popup-content">
            <h3>${resource.name}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${resource.address}</p>
            <p><i class="fas fa-star"></i> Rating: ${resource.rating} ★</p>
            <p><i class="fas fa-clock"></i> ${resource.hours}</p>
            <p><i class="fas fa-phone"></i> ${resource.phone}</p>
            <button onclick="showResourceDetails(${resource.id})" class="popup-button">View Details</button>
        </div>
    `;
}

// Update the resource list in the UI
function updateResourceList(resources) {
    const resourceGrid = document.querySelector('.resource-grid');
    resourceGrid.innerHTML = '';

    resources.forEach(resource => {
        const card = createResourceCard(resource);
        resourceGrid.appendChild(card);
    });
}

// Create a resource card element
function createResourceCard(resource) {
    const card = document.createElement('div');
    card.className = 'resource-card';
    card.innerHTML = `
        <div class="resource-icon">
            <i class="fas fa-${getResourceIcon(resource.type)}"></i>
        </div>
        <h3>${resource.name}</h3>
        <p>${resource.address}</p>
        <div class="resource-details">
            <span class="distance"><i class="fas fa-map-marker-alt"></i> ${resource.distance}</span>
            <span class="rating"><i class="fas fa-star"></i> ${resource.rating} ★</span>
        </div>
        <button class="view-details" data-resource-id="${resource.id}">View Details</button>
    `;
    return card;
}

// Get appropriate icon for resource type
function getResourceIcon(type) {
    const icons = {
        recycling: 'recycle',
        solar: 'solar-panel',
        garden: 'seedling',
        compost: 'leaf',
        market: 'store'
    };
    return icons[type] || 'map-marker-alt';
}

// Search for a location
function searchLocation(location) {
    // In a real application, this would use a geocoding service
    // For now, we'll just show an alert
    showNotification(`Searching for location: ${location}`, 'info');
}

// Filter resources based on type
function filterResources() {
    const selectedType = document.getElementById('resource-type').value;
    
    const filteredResources = selectedType === 'all' 
        ? resources 
        : resources.filter(resource => resource.type === selectedType);
    
    clearMarkers();
    updateResourceList(filteredResources);
    addResourceMarkers(filteredResources);
}

// Show resource details
function showResourceDetails(resourceId) {
    const resource = resources.find(r => r.id === parseInt(resourceId));
    if (!resource) return;

    const modal = document.createElement('div');
    modal.className = 'resource-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="resource-icon">
                <i class="fas fa-${getResourceIcon(resource.type)}"></i>
            </div>
            <h2>${resource.name}</h2>
            <p class="address"><i class="fas fa-map-marker-alt"></i> ${resource.address}</p>
            <div class="details-grid">
                <div class="detail-item">
                    <i class="fas fa-star"></i>
                    <span>Rating: ${resource.rating} ★</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${resource.hours}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-phone"></i>
                    <span>${resource.phone}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${resource.distance} away</span>
                </div>
            </div>
            <p class="description">${resource.description}</p>
            <button class="get-directions" onclick="getDirections(${resource.lat}, ${resource.lng})">
                <i class="fas fa-directions"></i> Get Directions
            </button>
        </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
}

// Get directions to a location
function getDirections(lat, lng) {
    if (currentLocation) {
        // In a real application, this would open directions in a maps application
        showNotification('Opening directions in your preferred maps application...', 'success');
    } else {
        showNotification('Please enable location services to get directions', 'error');
    }
}

// Get user's current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                // Center map on user's location
                map.setView([currentLocation.lat, currentLocation.lng], 13);
                
                // Add marker for user's location
                L.marker([currentLocation.lat, currentLocation.lng])
                    .bindPopup('Your Location')
                    .addTo(map);

                showNotification('Location found!', 'success');
            },
            error => {
                console.error('Error getting location:', error);
                showNotification('Unable to get your location. Please enable location services.', 'error');
            }
        );
    } else {
        showNotification('Geolocation is not supported by your browser.', 'error');
    }
}

// Handle resource form submission
function handleResourceSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const newResource = {
        name: formData.get('name'),
        address: formData.get('address'),
        type: formData.get('type'),
        contact: formData.get('contact'),
        additionalInfo: formData.get('additionalInfo')
    };
    
    // In a real application, this would send the data to a server
    console.log('New resource submitted:', newResource);
    
    showNotification('Thank you for submitting a new resource! Our team will review it shortly.', 'success');
    event.target.reset();
}

// Show notification to user
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Get appropriate icon for notification type
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Highlight resource card when marker is clicked
function highlightResourceCard(resourceId) {
    const cards = document.querySelectorAll('.resource-card');
    cards.forEach(card => {
        card.classList.remove('highlighted');
        if (card.querySelector(`[data-resource-id="${resourceId}"]`)) {
            card.classList.add('highlighted');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
} 