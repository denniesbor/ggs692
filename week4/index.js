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

    // Attach mouseover and mouseout event listeners for each marker
    markerL.on("mouseover", function (e) {
      const content = `
        <b>Name:</b> ${properties.NAME}<br>
        <b>Cuisine:</b> ${properties.CUISINE}<br>
        <b>Coordinates:</b> ${latitude}, ${longitude}
      `;
      // Update the info div with this content
      updateInfo(content);
    });

    markerL.on("mouseout", function (e) {
      // Clear the info div when the mouse leaves the marker
      updateInfo("Hover over a marker.");
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

var info = L.control({
  position: "bottomleft",
});

info.onAdd = function (mapL) {
  this._div = L.DomUtil.create("div", "info");
  return this._div;
};

info.addTo(mapL);

// Function to update the info div
function updateInfo(content) {
  var infoDiv = document.querySelector(".info"); // Ensure you have a div with class 'info'
  infoDiv.innerHTML = content;
}


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

let filteredRestaurants = []; // Declare as a global variable

const searchBar = document.querySelector("#search");
const resultsDiv = document.getElementById("results");

const filterRestaurants = (text, restaurants) => {
  // Create a regex pattern dynamically based on the text input
  const regex = new RegExp(text, "i");

  // Filter the restaurants array by matching the regex pattern with the cuisine property
  filteredRestaurants = restaurants.filter((restaurant) =>
    regex.test(restaurant)
  );
};

// Handle cuisine selection change

(async () => {
  const storedArray = await filterCuisines();

  document.getElementById("search").addEventListener("keyup", function (e) {
    const searchedCuisine = e.target.value.toLowerCase();

    console.log(searchedCuisine);

    filterRestaurants(searchedCuisine, storedArray);

    resultsDiv.innerHTML = ""; // Clear previous search

    if (searchedCuisine) {
      filteredRestaurants.forEach((restaurant) => {
        const div = document.createElement("div");
        div.textContent = restaurant;
        div.classList.add("cuisine-style"); // Add class for styling
        div.addEventListener("click", () => {
          searchBar.value = restaurant; // Set the input field to the cuisine type
          resultsDiv.innerHTML = ""; // Clear the results display
        });
        resultsDiv.appendChild(div);
      });
    }
  });

  document.querySelector(".search").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    const searchBarVal = searchBar.value;

    // list of restaurants with similarity with the selected cuisine
    filterRestaurants(searchBarVal, storedArray);

    // find the list of equivalent search bar restaurants
    console.log(filteredRestaurants);

    if (filteredRestaurants) {
      Object.keys(cuisines).forEach((cuisine) => {
        filteredRestaurants.forEach((restaurant) => {
          cuisines[restaurant].forEach((markerL) => {
            const { lng, lat } = markerL.getLatLng();
          });
        });
      });
    }

    // Clear existing MarkerClusterGroup and create a new one
    mapL.removeLayer(markersL);
    markersL = L.markerClusterGroup();

    // Re-add Leaflet markers based on the selected cuisine
    if (!filteredRestaurants) {
      Object.values(cuisines)
        .flat()
        .forEach((markerL) => markersL.addLayer(markerL));
    } else {
      filteredRestaurants.forEach((restaurant) => {
        cuisines[restaurant]?.forEach((markerL) => markersL.addLayer(markerL));
      });
    }

    mapL.addLayer(markersL);

    // Adjust Leaflet map view to fit all markers in the cluster group
    if (markersL.getLayers().length > 0) {
      mapL.fitBounds(markersL.getBounds(), { padding: [50, 50] });
    }

    searchBar.value = ""; // Clear the list
    resultsDiv.innerHTML = "";
  });
})();

// const searchRestaurant = (e) => {
//   e.preventDefault();
//   const text = e.target.value.toLowerCase();

//   filterRestaurants(text);

//   resultsDiv.innerHTML = ""; // Clear previous search

//   filteredRestaurants.forEach((restaurant) => {
//     const div = document.createElement("div");
//     div.textContent = restaurant.cuisine;
//     div.classList.add("cuisine-style"); // Add class for styling
//     div.addEventListener("click", () => {
//       searchBar.value = restaurant.cuisine; // Set the input field to the cuisine type
//       resultsDiv.innerHTML = ""; // Clear the results display
//     });
//     resultsDiv.appendChild(div);
//   });

//   console.log(filteredRestaurants);
// };

// // Add a keyup event listerner, which records the typed values
// searchBar.addEventListener("keyup", searchRestaurant);
