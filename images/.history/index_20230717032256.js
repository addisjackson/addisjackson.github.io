document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Construct the URL for the JSON API
  let apiUrl = "https://swapi.dev/api/";
let searchedPlanet = document.getElementById("planetSearch").value;
let searchByFilms = `planets/?search=${searchedPlanet}`;
let searchParams = `planets/?search=${searchedPlanet}`;
  fetch(apiUrl + searchParams)
    .then((response) => {
         return response.json();
  })
 .then(data => {
    const planet = data.results[0]
    const residents = data.results[0].residents
    const films = data.results[0].films

    console.log(data.results[0])
    if(typeof planet === "undefined") {
      showError()

    } else {
      renderPlanet(planet);
    }
  })
})
const planetSection = document.querySelector(".planet-section")
function renderPlanet(planet) {
  const planetElement = document.createElement("div");
  const planetName = document.createElement("h2");
planetName.classList.add("planetName")
planetName.innerText = planet.name
planetElement.appendChild(planetName);
planetSection.appendChild(planetElement);
}

function showError() {
   let planetError = document.createElement("div");
    planetError.classList.add("planetError")
    const errorText = document.createElement("p")
    errorText.classList.add("errorText")
    errorText.innerText = "No flights found to this planet. Please check back in the future as we are always expanding our service area."
    planetError.innerHTML= errorText
    planetError.appendChild(errorText);
    planetSection.appendChild(planetError);
    
}

const planetImages = {
  Tatooine: "./assets/Tatooine.jpg",
  Alderaan: "./assets/Alderaan.jpg",
  Jabba: "./assets/Jabba.jpg",
  Caldari: "./assets/Caldari.jpg",
  Gallente: "./assets/Gallente.jpg",
  Minmatar: "./assets/Minmatar.jpg",
  
}
