// Fetch data

const get_data = async () => {
  res = await fetch(
    "https://raw.githubusercontent.com/pfoser/tutorial-express-leaflet/master/code/leaflet_express_pug_data/Restaurant_data.geojson"
  );
  return res.json();
};

const dataFeatures = get_data();

const filterCuisines = async () => {
  const data = await get_data();
  const cuisines = data.features.map((feature) => feature.properties.CUISINE);
  return [...new Set(cuisines)]; // Removes duplicates
};

filterCuisines().then((cuisines) => console.log(cuisines));

// Mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoibmRhcnVwZXRybyIsImEiOiJjbDFvbmN2djMwNXp3M2NrYjRzM3NsOHJjIn0.3n8aCZ3AcjQZ0ESVA9gTaQ";

var mapb = new mapboxgl.Map({
  container: "map1",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-77.3117, 38.8315],
  zoom: 13,
});

// Leaflet JS
var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
});

var mapL = L.map("map2", {
  center: [39.73, -104.99],
  zoom: 10,
  layers: [osm],
});

var markersL = L.markerClusterGroup();
let cuisines = {};
let mapboxMarkers = [];

// Function to add restaurants as markers to mapobox and leaflet js
const addRestaurantMarkers = async () => {
  const data = await get_data();
  let bounds = new mapboxgl.LngLatBounds(); // Get bounds
  data.features.forEach((feature) => {
    const { geometry, properties } = feature;
    const [longitude, latitude] = geometry.coordinates;
    const markerL = L.marker([latitude, longitude]);
    const markerB = new mapboxgl.Marker()
      .setLngLat([geometry.coordinates[0], geometry.coordinates[1]])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          `Name: ${properties.NAME}<br>Cuisine: ${properties.CUISINE}`
        )
      )
      .addTo(mapb);
    mapboxMarkers.push(markerB);

    // Bind popup without immediately opening it
    markerL.bindPopup(
      `Name: ${properties.NAME}<br>Cuisine: ${properties.CUISINE}`
    );
    
    if (cuisines[properties.CUISINE]) {
      cuisines[properties.CUISINE].push(markerL);
    } else {
      cuisines[properties.CUISINE] = [markerL]; 
    }

    // add event listener for mouseover to open the popup
    markerL.on("mouseover", function (e) {
      this.openPopup();
    });

    // Mouse close
    markerL.on("mouseout", function (e) {
      this.closePopup();
    });

    markersL.addLayer(markerL); // Add iterated markets into a layer group

    // For Mapbox GL JS
    new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          `Name: ${properties.NAME}<br>Cuisine: ${properties.CUISINE}`
        )
      ) // Add popup
      .addTo(mapb);
    bounds.extend([longitude, latitude]); // extend bounds
  });

  mapL.addLayer(markersL); // Add MarkerClusterGroup to the Leaflket map
  mapb.fitBounds(bounds, {
    padding: 20,
  });
  if (!markersL.getBounds().isValid()) {
    mapL.setView([39.73, -104.99], 10); // Fallback center and zoom if bounds are not valid
  } else {
    mapL.fitBounds(markersL.getBounds());
  }
};

const updateCuisineDropdown = () => {
  const placeSelect = document.getElementById("placeSelect");
  // Add "All" option dyanimically
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All";
  placeSelect.appendChild(allOption);

  // Add options for each cuisine
  Object.keys(cuisines)
    .sort()
    .forEach((cuisine) => {
      const option = document.createElement("option");
      option.value = cuisine;
      option.textContent = cuisine.charAt(0).toUpperCase() + cuisine.slice(1);
      placeSelect.appendChild(option);
    });
};

addRestaurantMarkers().then(updateCuisineDropdown);

function clearMarkers() {
  mapL.eachLayer(function (layer) {
    if (!!layer.toGeoJSON) {
      mapL.removeLayer(layer);
    }
  });
}

// Handle cuisine selection change
document.getElementById("placeSelect").addEventListener("change", function (e) {
  const selectedCuisine = e.target.value;

  // Remove existing Mapbox markers
  console.log("Before removal, marker count:", mapboxMarkers.length);
  mapboxMarkers.forEach((marker) => marker.remove());
  mapboxMarkers = []; // Clear the array for new Mapbox markers
  mapb.resize();

  // Handle Mapbox markers based on the selected cuisine
  let boundsMapbox = new mapboxgl.LngLatBounds();
  Object.keys(cuisines).forEach((cuisine) => {
    if (selectedCuisine === "all" || cuisine === selectedCuisine) {
      cuisines[cuisine].forEach((markerL) => {
        const { lng, lat } = markerL.getLatLng();
        const markerB = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapb);
        boundsMapbox.extend([lng, lat]);
        mapboxMarkers.push(markerB); // Re-track the new set of Mapbox markers
      });
    }
  });

  // Adjust Mapbox view
  if (!boundsMapbox.isEmpty()) {
    mapb.fitBounds(boundsMapbox, { padding: 20 });
  }

  // Clear existing MarkerClusterGroup and create a new one
  mapL.removeLayer(markersL);
  markersL = L.markerClusterGroup();

  // Re-add Leaflet markers based on the selected cuisine
  if (selectedCuisine === "all") {
    Object.values(cuisines)
      .flat()
      .forEach((markerL) => markersL.addLayer(markerL));
  } else {
    cuisines[selectedCuisine]?.forEach((markerL) => markersL.addLayer(markerL));
  }

  mapL.addLayer(markersL);

  // Adjust Leaflet map view to fit all markers in the cluster group
  if (markersL.getLayers().length > 0) {
    mapL.fitBounds(markersL.getBounds(), { padding: [50, 50] });
  }
});
