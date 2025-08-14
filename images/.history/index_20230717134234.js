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
const planets = {
  Yavin IV: {
    synopsis: "The surface of Yavin 4 was divided into several continental masses, two of which were Starloft and Wetyin. Notable natural formations included Massassi Valley, Skygazer Hill, and the Ferra Groves. The verdant world had a comfortable, temperate climate but a challenging ecosystem and dangerous predators.
                The moon's landmasses were covered by dense jungles and rain forests whose flora included purple-barked Massassi trees, grenade fungi, bioluminescent orchids, and climbing ferns. Yavin 4 also had swampy areas. The moon, however, was completely lacking in any mineral resources of significance."
    image:"assets/YavinIV.jpeg"
  },  
  Tatooine: {
    synopsis: "`Tatooine was a planet located in the Outer Rim, a region of the galaxy far removed from its core. It had three moons, Ghomrassen, Guermessa, and Chenini.Long ago, Tatooine was covered in oceans and rainforests, but for unknown reasons, it became a hot desert world. Tatooine orbited twin suns, Tatoo I and Tatoo II. The whole planet was covered in harsh deserts, and only a small part of its northern hemisphere could sustain intelligent life. The landscape was covered with sand dunes, mountains, and canyons, which made traversing the planet very difficult. Due to the absence of surface water, those who lived on Tatooine had to draw moisture through the dry air.
              Rain was incredibly rare on Tatooine, coming once a year, decade, or century. When the rain came, some plants were able to grow in a brief yet glorious period. Inhabiting the planet were many native species, the largest of which were the carnivorous krayt dragons. The common krayt dragon, while more plentiful, was shadowed by the greater krayt dragon, which submerged itself under the shifting sands and used its powerful limbs to traverse through the dunes. In addition, the common bantha and eopie species also found a home on the world, along with dewbacks, rontos, womp rats, massiffs, and scurriers.`",
    image: "assets/Tatooine.jpg"
  },
  