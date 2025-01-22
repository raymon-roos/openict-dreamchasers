// Zet de modal aan of uit
function toggleModal() {
  const modal = document.querySelector(".filterModal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

// Kies plek en ga naar reserveren
function choosePlace() {
  window.location.href = "../reserveren/index.html";
}

// Filter - Type Campingplek (Bungalow of Camping)
function chooseType(e) {
  const clickedType = e.getAttribute("data-info");
  if (clickedType == "bungalow") {
    document.getElementById("camping").classList.remove("activeType");
  } else {
    document.getElementById("bungalow").classList.remove("activeType");
  }
  activeType = clickedType;

  document.getElementById(clickedType).classList.add("activeType");
}

// Variabelen om actieve filters, markers bij te houden
let activeType = "";
let activeMarker = "";

// Mapbox API key (Later met .env file opslaan)
mapboxgl.accessToken =
  "pk.eyJ1IjoiY2VkcmljamFkZW4iLCJhIjoiY20zaWd2eXp4MDBzeDJrc2I3OXl2YXM4NyJ9.5FhoOI_VaE2SwbzPm2Volg";

// Maak de kaart
const map = new mapboxgl.Map({
  container: "map", // Het id van je map-container
  style: "mapbox://styles/mapbox/empty-v9", // Gebruik een lege kaartstijl, geen Mapbox achtergrond
  center: [0.0, 51.35], // Nieuwe center van de kaart [longitude, latitude]
  attributionControl: false, // Zet de Mapbox-attributie uit, zodat er geen Mapbox-logootje wordt weergegeven
  zoom: 9.9,
  maxZoom: 10.9, // Maximaal inzoomniveau
  dragRotate: false, // Schakel rotatie door slepen uit
});

const markers = [];

// Voeg de campingkaartafbeelding als achtergrond toe
map.on("load", function () {
  map.addSource("camping-map", {
    type: "image",
    url: "../assets/map.jpg", // Hier geef je het pad naar jouw campingkaart afbeelding op
    coordinates: [
      [-0.6, 51.6], // Linksbovenhoek (verhoogd)
      [0.6, 51.6], // Rechtsbovenhoek (verhoogd)
      [0.6, 51.1], // Rechtsbenedenhoek (verhoogd)
      [-0.6, 51.1], // Linksonderhoek (verhoogd)
    ],
  });

  map.setMaxBounds([
    [-0.6, 51.1], // Linksonderhoek (verhoogd)
    [0.6, 51.6], // Rechtsbovenhoek (verhoogd)
  ]);

  const nav = new mapboxgl.NavigationControl({
    showCompass: false, // Alleen zoom knoppen tonen
  });
  map.addControl(nav, "top-right"); // Plaats de controls rechtsboven

  map.addLayer({
    id: "camping-map-layer",
    type: "raster",
    source: "camping-map",
    paint: {
      "raster-opacity": 1,
    },
  });

  const plekken = [
    {
      accommodation_number: 1,
      coordinate: { long: -0.133, lat: 51.245 },
      type: { type: "kampeerplaats", price: 20 },
    },
    {
      accommodation_number: 2,
      coordinate: { long: -0.08, lat: 51.245 },
      type: { type: "kampeerplaats", price: 25 },
    },
    {
      accommodation_number: 3,
      coordinate: { long: -0.08, lat: 51.265 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 4,
      coordinate: { long: -0.01, lat: 51.265 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 5,
      coordinate: { long: -0.01, lat: 51.245 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 6,
      coordinate: { long: 0.02, lat: 51.245 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 7,
      coordinate: { long: 0.05, lat: 51.245 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 8,
      coordinate: { long: 0.04, lat: 51.265 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 9,
      coordinate: { long: 0.127, lat: 51.27 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 10,
      coordinate: { long: 0.127, lat: 51.245 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 11,
      coordinate: { long: 0.16, lat: 51.245 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 12,
      coordinate: { long: -0.09, lat: 51.39 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 13,
      coordinate: { long: -0.09, lat: 51.375 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 14,
      coordinate: { long: -0.1, lat: 51.345 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 15,
      coordinate: { long: -0.08, lat: 51.329 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 16,
      coordinate: { long: -0.07, lat: 51.345 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 17,
      coordinate: { long: -0.06, lat: 51.38 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 18,
      coordinate: { long: -0.05, lat: 51.395 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 19,
      coordinate: { long: -0.01, lat: 51.375 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 20,
      coordinate: { long: -0.03, lat: 51.362 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 21,
      coordinate: { long: -0.02, lat: 51.345 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 22,
      coordinate: { long: 0.01, lat: 51.34 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 23,
      coordinate: { long: 0.04, lat: 51.343 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 24,
      coordinate: { long: 0.04, lat: 51.361 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 25,
      coordinate: { long: 0.04, lat: 51.38 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 26,
      coordinate: { long: 0.04, lat: 51.397 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 27,
      coordinate: { long: 0.081, lat: 51.38 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 28,
      coordinate: { long: 0.084, lat: 51.362 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 29,
      coordinate: { long: 0.091, lat: 51.345 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 30,
      coordinate: { long: 0.12, lat: 51.345 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 31,
      coordinate: { long: 0.15, lat: 51.346 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 32,
      coordinate: { long: 0.158, lat: 51.364 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 33,
      coordinate: { long: 0.158, lat: 51.383 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 34,
      coordinate: { long: 0.145, lat: 51.4 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 35,
      coordinate: { long: -0.119, lat: 51.445 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 36,
      coordinate: { long: -0.09, lat: 51.456 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 37,
      coordinate: { long: -0.055, lat: 51.457 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 38,
      coordinate: { long: 0.015, lat: 51.457 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 39,
      coordinate: { long: 0.065, lat: 51.457 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 40,
      coordinate: { long: 0.12, lat: 51.458 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 41,
      coordinate: { long: 0.155, lat: 51.458 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 42,
      coordinate: { long: 0.194, lat: 51.455 },
      type: { type: "kampeerplaats", price: 30 },
    },
    {
      accommodation_number: 43,
      coordinate: { long: 0.24, lat: 51.455 },
      type: { type: "bungalow", price: 30 },
    },
    {
      accommodation_number: 44,
      coordinate: { long: 0.285, lat: 51.455 },
      type: { type: "bungalow", price: 30 },
    },
    {
      accommodation_number: 45,
      coordinate: { long: 0.24, lat: 51.428 },
      type: { type: "bungalow", price: 30 },
    },
    {
      accommodation_number: 46,
      coordinate: { long: 0.285, lat: 51.428 },
      type: { type: "bungalow", price: 30 },
    },
    {
      accommodation_number: 47,
      coordinate: { long: 0.238, lat: 51.365 },
      type: { type: "bungalow", price: 30 },
    },
    {
      accommodation_number: 48,
      coordinate: { long: 0.285, lat: 51.365 },
      type: { type: "bungalow", price: 30 },
    },
    {
      accommodation_number: 49,
      coordinate: { long: 0.22, lat: 51.248 },
      type: { type: "bungalow", price: 30 },
    },
    {
      accommodation_number: 50,
      coordinate: { long: 0.27, lat: 51.248 },
      type: { type: "bungalow", price: 30 },
    },
    {
      accommodation_number: 2,
      coordinate: { long: 0.142, lat: 51.445 },
      type: { type: "toilet" },
    },
    {
      accommodation_number: 3,
      coordinate: { long: 0.265, lat: 51.335 },
      type: { type: "toilet" },
    },
    {
      accommodation_number: 1,
      coordinate: { long: -0.18, lat: 51.375 },
      type: { type: "toilet" },
    },
    {
      accommodation_number: 904,
      coordinate: { long: -0.15, lat: 51.295 },
      type: { type: "washer" },
    },
    {
      accommodation_number: 905,
      coordinate: { long: -0.217, lat: 51.27 },
      type: { type: "restaurant" },
    },
    {
      accommodation_number: 906,
      coordinate: { long: -0.243, lat: 51.255 },
      type: { type: "reception" },
    },
  ];

  function createPOIs(pois) {
    pois.forEach((poi) => {
      const el = document.createElement("div");
      const circle = document.createElement("div"); // Cirkel voor icoon
      circle.className = "circle";

      // Voeg de juiste klasse toe voor het type marker
      if (poi.type.type === "bungalow") {
        el.className = "marker custom-marker-bungalow";
        el.innerHTML = poi.accommodation_number; // Zet het nummer direct in de cirkel
      } else if (poi.type.type === "kampeerplaats") {
        el.className = "marker custom-marker";
        el.innerHTML = poi.accommodation_number; // Zet het nummer direct in de cirkel
      } else {
        // overige POI types
        el.className = "marker icon-marker";

        // Voer de juiste icoon in op basis van de naam van de marker
        const icon = document.createElement("i");

        // Hier bepalen we welk icoon bij deze marker hoort, gebaseerd op de naam
        if (poi.type.type === "restaurant") {
          icon.className = "fa-solid fa-utensils"; // Restaurant
        } else if (poi.type.type === "toilet") {
          icon.className = "fa-solid fa-restroom"; // Toilet
        } else if (poi.type.type === "washer") {
          icon.className = "fa-solid fa-tshirt"; // Wasmachine
        } else if (poi.type.type === "reception") {
          icon.className = "fa-solid fa-info";
        }

        circle.appendChild(icon); // Voeg het icoon toe aan de cirkel
        el.appendChild(circle);

        // Voeg de pijl naar beneden toe buiten de cirkel
        const arrowIcon = document.createElement("i");
        arrowIcon.className = "fa-solid fa-arrow-down arrow-down-icon";
        el.appendChild(arrowIcon);
      }

      const coords = [poi.coordinate.long, poi.coordinate.lat];

      // Voeg de marker toe aan de kaart
      const marker = new mapboxgl.Marker(el)
        .setLngLat(coords) // Marker positie instellen
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // Popup offset om de popup iets van de marker af te plaatsen
            .setLngLat(coords) // Zet de positie van de popup op de locatie van de marker
            .setHTML(
              poi.type.type === "toilet"
                ? `<div class='infoCard'>
                    <div class='carousel'>
                    <i class="fa-solid fa-chevron-left arrowIcon--left"></i>
                    <img src='../assets/sanitaire ${poi.accommodation_number}.1.jpg' />
                    <img src='../assets/sanitaire ${poi.accommodation_number}.2.jpg' />
                    <img src='../assets/sanitaire ${poi.accommodation_number}.3.jpg' />
                    <img src='../assets/sanitaire ${poi.accommodation_number}.4.jpg' />
                    <img src='../assets/sanitaire ${poi.accommodation_number}.6.jpg' />
                    <img src='../assets/sanitaire ${poi.accommodation_number}.7.jpg' />
                    <i class="fa-solid fa-chevron-right arrowIcon--right"></i>
                    </div>
                    <div class='infoCard__content'>
                      <h3>Toilet ${poi.accommodation_number}</h3>
                      <p>Onze toiletten zijn schoon, goed onderhouden en 24/7 toegankelijk. Ze zijn uitgerust met gratis toiletpapier, zeep en handdroging. Ideaal voor een comfortabel verblijf!</p>
                      <div>6x <i class="fa-solid fa-shower"></i> | 6x <i class="fa-solid fa-toilet"></i></div>
                    </div>
                  </div>`
                : poi.type.type === "restaurant"
                ? `<div class='infoCard'>
                    <img src='../assets/placeholderCamping.jpg' />
                    <div class='infoCard__content'>
                      <h3>Restaurant ${poi.accommodation_number}</h3>
                      <p>Geniet van een heerlijke maaltijd in ons gezellige restaurant. We bieden lokale gerechten en dagelijkse specials aan voor een smaakvolle ervaring!</p>
                      <div><i class="fa-solid fa-utensils"></i></div>
                    </div>
                  </div>`
                : poi.type.type === "washer"
                ? `<div class='infoCard'>
                    <img src='../assets/placeholderCamping.jpg' />
                    <div class='infoCard__content'>
                      <h3>Wasmachine ${poi.accommodation_number}</h3>
                      <p>6 wasmachines en 6 drogers, 24/7 beschikbaar voor een snelle en efficiënte wasbeurt tijdens je verblijf.</p>
                    </div>
                  </div>`
                : poi.type.type === "reception"
                ? `<div class='infoCard'>
                    <img src='../assets/placeholderCamping.jpg' />
                    <div class='infoCard__content'>
                      <h3>interesting</h3>
                      <p>Onze receptie is 24/7 geopend voor al je vragen, reserveringen en hulp tijdens je verblijf. Hier kun je ook extra voorzieningen aanvragen en informatie krijgen over de omgeving.</p>
                    </div>
                  </div>`
                : // Popup voor andere markers zoals campingpoi en bungalow
                  `<div class='infoCard'>
                <img src='../assets/placeholderCamping.jpg' />
                <div class='infoCard__content'>
                  <h3>Camping ${poi.accommodation_number}</h3>
                  <p>★★★</p>
                  <p>€${poi.type.price} per nacht</p>
                </div>
                <div class='buttonContainer'>
                  <button id='chooseCampingPlaceBtn'>Kies kampeerplaats</button>
                </div>
              </div>`
            )
        )
        .addTo(map); // Marker toevoegen aan de kaart

      // Voegt functionaliteit aan knop
      marker.getPopup().on("open", () => {
        const button = document.querySelector("#chooseCampingPlaceBtn");
        setTimeout(() => {
          initializeCarousel(".carousel"); // Initialiseer de carousel na de vertraging
        }, 1000); // Stel de timer in voor een korte vertraging van 500 ms (kan worden aangepast)

        if (button) {
          button.addEventListener("click", () => {
            choosePlace(); // Je custom functie hier uitvoeren
          });
        } else {
          console.error("Knop niet gevonden in de popup");
        }
      });

      markers.push({ marker, element: el, type: poi.type.type });

      // Voeg een klikgebeurtenis toe aan de marker
      el.addEventListener("click", () => {
        // Verwijder de actieve status van de vorige marker
        if (activeMarker) {
          activeMarker.classList.remove("activeMarker");
        }

        // Voeg de actieve status alleen toe voor camping en bungalow types
        if (poi.type.type === "bungalow" || poi.type.type === "kampeerplaats") {
          el.classList.add("activeMarker");
          activeMarker = el;
        }

        // Focus op de marker door de kaart te verplaatsen
        map.flyTo({
          center: coords,
          zoom: 10.5, // Zoomniveau bij focus
          essential: true,
          offset: [0, -100], // Adjust the offset (x, y) to move the map center
        });
      });
    });
  }

  fetch("http://localhost:4000/accommodations").then(
    async (response) => {
      if (!response.ok) {
        console.error("page not found:", error);
        createPOIs(plekken);
      } else {
        createPOIs(await response.json());
      }
    },
    (error) => {
      console.error(
        "Something went wrong, falling back to manual POIs:",
        error
      );
      // This is a weird thing to do, but at least if something
      // goes wrong with the API during a demo it should still work.
      createPOIs(plekken);
    }
  );
});

// Filter Functionaliteit - disabled class voor de weggefilterde markers
function filterMarkers() {
  markers.forEach(({ element, type }) => {
    if (type !== activeType) {
      element.classList.add("disabled");
    } else {
      element.classList.remove("disabled");
    }
  });
}

// Functie om de mapfilter en markerzichtbaarheid te resetten
function resetMapFilter() {
  // Verwijder de actieve filter op de map-laag
  map.setFilter("camping-map-layer", null); // Vervang 'camping-map-layer' met je eigen laag ID

  // Reset de zichtbaarheid van de markers
  markers.forEach(({ element }) => {
    element.classList.remove("disabled"); // Verwijder de "disabled" klasse van de marker
  });

  // Reset actieve filters of markers
  activeType = "";
  activeMarker = "";
}

function initializeCarousel(carouselSelector) {
  const carousel = document.querySelector(carouselSelector);
  if (!carousel) {
    console.error(
      `Carousel element not found for selector: ${carouselSelector}`
    );
    return;
  }

  const images = carousel.querySelectorAll("img");
  const leftArrow = carousel.querySelector(".arrowIcon--left");
  const rightArrow = carousel.querySelector(".arrowIcon--right");

  let currentIndex = 0;

  const updateCarousel = () => {
    images.forEach((img, index) => {
      img.style.display = index === currentIndex ? "block" : "none";
    });
  };

  if (leftArrow) {
    leftArrow.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    });
  }

  updateCarousel(); // Start met de eerste afbeelding zichtbaar
}
