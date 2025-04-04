let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.7128, lng: -74.0060 }, // Default to New York City
        zoom: 12,
    });

    // Define locations for each category
    const locations = [
        { type: "charging", position: { lat: 40.730610, lng: -73.935242 }, title: "EV Charging Station", icon: "https://img.icons8.com/color/48/000000/ev-station.png" },
        { type: "recycling", position: { lat: 40.748817, lng: -73.985428 }, title: "Plastic Recycling Center", icon: "https://img.icons8.com/color/48/000000/recycle-bin.png" },
        { type: "restroom", position: { lat: 40.752726, lng: -73.977229 }, title: "Public Restroom", icon: "https://img.icons8.com/color/48/000000/public-restroom.png" },
        { type: "gardens", position: { lat: 40.722282, lng: -73.987415 }, title: "Community Garden", icon: "https://img.icons8.com/color/48/000000/garden.png" },
        { type: "bicycle", position: { lat: 40.729512, lng: -73.998607 }, title: "Bicycle Parking & Repair", icon: "https://img.icons8.com/color/48/000000/bicycle.png" },
        { type: "waste", position: { lat: 40.741895, lng: -73.989308 }, title: "Smart Waste Disposal", icon: "https://img.icons8.com/color/48/000000/waste.png" }
    ];

    // Create markers
    locations.forEach(loc => {
        let marker = new google.maps.Marker({
            position: loc.position,
            map: map,
            title: loc.title,
            icon: loc.icon,
        });

        let infoWindow = new google.maps.InfoWindow({
            content: `<h3>${loc.title}</h3>`
        });

        marker.addListener("click", function () {
            infoWindow.open(map, marker);
        });

        marker.category = loc.type;
        markers.push(marker);
    });
}

// Function to filter markers
function filterMarkers(category) {
    markers.forEach(marker => {
        if (marker.category === category) {
            marker.setMap(map);
        } else {
            marker.setMap(null);
        }
    });
}

// Initialize the map after window loads
window.onload = initMap;
