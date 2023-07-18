const planetInput = document.getElementById('planetSearch');

document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const searchedPlanet = planetInput.value.toLowerCase();
  const apiUrl = "https://swapi.dev/api/planets/";
  const searchParams = `?search=${searchedPlanet}`;

  fetch(apiUrl + searchParams)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      const planet = data.results[0];

      if (planet) {
        renderPlanet(planet);
      } else {
        showError();
      }
    });
});

const planetSection = document.querySelector(".planet-section");

function renderPlanet(planet) {
  // Clear previous planet elements
  planetSection.innerHTML = '';
  const planetContainer = document.createElement('div');
  planetContainer.classList.add('planet-container');
  const planetElement = document.createElement("div");
  const planetName = document.createElement("h2");
  planetName.classList.add("planetName");
  planetName.innerText = planet.name;
  planetElement.appendChild(planetName);

  const planetInfo = document.createElement("p");
  planetInfo.classList.add("planetInfo");
  planetInfo.innerText = searchedPlanet.find(p => p.name.toLowerCase() === planet.name.toLowerCase())?.synopsis || "No info collected";
  planetElement.appendChild(planetInfo);

  const planetImage = document.createElement("img");
  planetImage.src = searchedPlanet.find(p => p.name.toLowerCase() === planet.name.toLowerCase())?.image || "assets/placeholder.jpg";
  planetContainer.appendChild(planetImage);
  planetContainer.appendChild(planetElement);
  planetSection.appendChild(planetContainer);
}

function showError() {
  // Clear previous error message and planet elements
  planetSection.innerHTML = '';

  const planetError = document.createElement("div");
  planetError.classList.add("planetError");
  const errorText = document.createElement("p");
  errorText.classList.add("errorText");
  errorText.innerText = "No flights found to this planet. Please check back in the future as we are always expanding our service area.";
  planetError.appendChild(errorText);
  planetSection.appendChild(planetError);
}
