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
      coords: [-0.133, 51.245], // Locatie van de eerste campingplek
      naam: "Campingplek 1",
      type: "camping",
      prijs: "€30 per nacht",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 2,
      coords: [-0.08, 51.245], // Locatie van de tweede campingplek
      naam: "Campingplek 2",
      type: "camping",
      prijs: "€30 per nacht",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 3,
      coords: [-0.08, 51.265], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 4,
      coords: [-0.01, 51.265], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 5,
      coords: [-0.01, 51.245], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 6,
      coords: [0.02, 51.245], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 7,
      coords: [0.05, 51.245], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 8,
      coords: [0.04, 51.265], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 9,
      coords: [0.127, 51.27], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 10,
      coords: [0.127, 51.245], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 11,
      coords: [0.16, 51.245], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 12,
      coords: [-0.09, 51.39], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 13,
      coords: [-0.09, 51.375], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 14,
      coords: [-0.1, 51.345], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 15,
      coords: [-0.08, 51.329], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 16,
      coords: [-0.07, 51.345], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 17,
      coords: [-0.06, 51.38], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 18,
      coords: [-0.05, 51.395], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 19,
      coords: [-0.01, 51.375], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 20,
      coords: [-0.03, 51.362], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 21,
      coords: [-0.02, 51.345], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 22,
      coords: [0.01, 51.34], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 23,
      coords: [0.04, 51.343], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 24,
      coords: [0.04, 51.361], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 25,
      coords: [0.04, 51.38], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 26,
      coords: [0.04, 51.397], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 27,
      coords: [0.081, 51.38], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 28,
      coords: [0.084, 51.362], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 29,
      coords: [0.091, 51.345], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 30,
      coords: [0.12, 51.345], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 31,
      coords: [0.15, 51.346], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 32,
      coords: [0.158, 51.364], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 33,
      coords: [0.158, 51.383], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 34,
      coords: [0.145, 51.4], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 35,
      coords: [-0.119, 51.445], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 36,
      coords: [-0.09, 51.456], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 37,
      coords: [-0.055, 51.457], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 38,
      coords: [0.015, 51.457], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 39,
      coords: [0.065, 51.457], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 40,
      coords: [0.12, 51.458], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 41,
      coords: [0.155, 51.458], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 42,
      coords: [0.194, 51.455], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€30 per nacht",
      type: "camping",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 43,
      coords: [0.24, 51.455], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€60 per nacht",
      type: "bungalow",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 44,
      coords: [0.285, 51.455], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€60 per nacht",
      type: "bungalow",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 45,
      coords: [0.24, 51.428], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€60 per nacht",
      type: "bungalow",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 46,
      coords: [0.285, 51.428], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€60 per nacht",
      type: "bungalow",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 47,
      coords: [0.238, 51.365], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€60 per nacht",
      type: "bungalow",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 48,
      coords: [0.285, 51.365], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€60 per nacht",
      type: "bungalow",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 49,
      coords: [0.22, 51.248], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€60 per nacht",
      type: "bungalow",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 50,
      coords: [0.27, 51.248], // Locatie van de derde campingplek
      naam: "Campingplek 3",
      prijs: "€60 per nacht",
      type: "bungalow",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 1,
      coords: [0.142, 51.445], // Locatie van de derde campingplek
      naam: "toilet",
      type: "icon",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 2,
      coords: [0.265, 51.335], // Locatie van de derde campingplek
      naam: "toilet",
      type: "icon",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 3,
      coords: [-0.18, 51.375], // Locatie van de derde campingplek
      naam: "toilet",
      type: "icon",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 1,
      coords: [-0.15, 51.295], // Locatie van de derde campingplek
      naam: "washer",
      type: "icon",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 1,
      coords: [-0.217, 51.27], // Locatie van de derde campingplek
      naam: "restaurant",
      type: "icon",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
    {
      nummer: 1,
      coords: [-0.243, 51.255], // Locatie van de derde campingplek
      naam: "reception",
      type: "icon",
      foto: "./placeholderCamping.jpg", // Pad naar de afbeelding van de plek
    },
  ];

  // Camping plekken dynamisch renderen
  plekken.forEach((plek) => {
    const el = document.createElement("div"); // Container voor elke marker
    const circle = document.createElement("div"); // Cirkel voor icoon

    // Voeg de juiste klasse toe voor het type marker
    if (plek.type === "bungalow") {
      el.className = "marker custom-marker-bungalow";
      circle.className = "circle";
      el.innerHTML = plek.nummer; // Zet het nummer direct in de cirkel
    } else if (plek.type === "camping") {
      el.className = "marker custom-marker";
      circle.className = "circle";
      el.innerHTML = plek.nummer; // Zet het nummer direct in de cirkel
    } else if (plek.type === "icon") {
      el.className = "marker icon-marker";
      circle.className = "circle";

      // Voer de juiste icoon in op basis van de naam van de marker
      const icon = document.createElement("i");

      // Hier bepalen we welk icoon bij deze marker hoort, gebaseerd op de naam
      if (plek.naam === "restaurant") {
        icon.className = "fa-solid fa-utensils"; // Restaurant
      } else if (plek.naam === "toilet") {
        icon.className = "fa-solid fa-restroom"; // Toilet
      } else if (plek.naam === "washer") {
        icon.className = "fa-solid fa-tshirt"; // Wasmachine
      } else if (plek.naam === "reception") {
        icon.className = "fa-solid fa-info";
      }

      circle.appendChild(icon); // Voeg het icoon toe aan de cirkel
      el.appendChild(circle);

      // Voeg de pijl naar beneden toe buiten de cirkel
      const arrowIcon = document.createElement("i");
      arrowIcon.className = "fa-solid fa-arrow-down arrow-down-icon";
      el.appendChild(arrowIcon);
    }

    // Voeg de marker toe aan de kaart
    const marker = new mapboxgl.Marker(el)
      .setLngLat(plek.coords) // Marker positie instellen
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // Popup offset om de popup iets van de marker af te plaatsen
          .setLngLat(plek.coords) // Zet de positie van de popup op de locatie van de marker
          .setHTML(
            plek.type === "icon"
              ? // Popup voor de icon-markers (zoals toilet, restaurant, wasmachine)
                plek.naam === "toilet"
                ? `<div class='infoCard'>
                      <img src='${plek.foto}' />
                      <div class='infoCard__content'>
                        <h3>Toilet ${plek.nummer}</h3>
                        <p>Onze toiletten zijn schoon, goed onderhouden en 24/7 toegankelijk. Ze zijn uitgerust met gratis toiletpapier, zeep en handdroging. Ideaal voor een comfortabel verblijf!</p>
                        <div>6x <i class="fa-solid fa-shower"></i> | 6x <i class="fa-solid fa-toilet"></i></div>
                      </div>
                    </div>`
                : plek.naam === "restaurant"
                ? `<div class='infoCard'>
                      <img src='${plek.foto}' />
                      <div class='infoCard__content'>
                        <h3>Restaurant ${plek.nummer}</h3>
                        <p>Geniet van een heerlijke maaltijd in ons gezellige restaurant. We bieden lokale gerechten en dagelijkse specials aan voor een smaakvolle ervaring!</p>
                        <div><i class="fa-solid fa-utensils"></i></div>
                      </div>
                    </div>`
                : plek.naam === "washer"
                ? `<div class='infoCard'>
                      <img src='${plek.foto}' />
                      <div class='infoCard__content'>
                        <h3>Wasmachine ${plek.nummer}</h3>
                        <p>6 wasmachines en 6 drogers, 24/7 beschikbaar voor een snelle en efficiënte wasbeurt tijdens je verblijf.</p>
                      </div>
                    </div>`
                : plek.naam === "reception"
                ? `<div class='infoCard'>
  <img src='${plek.foto}' />
  <div class='infoCard__content'>
    <h3>Receptie ${plek.nummer}</h3>
    <p>Onze receptie is 24/7 geopend voor al je vragen, reserveringen en hulp tijdens je verblijf. Hier kun je ook extra voorzieningen aanvragen en informatie krijgen over de omgeving.</p>
  </div>
</div>`
                : ""
              : // Popup voor andere markers zoals campingplek en bungalow
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
