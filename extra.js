let apiUrl = "https://swapi.dev/api/planets/";
  fetch(apiUrl + searchParams)
    .then((response) => {
         return response.json();
  })
 .then(data => {
    names.map((name) => encodeURIComponent(name)).join("&")}
    
  ); 
    