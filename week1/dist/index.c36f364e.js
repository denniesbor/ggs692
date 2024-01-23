//  leaflet map variables
var map = L.map("map").setView([
    38.82,
    -77.31
], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
let places = {
    "Innovation Hall": {
        lat: 38.82848,
        lng: -77.3074708
    },
    "Johnson Center": {
        lat: 38.8299275,
        lng: -77.3074037
    },
    "Exploratory Hall": {
        lat: 38.8299065,
        lng: -77.3055181
    },
    "The Hub": {
        lat: 38.8306744,
        lng: -77.3049049
    },
    "Fenwick Library": {
        lat: 38.8321235,
        lng: -77.3071438
    },
    "The Volgenau School of Engineering": {
        lat: 38.8275211,
        lng: -77.3052568
    },
    "Student Union Building": {
        lat: 38.8316117,
        lng: -77.308828
    }
};
var select = document.getElementById("placeSelect");
//  Add dropdown to the form
Object.keys(places).forEach((placeName)=>{
    var option = document.createElement("option");
    option.value = JSON.stringify(places[placeName]);
    option.textContent = placeName;
    select.appendChild(option);
});
// Store the current marker
var currentMarker = null;
// Function to add a marker to the map
function addMarker(lat, lng, type) {
    // Remove the existing marker or circle
    if (currentMarker) map.removeLayer(currentMarker);
    if (type === "pin") currentMarker = L.marker([
        lat,
        lng
    ]).addTo(map);
    else if (type === "circle") currentMarker = L.circleMarker([
        lat,
        lng
    ], {
        radius: 50,
        color: "black",
        fillColor: "red"
    }).addTo(map);
}
// Handle form submission
document.getElementById("placeForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var selectedOption = document.getElementById("placeSelect").value;
    var markerType = document.getElementById("markerType").value;
    var coords = JSON.parse(selectedOption);
    addMarker(coords.lat, coords.lng, markerType);
    map.setView([
        coords.lat,
        coords.lng
    ], 18);
});

//# sourceMappingURL=index.c36f364e.js.map
