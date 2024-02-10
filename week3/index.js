import get_flag_icon from "./dish_country.js";

// Fetch data
const data_path =
  "https://gist.githubusercontent.com/denniesbor/a5b56f37f23147002a964c531b89de0f/raw/12405ea17e945b323901bfd7bc654b46c4008843/restaurant_data.geojson";

const get_data = async () => {
  try {
    const response = await fetch(data_path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
};

const filterCuisines = async () => {
  const data = await get_data();
  const cuisines = data.features.map((feature) => feature.properties.CUISINE);
  return [...new Set(cuisines)]; // Removes duplicates
};

filterCuisines().then((cuisines) => console.log(cuisines));

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

// Function to add restaurants as markers to mapobox and leaflet js
const addRestaurantMarkers = async () => {
  const data = await get_data();
  data.features.forEach((feature) => {
    const { geometry, properties } = feature;
    const [longitude, latitude] = geometry.coordinates;
    const icon_url = get_flag_icon(properties.CUISINE);

    console.log(icon_url);

    // Leaflet icon
    var myIcon = L.icon({
      iconUrl: icon_url,
      iconSize: [30, 30],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });

    const markerL = L.marker([latitude, longitude], { icon: myIcon });

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
  });

  mapL.addLayer(markersL); // Add MarkerClusterGroup to the Leaflket map

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

  // Handle Mapbox markers based on the selected cuisine
  let boundsMapbox = new mapboxgl.LngLatBounds();
  Object.keys(cuisines).forEach((cuisine) => {
    if (selectedCuisine === "all" || cuisine === selectedCuisine) {
      cuisines[cuisine].forEach((markerL) => {
        const { lng, lat } = markerL.getLatLng();
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
