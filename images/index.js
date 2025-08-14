// Render a single planet's info and Book Flight button
function renderPlanet(planet) {
  const planetSection = document.querySelector(".planet-section");
  planetSection.innerHTML = '';

  // Planet name as page heading, centered and underlined
  const planetHeading = document.createElement("h1");
  planetHeading.classList.add("planet-heading");
  planetHeading.innerText = planet.name;
  planetSection.appendChild(planetHeading);

  // Centered, large image
  const planetImage = document.createElement("img");
  planetImage.src = planet.image || "assets/placeholder.jpg";
  planetImage.alt = planet.name;
  planetImage.classList.add("planet-image-large");
  planetSection.appendChild(planetImage);

  // Info: temperature, climate, inhabitants, then synopsis
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("planet-info-block");
  infoContainer.innerHTML = `
    <div><span class="planet-info-key">Temperature:</span><span class="planet-info-value">${planet.temperature || 'Unknown'}</span></div>
    <div><span class="planet-info-key">Climate:</span><span class="planet-info-value">${planet.climate || 'Unknown'}</span></div>
    <div><span class="planet-info-key">Indigenous Inhabitants:</span><span class="planet-info-value">${planet.indigenousInhabitants || 'Unknown'}</span></div>
    <div class="planet-synopsis"><span class="planet-info-key">Synopsis:</span><span class="planet-info-value">${planet.synopsis || 'No info'}</span></div>
  `;
  planetSection.appendChild(infoContainer);

  // Book Flight button
  const bookBtn = document.createElement('button');
  bookBtn.innerText = 'Book Flight';
  bookBtn.className = 'book-flight-btn';
  bookBtn.onclick = function() {
    window.location.href = `planetary-flight.html?planet=${encodeURIComponent(planet.name)}`;
  };
  planetSection.appendChild(bookBtn);
}

// Show error message if no planet found
function showError() {
  const planetSection = document.querySelector(".planet-section");
  planetSection.innerHTML = '';
  const planetError = document.createElement("div");
  planetError.classList.add("planetError");
  const errorText = document.createElement("p");
  errorText.classList.add("errorText");
  errorText.innerText = "No flights found to this planet. Please check back in the future as we are always expanding our service area.";
  planetError.appendChild(errorText);
  planetSection.appendChild(planetError);
}
// Planet information object
const searchedPlanet = [
  {
    name: "Yavin IV",
    image: "assets/YavinIV.jpeg",
    synopsis: "Base for the Rebel Alliance in 'A New Hope'; site of the first Death Star's destruction.",
    temperature: "Temperate",
    climate: "Jungle, humid",
    indigenousInhabitants: "Massassi, various fauna"
  },
  {
    name: "Tatooine",
    image: "assets/Tatooine.jpg",
    synopsis: "Home to Anakin and Luke Skywalker; featured in multiple films as a desert world.",
    temperature: "Hot, arid",
    climate: "Desert",
    indigenousInhabitants: "Tusken Raiders, Jawas, Banthas"
  },
  {
    name: "Naboo",
    image: "assets/Naboo.jpeg",
    synopsis: "Homeworld of Padmé Amidala and Emperor Palpatine; site of major battles in the prequels.",
    temperature: "Mild",
    climate: "Temperate, swamps, grasslands",
    indigenousInhabitants: "Gungans, Naboo humans"
  },
  {
    name: "Kamino",
    image: "assets/Kamino.png",
    synopsis: "Cloning facility for the Grand Army of the Republic in 'Attack of the Clones'.",
    temperature: "Cool, stormy",
    climate: "Oceanic, rainy",
    indigenousInhabitants: "Kaminoans, Aiwha"
  },
  {
    name: "Jabba",
    image: "assets/Jabba.jpeg",
    synopsis: "Not a canon planet; possibly refers to Jabba's Palace on Tatooine.",
    temperature: "Hot",
    climate: "Desert",
    indigenousInhabitants: "Various species, criminals"
  },
  {
    name: "Hoth",
    image: "assets/Hoth.jpeg",
    synopsis: "Rebel base in 'The Empire Strikes Back'; site of the Battle of Hoth.",
    temperature: "Freezing, -60°C at night",
    climate: "Frozen, tundra",
    indigenousInhabitants: "Tauntauns, Wampas"
  },
  {
    name: "Dagobah",
    image: "assets/Dagobah.webp",
    synopsis: "Yoda's exile home; Luke's Jedi training in 'The Empire Strikes Back'.",
    temperature: "Warm, humid",
    climate: "Swamp, jungle",
    indigenousInhabitants: "Various swamp creatures"
  },
  {
    name: "Bespin",
    image: "assets/Bespin.jpeg",
    synopsis: "Cloud City, run by Lando Calrissian; site of Luke vs. Vader duel in 'Empire'.",
    temperature: "Mild (habitable zone)",
    climate: "Gas giant, clouds",
    indigenousInhabitants: "Ugnaughts, humans"
  },
  {
    name: "Coruscant",
    image: "assets/Coruscant.jpeg",
    synopsis: "Capital of the Republic and Empire; political center in prequels.",
    temperature: "Temperate",
    climate: "Urban, ecumenopolis",
    indigenousInhabitants: "Humans, diverse species"
  },
  {
    name: "Alderaan",
    image: "assets/Alderaan.jpeg",
    synopsis: "Princess Leia's home; destroyed by the Death Star in 'A New Hope'.",
    temperature: "Mild",
    climate: "Grasslands, mountains",
    indigenousInhabitants: "Alderaanians, various fauna"
  },
  {
    name: "Endor",
    image: "assets/Endor.jpeg",
    synopsis: "Site of the second Death Star's destruction; home to Ewoks in 'Return of the Jedi'.",
    temperature: "Temperate",
    climate: "Forest, temperate",
    indigenousInhabitants: "Ewoks, Yuzzum"
  },
  {
    name: "Haden",
    image: "assets/Haden.jpg",
    synopsis: "Legends/Expanded Universe; not featured in main films.",
    temperature: "Unknown",
    climate: "Domed city, artificial",
    indigenousInhabitants: "Humans"
  },
  { name: "Corellia", image: "assets/Corellia.jpg", synopsis: "Han Solo's homeworld; shipbuilding center.", temperature: "Temperate", climate: "Urban, temperate", indigenousInhabitants: "Corellians, humans" },
  { name: "Crait", image: "assets/crait.jpeg", synopsis: "Site of the Resistance's last stand in 'The Last Jedi'.", temperature: "Cold, salty", climate: "Salt flats, mineral", indigenousInhabitants: "Vulptex (crystal foxes)" },
  { name: "Dantooine", image: "assets/Dantooine.jpg", synopsis: "Mentioned as former Rebel base in 'A New Hope'.", temperature: "Temperate", climate: "Grasslands", indigenousInhabitants: "Dantari, humans" },
  { name: "Dathomir", image: "assets/dathomir.jpg", synopsis: "Home of the Nightsisters and Zabrak; featured in 'The Clone Wars'.", temperature: "Varied", climate: "Swamp, forest", indigenousInhabitants: "Nightsisters, Zabrak" },
  { name: "Felucia", image: "assets/felucia.jpeg", synopsis: "Order 66 site in 'Revenge of the Sith'; lush, exotic world.", temperature: "Warm, humid", climate: "Jungle, fungal", indigenousInhabitants: "Felucians, various fauna" },
  { name: "Iridonia", image: "assets/Iridonia.jpg", synopsis: "Homeworld of the Zabrak species (Darth Maul).", temperature: "Harsh", climate: "Arid, rocky", indigenousInhabitants: "Zabrak" },
  { name: "Iridonia", image: "assets/Iridonia2.jpg", synopsis: "Homeworld of the Zabrak species (Darth Maul).", temperature: "Harsh", climate: "Arid, rocky", indigenousInhabitants: "Zabrak" },
  { name: "Jakku", image: "assets/jakku.jpeg", synopsis: "Rey's homeworld; site of major battles in sequels.", temperature: "Hot, arid", climate: "Desert", indigenousInhabitants: "Scavengers, Tito, steelpeckers" },
  { name: "Jedha", image: "assets/jedha.jpeg", synopsis: "Holy city destroyed in 'Rogue One'; kyber crystal source.", temperature: "Cold", climate: "Desert, rocky", indigenousInhabitants: "Guardians of the Whills, humans" },
  { name: "Kessel", image: "assets/kessel.jpeg", synopsis: "Spice mines; Han Solo's Kessel Run.", temperature: "Hot", climate: "Rocky, barren", indigenousInhabitants: "Pykes, energy spiders" },
  { name: "Lothal", image: "assets/lothal.jpeg", synopsis: "Featured in 'Star Wars Rebels'; Ezra Bridger's home.", temperature: "Temperate", climate: "Grasslands, plains", indigenousInhabitants: "Loth-cats, Loth-wolves, humans" },
  { name: "Mandalore", image: "assets/mandalore.jpeg", synopsis: "Home of Mandalorians; featured in 'The Mandalorian' and 'Clone Wars'.", temperature: "Varied", climate: "Urban, domed cities", indigenousInhabitants: "Mandalorians, humans" },
  { name: "Mon Cala", image: "assets/MonCala.png", synopsis: "Homeworld of Admiral Ackbar; aquatic world.", temperature: "Cool, aquatic", climate: "Oceanic", indigenousInhabitants: "Mon Calamari, Quarren" },
  { name: "Rodia", image: "assets/Rodia.jpeg", synopsis: "Homeworld of Greedo; swampy world.", temperature: "Warm, humid", climate: "Swamp, jungle", indigenousInhabitants: "Rodians" },
  { name: "Scarif", image: "assets/scarif.jpeg", synopsis: "Site of the Death Star plans theft in 'Rogue One'.", temperature: "Tropical", climate: "Tropical, beaches", indigenousInhabitants: "None (Imperial outpost)" },
  { name: "Umbara", image: "assets/umbara.jpeg", synopsis: "Shadowy world featured in 'The Clone Wars'.", temperature: "Dark, cold", climate: "Shadowy, misty", indigenousInhabitants: "Umbarans" },
  { name: "Utapau", image: "assets/utapau.jpeg", synopsis: "Obi-Wan vs. Grievous in 'Revenge of the Sith'.", temperature: "Arid, windy", climate: "Sinkholes, arid", indigenousInhabitants: "Utai, Pau'an" },
  { name: "Yavin IV", image: "assets/yavin-4.jpeg", synopsis: "Base for the Rebel Alliance in 'A New Hope'; site of the first Death Star's destruction.", temperature: "Temperate", climate: "Jungle, humid", indigenousInhabitants: "Massassi, various fauna" },
];


// Dynamically build the main page structure: background video, title, search bar, and planet section
function buildMainPage() {
  document.body.innerHTML = '';

  // Background video
  const bgDiv = document.createElement('div');
  bgDiv.className = 'background-video';
  const video = document.createElement('video');
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  const source = document.createElement('source');
  source.src = 'assets/addis_APP.mp4';
  source.type = 'video/mp4';
  video.appendChild(source);
  bgDiv.appendChild(video);
  document.body.appendChild(bgDiv);

  // Title
  const mainTitle = document.createElement('h1');
  mainTitle.innerText = "Addis' Galactic Flights to the Stars (Wars)";
  document.body.appendChild(mainTitle);

  // Booked Flights button
  const bookedBtn = document.createElement('button');
  bookedBtn.textContent = 'View Booked Flights';
  bookedBtn.className = 'booked-flights-btn';
  bookedBtn.onclick = () => window.location.href = 'booked-flights.html';
  document.body.appendChild(bookedBtn);

  // Book Flight button
  const bookBtn = document.createElement('button');
  bookBtn.textContent = 'Book a Flight';
  bookBtn.className = 'book-flight-btn';
  bookBtn.onclick = () => window.location.href = 'planetary-flight.html';
  document.body.appendChild(bookBtn);

  // Search form
  const form = document.createElement('form');
  form.id = 'searchForm';
  form.innerHTML = `
    <h2 id="searchPlanet">Search For Flights To Your Desired Planet Here:</h2>
    <div class="name">
      <label for="planetSearch">Planet Name</label>
      <input type="text" name="planetSearch" id="planetSearch" placeholder="Enter planet name">
    </div>
    <div class="buttons">
      <button type="submit" id="searchButton">Search</button>
      <button type="reset" id="resetButton">Reset</button>
    </div>
  `;
  document.body.appendChild(form);

  // Planet section
  const planetSection = document.createElement('section');
  planetSection.className = 'planet-section';
  document.body.appendChild(planetSection);

  // Add event listeners
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTerm = document.getElementById("planetSearch").value.trim().toLowerCase();
    renderSearchedPlanets(searchTerm);
  });
  form.addEventListener("reset", function () {
    document.querySelector('.planet-section').innerHTML = '';
  });
}

// Build the page on load
window.addEventListener('DOMContentLoaded', buildMainPage);

function renderSearchedPlanets(searchTerm) {
  const planetSection = document.querySelector(".planet-section");
  planetSection.innerHTML = '';
  // Filter planets by search term in name
  const filtered = searchedPlanet.filter(planet => planet.name.toLowerCase().includes(searchTerm));
  if (filtered.length === 0) {
    showError();
  } else {
    filtered.forEach(planet => renderPlanet(planet));
  }
}

