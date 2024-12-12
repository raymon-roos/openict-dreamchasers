mapboxgl.accessToken =
  "pk.eyJ1IjoiY2VkcmljamFkZW4iLCJhIjoiY20zaWd2eXp4MDBzeDJrc2I3OXl2YXM4NyJ9.5FhoOI_VaE2SwbzPm2Volg";

// Maak de kaart
const map = new mapboxgl.Map({
  container: "map", // Het id van je map-container
  style: "mapbox://styles/mapbox/empty-v9", // Gebruik een lege kaartstijl, geen Mapbox achtergrond
  center: [5.1214, 52.0907], // Beginpositie van de kaart [longitude, latitude]
  attributionControl: false, // Zet de Mapbox-attributie uit, zodat er geen Mapbox-logootje wordt weergegeven'
  zoom: 0,
  pitch: 0, // Zet de pitch op 0 om 3D uit te schakelen
  bearing: 0, // Zet de bearing op 0 om roteren te voorkomen
  dragRotate: false, // Schakel rotatie door slepen uit
  boxZoom: false, // Schakel zoom in met boxen uit
  dragPan: true, // Laat alleen slepen voor pan-instellingen
  touchZoomRotate: false, // Schakel inzoomen met aanraking en draaien uit
  keyboard: false, // Schakel toetsenbordinteractie uit
  doubleClickZoom: false, // Schakel zoom in door dubbelklikken uit
});

// Voeg de campingkaartafbeelding als achtergrond toe
map.on("load", function () {
  // Voeg de campingafbeelding als een source toe
  map.addSource("camping-map", {
    type: "image",
    url: "./map.png", // Hier geef je het pad naar jouw campingkaart afbeelding op
    coordinates: [
      [-0.15, 51.4], // Linksbovenhoek (verplaatsing naar links)
      [0.15, 51.4], // Rechtsbovenhoek (verplaatsing naar rechts)
      [0.15, 51.3], // Rechtsbenedenhoek (verplaatsing naar rechts)
      [-0.15, 51.3], // Linksonderhoek (verplaatsing naar links)
    ],
  });

  map.setMaxBounds([
    [-0.15, 51.3], // Linksonderhoek
    [0.15, 51.4], // Rechtsbovenhoek
  ]);
  // Voeg de afbeelding als laag toe
  map.addLayer({
    id: "camping-map-layer",
    type: "raster",
    source: "camping-map",
    paint: {
      "raster-opacity": 1, // Stel de opacity in op 1 voor volledige zichtbaarheid
    },
  });
});
