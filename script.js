
"use strict";

// ========================================
// 1. TOURIST DESTINATION DATABASE
// ========================================

const destinations = [
  {
    name: "Goa",
    state: "Goa",
    category: "Beach",
    distance: 450,
    description: "Enjoy beautiful beaches, sunsets and coastal life.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    category: "Heritage",
    distance: 1150,
    description: "Explore royal palaces, forts and colourful markets.",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Manali",
    state: "Himachal Pradesh",
    category: "Nature",
    distance: 1750,
    description: "Discover mountains, valleys and snowy landscapes.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Mumbai",
    state: "Maharashtra",
    category: "City",
    distance: 150,
    description: "Experience India's financial capital and the Gateway of India.",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Kerala",
    state: "Kerala",
    category: "Nature",
    distance: 1200,
    description: "Experience peaceful backwaters and lush green landscapes.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Agra",
    state: "Uttar Pradesh",
    category: "Heritage",
    distance: 1250,
    description: "Visit the world-famous Taj Mahal and historic monuments.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    category: "Spiritual",
    distance: 1450,
    description: "Discover ancient temples and the ghats of the Ganges.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Udaipur",
    state: "Rajasthan",
    category: "Heritage",
    distance: 670,
    description: "Explore beautiful lakes, palaces and historic streets.",
    image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Shimla",
    state: "Himachal Pradesh",
    category: "Nature",
    distance: 1550,
    description: "Enjoy mountain views, pine forests and cool weather.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Puri",
    state: "Odisha",
    category: "Spiritual",
    distance: 1650,
    description: "Visit the Jagannath Temple and beautiful coastline.",
    image: "https://images.unsplash.com/photo-1624087131575-56a2e2a7f2e0?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Andaman Islands",
    state: "Andaman and Nicobar Islands",
    category: "Beach",
    distance: 1900,
    description: "Explore tropical beaches and clear blue waters.",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Delhi",
    state: "Delhi",
    category: "City",
    distance: 1450,
    description: "Discover historical monuments, museums and markets.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=700&q=80"
  }
];

// ========================================
// 2. SELECT HTML ELEMENTS
// ========================================

const originInput = document.getElementById("origin");
const destinationSelect = document.getElementById("destinationSelect");
const travellersInput = document.getElementById("travellers");
const daysInput = document.getElementById("days");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const stateFilter = document.getElementById("stateFilter");
const destinationGrid = document.getElementById("destinationGrid");
const emptyState = document.getElementById("emptyState");

const routeTitle = document.getElementById("routeTitle");
const routeDistance = document.getElementById("routeDistance");
const routePeople = document.getElementById("routePeople");
const transportGrid = document.getElementById("transportGrid");

const transportChoice = document.getElementById("transportChoice");
const hotelCostInput = document.getElementById("hotelCost");
const roomsInput = document.getElementById("rooms");
const foodCostInput = document.getElementById("foodCost");
const activityCostInput = document.getElementById("activityCost");
const localCostInput = document.getElementById("localCost");

const totalCost = document.getElementById("totalCost");
const perPersonCost = document.getElementById("perPersonCost");
const costBreakdown = document.getElementById("costBreakdown");

// ========================================
// 3. HELPER FUNCTIONS
// ========================================

// Display money in Indian Rupee format.
function formatMoney(amount) {
  return "₹" + Math.round(amount).toLocaleString("en-IN");
}

// Read a number safely from an input.
function readNumber(element, minimum = 0) {
  const value = Number(element.value);

  if (!Number.isFinite(value)) {
    return minimum;
  }

  return Math.max(minimum, value);
}

// Find the selected destination.
function getSelectedDestination() {
  return destinations.find(function (place) {
    return place.name === destinationSelect.value;
  }) || destinations[0];
}

// ========================================
// 4. FILL DESTINATION DROPDOWN
// ========================================

destinations.forEach(function (place) {
  const option = document.createElement("option");

  option.value = place.name;
  option.textContent = place.name;

  destinationSelect.appendChild(option);
});

// ========================================
// 5. FILL STATE FILTER
// ========================================

const states = [...new Set(
  destinations.map(function (place) {
    return place.state;
  })
)].sort();

states.forEach(function (state) {
  const option = document.createElement("option");

  option.value = state;
  option.textContent = state;

  stateFilter.appendChild(option);
});

// ========================================
// 6. DISPLAY DESTINATION CARDS
// ========================================

function displayDestinations() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;
  const selectedState = stateFilter.value;

  destinationGrid.innerHTML = "";

  const filteredDestinations = destinations.filter(function (place) {
    const matchesSearch =
      place.name.toLowerCase().includes(searchText) ||
      place.state.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      place.category === selectedCategory;

    const matchesState =
      selectedState === "all" ||
      place.state === selectedState;

    return matchesSearch && matchesCategory && matchesState;
  });

  emptyState.classList.toggle(
    "hidden",
    filteredDestinations.length !== 0
  );

  filteredDestinations.forEach(function (place) {
    const card = document.createElement("article");

    card.className = "destination-card";

    // Use DOM elements instead of inserting user search text as HTML.
    const image = document.createElement("img");
    image.src = place.image;
    image.alt = place.name;
    image.loading = "lazy";

    const info = document.createElement("div");
    info.className = "destination-info";

    const heading = document.createElement("h3");
    heading.textContent = place.name;

    const state = document.createElement("p");
    state.className = "destination-state";
    state.textContent = place.state;

    const category = document.createElement("span");
    category.className = "category-tag";
    category.textContent = place.category;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.className = "btn";
    button.type = "button";
    button.textContent = "Plan This Trip";

    button.addEventListener("click", function () {
      destinationSelect.value = place.name;
      compareTransport();
      calculateBudget();

      document.getElementById("planner").scrollIntoView({
        behavior: "smooth"
      });
    });

    info.append(heading, state, category, description, button);
    card.append(image, info);
    destinationGrid.appendChild(card);
  });
}

// Update destination results when filters change.
searchInput.addEventListener("input", displayDestinations);
categoryFilter.addEventListener("change", displayDestinations);
stateFilter.addEventListener("change", displayDestinations);

// ========================================
// 7. TRANSPORT COST ESTIMATION
// ========================================

function getTransportEstimates(distance, people) {
  // These are illustrative sample rates, not live fares.
  // Road distance is a rough one-way reference estimate.
  // Car cost assumes a return journey.

  const carFuelCost = (distance * 2 / 15) * 105;
  const tollCost = distance * 2 * 1.2;
  const carCost = carFuelCost + tollCost;

  // Approximate return train estimate per person.
  const trainCost = distance * 2 * 1.2;

  // Approximate return flight estimate per person.
  const flightCost = 1500 + distance * 2 * 4;

  return [
    {
      id: "car",
      name: "Car",
      icon: "🚗",
      price: carCost,
      description: "Estimated fuel and tolls for a return road journey.",
      detail: "Flexible stops; parking and extra charges excluded.",
      duration: "Driving time depends on the actual road route."
    },
    {
      id: "train",
      name: "Train",
      icon: "🚆",
      price: trainCost * people,
      description: "Illustrative return cost for the whole group.",
      detail: "Actual fare depends on train, class and availability.",
      duration: "Check train schedules for actual journey time."
    },
    {
      id: "flight",
      name: "Aeroplane",
      icon: "✈️",
      price: flightCost * people,
      description: "Illustrative return airfare for the whole group.",
      detail: "Airport transfers, baggage and extra fees excluded.",
      duration: "Flight availability depends on the destination."
    }
  ];
}

// ========================================
// 8. DISPLAY TRANSPORT COMPARISON
// ========================================

function compareTransport() {
  const origin = originInput.value.trim() || "Your city";
  const destination = getSelectedDestination();
  const people = readNumber(travellersInput, 1);

  routeTitle.textContent = origin + " → " + destination.name;

  routeDistance.textContent =
    "Reference distance: approximately " +
    destination.distance.toLocaleString("en-IN") +
    " km one way from Pune. This sample distance does not change when you edit the starting city.";

  routePeople.textContent =
    "Travellers: " + people +
    " | Trip duration: " + readNumber(daysInput, 1) + " days";

  transportGrid.innerHTML = "";

  const estimates = getTransportEstimates(
    destination.distance,
    people
  );

  estimates.forEach(function (option) {
    const card = document.createElement("article");
    card.className = "transport-card";

    const icon = document.createElement("div");
    icon.className = "transport-icon";
    icon.textContent = option.icon;

    const heading = document.createElement("h3");
    heading.textContent = option.name;

    const price = document.createElement("div");
    price.className = "transport-price";
    price.textContent = formatMoney(option.price);

    const priceLabel = document.createElement("p");
    priceLabel.textContent = "Estimated return cost";

    const description = document.createElement("p");
    description.textContent = option.description;

    const details = document.createElement("p");
    details.textContent = option.detail;

    const duration = document.createElement("p");
    duration.textContent = option.duration;

    const button = document.createElement("button");
    button.className = "btn";
    button.type = "button";
    button.textContent = "Use This Option";

    button.addEventListener("click", function () {
      transportChoice.value = option.id;
      calculateBudget();

      document.getElementById("budget").scrollIntoView({
        behavior: "smooth"
      });
    });

    card.append(
      icon,
      heading,
      price,
      priceLabel,
      description,
      details,
      duration,
      button
    );

    transportGrid.appendChild(card);
  });
}

// ========================================
// 9. CALCULATE COMPLETE TRIP BUDGET
// ========================================

function calculateBudget() {
  const destination = getSelectedDestination();

  const people = readNumber(travellersInput, 1);
  const days = readNumber(daysInput, 1);
  const nights = Math.max(0, days - 1);

  const rooms = readNumber(roomsInput, 1);
  const hotelRate = readNumber(hotelCostInput);
  const foodRate = readNumber(foodCostInput);
  const activityRate = readNumber(activityCostInput);
  const localRate = readNumber(localCostInput);

  const estimates = getTransportEstimates(
    destination.distance,
    people
  );

  const selectedTransport = estimates.find(function (option) {
    return option.id === transportChoice.value;
  });

  const transportTotal = selectedTransport
    ? selectedTransport.price
    : 0;

  const hotelTotal = hotelRate * rooms * nights;
  const foodTotal = foodRate * people * days;
  const activityTotal = activityRate * people;
  const localTotal = localRate * people * days;

  const grandTotal =
    transportTotal +
    hotelTotal +
    foodTotal +
    activityTotal +
    localTotal;

  const personTotal = grandTotal / people;

  totalCost.textContent = formatMoney(grandTotal);
  perPersonCost.textContent = formatMoney(personTotal);

  const breakdown = [
    ["Return transport", transportTotal],
    ["Accommodation", hotelTotal],
    ["Food", foodTotal],
    ["Sightseeing", activityTotal],
    ["Local transport", localTotal]
  ];

  costBreakdown.innerHTML = "";

  breakdown.forEach(function (item) {
    const row = document.createElement("div");
    row.className = "breakdown-row";

    const label = document.createElement("span");
    label.textContent = item[0];

    const amount = document.createElement("strong");
    amount.textContent = formatMoney(item[1]);

    row.append(label, amount);
    costBreakdown.appendChild(row);
  });
}

// ========================================
// 10. CONNECT BUTTONS
// ========================================

document.getElementById("compareButton").addEventListener(
  "click",
  function () {
    compareTransport();
    calculateBudget();

    document.getElementById("compare").scrollIntoView({
      behavior: "smooth"
    });
  }
);

document.getElementById("calculateButton").addEventListener(
  "click",
  calculateBudget
);

// ========================================
// 11. INITIAL WEBSITE DISPLAY
// ========================================

displayDestinations();
compareTransport();
calculateBudget();
