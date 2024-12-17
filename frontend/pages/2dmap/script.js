// Toggle modal visibility
function toggleModal() {
  const modal = document.querySelector(".filterModal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

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

let activeType = "";

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
            <button>Kies campingplek</button>
            </div>
            </div>`
          )
      )
      .addTo(map); // Marker toevoegen aan de kaart

    markers.push({ marker, element: el, type: plek.type });

    // Voeg een klikgebeurtenis toe aan de marker
    el.addEventListener("click", () => {
      // Focus op de marker door de kaart te verplaatsen
      map.flyTo({
        center: plek.coords,
        zoom: 10, // Zoomniveau bij focus
        essential: true,
        offset: [0, -100], // Adjust the offset (x, y) to move the map center
      });
    });
  });
});

// Filter markers op basis van type
function filterMarkers() {
  console.log("test");
  markers.forEach(({ element, type: markerType }) => {
    if (markerType === activeType) {
      element.classList.add("filtered"); // Verander kleur voor gefilterde markers
    } else {
      element.classList.remove("filtered");
    }
  });
}
