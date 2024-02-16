const searchBar = document.querySelector("#search");
const resultsDiv = document.getElementById("results");

const restaurants = [
  { name: "The Gourmet Hut", cuisine: "French" },
  { name: "Casa de Sabor", cuisine: "Mexican" },
  { name: "Tokyo Diner", cuisine: "Japanese" },
  { name: "Mumbai Spice", cuisine: "Indian" },
  { name: "Dragon's Breath", cuisine: "Chinese" },
  { name: "Napoli Kitchen", cuisine: "Italian" },
  { name: "Sahara Tent", cuisine: "Middle Eastern" },
  { name: "The Greek Isles", cuisine: "Greek" },
  { name: "Southern Comfort", cuisine: "American" },
  { name: "Arctic Eats", cuisine: "Scandinavian" },
];

let filteredRestaurants = []; // Declare as a global variable

const filterRestaurants = (text) => {
  // Create a regex pattern dynamically based on the text input
  const regex = new RegExp(text, "i");

  // Filter the restaurants array by matching the regex pattern with the cuisine property
  filteredRestaurants = restaurants.filter((restaurant) =>
    regex.test(restaurant.cuisine)
  );
};

const searchRestaurant = (e) => {
  e.preventDefault();
  const text = e.target.value.toLowerCase();

  filterRestaurants(text);

  resultsDiv.innerHTML = ""; // Clear previous search

  filteredRestaurants.forEach((restaurant) => {
    const div = document.createElement("div");
    div.textContent = restaurant.cuisine;
    div.classList.add("cuisine-style"); // Add class for styling
    div.addEventListener("click", () => {
      searchBar.value = restaurant.cuisine; // Set the input field to the cuisine type
      resultsDiv.innerHTML = ""; // Clear the results display
    });
    resultsDiv.appendChild(div);
  });

  console.log(filteredRestaurants);
};

// Add a keyup event listerner, which records the typed values
searchBar.addEventListener("keyup", searchRestaurant);

document.querySelector(".search").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  console.log(searchBar.value);
  filterRestaurants(searchBar.value);

  console.log(filteredRestaurants);

  
});
