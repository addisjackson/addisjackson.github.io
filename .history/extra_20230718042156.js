let apiUrl = "https://swapi.dev/api/planets/";
let searchedPlanet = document.getElementById("planetSearch").value;
  fetch(apiUrl + searchParams)
    .then((response) => {
         return response.json();
  })
 .then(data => {
    const planet = data.results[0]
    const names = data.results.name;
    for(name of names)
    return 