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
  zoom: 1,
  dragRotate: false, // Schakel rotatie door slepen uit
});

const markers = [];

// Voeg de campingkaartafbeelding als achtergrond toe
map.on("load", function () {
  map.addSource("camping-map", {
    type: "image",
    url: "./map.jpg", // Hier geef je het pad naar jouw campingkaart afbeelding op
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

  // Handmatige campingplekken (Later dynamisch met backend API)
  const plekken = [
    {
      nummer: 1,
      coords: [0.03, 51.35], // Locatie van de eerste campingplek
      naam: "Campingplek 1",
      type: "bungalow",
      prijs: "€20 per nacht",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 2,
      coords: [0.0, 51.38], // Locatie van de tweede campingplek
      naam: "Campingplek 2",
      type: "camping",
      prijs: "€25 per nacht",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 3,
      coords: [0.25, 51.45], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "bungalow",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
  ];

  // Camping plekken dynamisch renderen
  plekken.forEach((plek) => {
    // Maak een custom marker (rondje met een getal)
    const el = document.createElement("div");
    el.className = "custom-marker";
    el.innerHTML = plek.nummer;

    // Voeg de marker toe aan de kaart
    const marker = new mapboxgl.Marker(el)
      .setLngLat(plek.coords) // Marker positie instellen
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // Popup offset om de popup iets van de marker af te plaatsen
          .setLngLat(plek.coords) // Zet de positie van de popup op de locatie van de marker
          .setHTML(
            `<div class='infoCard'>
            <img src='${plek.foto}' />
            <div class='infoCard__content'>
            <h3>Campingplek ${plek.nummer}</h3>
            <p>★★★</p>
            <p>${plek.prijs}</p>
            </div>
              <div class='buttonContainer'>
            <button id='chooseCampingPlaceBtn'>Kies campingplek</button>
            </div>
            </div>`
          )
      )
      .addTo(map); // Marker toevoegen aan de kaart

    // Voegt functionaliteit aan knop
    marker.getPopup().on("open", () => {
      const button = document.querySelector("#chooseCampingPlaceBtn");
      if (button) {
        button.addEventListener("click", () => {
          choosePlace(); // Je custom functie hier uitvoeren
        });
      } else {
        console.error("Knop niet gevonden in de popup");
      }
    });

    //
    markers.push({ marker, element: el, type: plek.type });

    // Voeg een klikgebeurtenis toe aan de marker
    el.addEventListener("click", () => {
      // Verwijder de actieve status van de vorige marker
      if (activeMarker) {
        activeMarker.classList.remove("activeMarker");
      }

      // Stel de nieuwe actieve marker in
      el.classList.add("activeMarker");
      activeMarker = el;

      // Focus op de marker door de kaart te verplaatsen
      map.flyTo({
        center: plek.coords,
        zoom: 10.5, // Zoomniveau bij focus
        essential: true,
        offset: [0, -100], // Adjust the offset (x, y) to move the map center
      });
    });
  });
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
