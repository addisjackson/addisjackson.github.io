let apiUrl = "https://swapi.dev/api/planets/";
let searchedPlanet = document.getElementById("planetSearch").value;
  fetch(apiUrl + searchParams)
    .then((response) => {
         return response.json();
  })
 .then(data => {
    let names = []
    const planets = data.results
    for(planet of planets) {
    names.push(planet.name)
    return names  
    }
 })
 console.log(names) 