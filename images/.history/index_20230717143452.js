const planetInfo = document.getElementById('planetInfo');
const planetImage = document.getElementById('planetImage');

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

planetInfo.textContent = `${enteredPlanet}: ${planetStuff.synopsis}`
planetImage.src = planetStuff.image;
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
const planetStuff = {
  Yavin IV: {
    synopsis: "The surface of Yavin 4 was divided into several continental masses, two of which were Starloft and Wetyin. Notable natural formations included Massassi Valley, Skygazer Hill, and the Ferra Groves. The verdant world had a comfortable, temperate climate but a challenging ecosystem and dangerous predators.The moon's landmasses were covered by dense jungles and rain forests whose flora included purple-barked Massassi trees, grenade fungi, bioluminescent orchids, and climbing ferns. Yavin 4 also had swampy areas. The moon, however, was completely lacking in any mineral resources of significance.",
    image:"assets/YavinIV.jpeg"
  },  
  Tatooine: {
    synopsis: "`Tatooine was a planet located in the Outer Rim, a region of the galaxy far removed from its core. It had three moons, Ghomrassen, Guermessa, and Chenini.Long ago, Tatooine was covered in oceans and rainforests, but for unknown reasons, it became a hot desert world. Tatooine orbited twin suns, Tatoo I and Tatoo II. The whole planet was covered in harsh deserts, and only a small part of its northern hemisphere could sustain intelligent life. The landscape was covered with sand dunes, mountains, and canyons, which made traversing the planet very difficult. Due to the absence of surface water, those who lived on Tatooine had to draw moisture through the dry air.Rain was incredibly rare on Tatooine, coming once a year, decade, or century. When the rain came, some plants were able to grow in a brief yet glorious period. Inhabiting the planet were many native species, the largest of which were the carnivorous krayt dragons. The common krayt dragon, while more plentiful, was shadowed by the greater krayt dragon, which submerged itself under the shifting sands and used its powerful limbs to traverse through the dunes. In addition, the common bantha and eopie species also found a home on the world, along with dewbacks, rontos, womp rats, massiffs, and scurriers.`",
    image: "assets/Tatooine.jpg"
  },
  Naboo: {
    synopsis:"`Naboo was a small pastoral world in the Mid Rim, located near the border of the Outer Rim Territories. Unlike most other worlds, the ancient planet lacked a molten core, and instead comprised a conglomerate of large, rocky bodies that made up a network of tunnels and flooded caves. The native Gungans, who built their homes in the waters of Naboo, rarely ventured into the core, fearing the ravenous sea beasts which resided in areas such as the Caves of Eleuabad. Despite this, certain Gungan navigators utilized time-honored trade routes through the planet's structure, which served as the most expedient avenues to reach other areas of the planet. Naboo's interior was rich with plasma, a naturally-occurring energy unique to the planet, and this coupled with its lack of molten core gave Naboo a reputation as an enigma to astrophysicists, who regarded the world's structure as an extremely rare phenomenon in the galaxy.`",
    image: "assets/Naboo.jpeg"
  },
  Kamino: {
    synopsis:"`Located seventy thousand light-years from the Core Worlds, in the Abrion sector, Kamino was a remote and inhospitable extragalactic planet which was covered in oceans that held an abundance of life. The native Kaminoans lived on stilt-cities scattered across Kamino's watery surface. The majority of these cities were devoted to cloning projects, as the highly intelligent Kaminoans specialized in cloning for clients needing workers or private security forces, along with other one-off requests. Due to the remoteness of the planet and its extensive rainy season, only occasional representatives of clone purchasing authorities were undeterred from visiting the world. Kamino often experienced heavy rain, and during some parts of the year was covered with heavy electrical storms. During this season, Kaminoans rode on aiwhas underwater and resurfaced once they were near their destination. In the late clone wars, the cloning facilities were protected by the Kamino security clone troopers.`",
    image: "assets/Kamino.png"
  },
  Jabba: {
    synopsis:"`Jabba is a planet located in the Outer Rim, a region of the galaxy far removed from its core. It had three moons, Ghomrassen, Guermessa, and Chenini. Long ago, Jabba was covered in oceans and rainforests, but for unknown reasons, it became a hot desert world. Jabba orbited twin suns, Jabba I and Jabba II.`",
    image: "assets/Jabba.jpeg"
  },
  Hoth: {'`"Anyone who looks at Hoth from above would be forgiven for thinking it a mostly dead ball of ice". Imperial AT-ATs traverse the frozen landscape on Hoth. From space, the planet of Hoth looked like a pale blue orb due to its dense snow and ice covering. Five planets existed between Hoth and its sun, while an asteroid belt surrounded the planet with meteors occasionally striking the surface.Most of its surface was covered with glaciers and frozen ice plains. Another third of the planet was covered by oceans.The temperature, although always frigid, was known to drop to -60°C come nightfall.Although devoid of intelligent life, Hoth was home to fifteen subspecies of tauntauns, which were commonly used by Rebels as a means of transport, and which Han Solo cut open to use as shelter to keep Luke Skywalker and himself warm during a snowstorm. It was also home to a species of towering predators known as wampas. During his stay on Hoth, Skywalker was captured by a wampa and was hung upside down in the wampa"s cave, waiting to be eaten. Using the power of the Force, Skywalker managed to get his hands on his lightsaber and cut himself down from the roof and sever the wampa"s right arm. The planet also had a number of "crystalline geysers.`',
  image: "assets/Hoth.jpeg"
},
Degobah: {
  synopsis:"`Degobah is a planet located in the Outer Rim, a region of the galaxy far removed from its core. It had three moons, Ghomrassen, Guermessa, and Chenini. Long ago, Degobah was covered in oceans and rainforests, but for unknown reasons, it became a hot desert world. Degobah orbited twin suns, Degobah I and Degobah II.",
  image: "assets/Degobah.webp"
},
Bespin: {
  synopsis: "`Bespin is a planet located in the Outer Rim, a region of the galaxy far`",
  image: "assets/Bespin.jpegp"
},
Coruscant: {
  synopsis: "`Coruscant is a planet located in the Outer Rim, a region of the galaxy far'",
  image: "assets/Coruscant.jpeg"
},
Alderaan:{
  synopsis: "`Alderaan is a planet located in the Outer Rim, a region of the galaxy'",
  image: "assets/Alderaan.jpeg"
},
Endor: {
  synopsis: "`Endor is a planet located in the Outer Rim, a region of the galaxy'",
  image: "assets/Endor.jpeg"
},
Haden: {
  synopsis: "`Haven was the capital city of Iol, a planet in the Unknown Regions that was controlled by the company Tangan Industries. Iol was oldest and largest settlement on Iol, and it consisted of five large, separate domes that were each at least 1 kilometer in diameter. Each dome served a particular function within the city, with one containing Haven's government institutions and another containing the city's financial institutions, and each dome had a residential section that housed workers that were employed within that particular dome. The domes were all connected to one another via a series of tubes, which allowed for easy travel throughout the city.. Haven was also linked to the settlements Menelath and Shirkel, via two repulsortrain tunnels. The city was ran by an administrator, who was selected by Tangan Industries. Around the time of the Clone Wars, the Near-Human Elexia Nis'tar was appointed as Haven's administrator and while Tangan had hoped that she would act as a figurehead that they could manipulate, she distinguished herself by prioritizing the needs of Haven's inhabitants over those of the company. Nis'tar continued to act as the city's administrator until the time of the Yuuzhan Vong war.`",
  image: "assets/Haden.jpg"
}
}
