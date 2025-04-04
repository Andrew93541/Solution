document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    let map;
    let markers = [];
    let userLocation = null;

    // Sample resource data
    const resources = [
        {
            id: 1,
            name: "Green Recycling Center",
            type: "recycling",
            location: { lat: 51.5074, lng: -0.1278 },
            description: "Full-service recycling center accepting all types of materials",
            distance: "0.5 km",
            rating: 4.5,
            hours: "Mon-Sat: 9AM-6PM"
        },
        {
            id: 2,
            name: "Solar Energy Solutions",
            type: "energy",
            location: { lat: 51.5084, lng: -0.1288 },
            description: "Professional solar panel installation and consultation",
            distance: "1.2 km",
            rating: 4.8,
            hours: "Mon-Fri: 8AM-6PM"
        },
        {
            id: 3,
            name: "Bike Share Station",
            type: "transport",
            location: { lat: 51.5064, lng: -0.1268 },
            description: "Electric bike sharing station with 20 bikes available",
            distance: "0.8 km",
            rating: 4.2,
            hours: "24/7"
        },
        {
            id: 4,
            name: "Organic Food Market",
            type: "food",
            location: { lat: 51.5094, lng: -0.1298 },
            description: "Local organic produce and sustainable food products",
            distance: "1.5 km",
            rating: 4.7,
            hours: "Daily: 7AM-10PM"
        }
    ];

    // Initialize map function
    function initMap() {
        // Default center (London)
        const defaultCenter = { lat: 51.5074, lng: -0.1278 };
        
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: defaultCenter,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });

        // Add markers for all resources
        resources.forEach(resource => {
            addMarker(resource);
        });

        // Try to get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    map.setCenter(userLocation);
                    addUserMarker(userLocation);
                },
                error => {
                    console.log('Error getting location:', error);
                }
            );
        }
    }

    // Add marker function
    function addMarker(resource) {
        const marker = new google.maps.Marker({
            position: resource.location,
            map: map,
            title: resource.name,
            icon: getMarkerIcon(resource.type)
        });

        // Add click listener
        marker.addListener('click', () => {
            showResourceDetails(resource);
        });

        markers.push(marker);
    }

    // Add user marker function
    function addUserMarker(position) {
        const userMarker = new google.maps.Marker({
            position: position,
            map: map,
            title: 'Your Location',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#4285F4',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2
            }
        });
        markers.push(userMarker);
    }

    // Get marker icon based on resource type
    function getMarkerIcon(type) {
        const icons = {
            recycling: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            energy: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            transport: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            food: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        };
        return icons[type] || 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    }

    // Show resource details
    function showResourceDetails(resource) {
        const resourcesGrid = document.querySelector('.resources-grid');
        resourcesGrid.innerHTML = `
            <div class="resource-card">
                <h3>${resource.name}</h3>
                <p>${resource.description}</p>
                <p class="distance">Distance: ${resource.distance}</p>
                <p>Hours: ${resource.hours}</p>
                <p>Rating: ${resource.rating} ⭐</p>
                <div class="actions">
                    <button class="directions-btn" onclick="getDirections(${resource.location.lat}, ${resource.location.lng})">
                        Get Directions
                    </button>
                    <button class="details-btn" onclick="showMoreDetails(${resource.id})">
                        More Details
                    </button>
                </div>
            </div>
        `;
    }

    // Search functionality
    const searchBtn = document.getElementById('search-btn');
    const locationSearch = document.getElementById('location-search');

    searchBtn.addEventListener('click', () => {
        const location = locationSearch.value;
        if (location) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: location }, (results, status) => {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(13);
                } else {
                    showNotification('Location not found', 'error');
                }
            });
        }
    });

    // Filter functionality
    const filterCheckboxes = document.querySelectorAll('.filter-group input');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selectedTypes = Array.from(filterCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            markers.forEach(marker => {
                const resource = resources.find(r => 
                    r.location.lat === marker.getPosition().lat() && 
                    r.location.lng === marker.getPosition().lng()
                );
                
                if (resource && (selectedTypes.length === 0 || selectedTypes.includes(resource.type))) {
                    marker.setVisible(true);
                } else {
                    marker.setVisible(false);
                }
            });
        });
    });

    // Get directions function
    window.getDirections = function(lat, lng) {
        if (userLocation) {
            const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}&travelmode=driving`;
            window.open(directionsUrl, '_blank');
        } else {
            showNotification('Please enable location services to get directions', 'warning');
        }
    };

    // Show more details function
    window.showMoreDetails = function(resourceId) {
        const resource = resources.find(r => r.id === resourceId);
        if (resource) {
            // Create and show a modal with more details
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>${resource.name}</h2>
                    <p>${resource.description}</p>
                    <p>Distance: ${resource.distance}</p>
                    <p>Hours: ${resource.hours}</p>
                    <p>Rating: ${resource.rating} ⭐</p>
                    <div class="modal-actions">
                        <button class="directions-btn" onclick="getDirections(${resource.location.lat}, ${resource.location.lng})">
                            Get Directions
                        </button>
                        <button class="close-btn">Close</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // Close modal functionality
            const closeBtn = modal.querySelector('.close');
            const closeModalBtn = modal.querySelector('.close-btn');
            closeBtn.onclick = () => modal.remove();
            closeModalBtn.onclick = () => modal.remove();
            modal.onclick = (e) => {
                if (e.target === modal) modal.remove();
            };
        }
    };

    // Notification function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Initialize map when the page loads
    initMap();
}); 