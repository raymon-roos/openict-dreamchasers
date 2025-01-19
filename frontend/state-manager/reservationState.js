export const initialState = {
  imgSrc: "../assets/campingplek.jpg",
  placeName: "Plek 1",
  rating: "★★★★",
  pricePerNight: 38,
  arriveDate: "1 jul. 2024",
  arrivalTime: "15:00 - 20:00",
  departureDate: "5 jul. 2024",
  departureTime: "10:00",
  stayDuration: "7 nachten",
  guests: {
    adults: 1, // Aantal volwassenen
    youths: 0, // Aantal jongeren
    children: 0, // Aantal kinderen
    babies: 0, // Aantal baby's
    pets: 0,
  },
  totalGuests: 4,
  totalPets: 0, // Aantal huisdieren
  totalPrice: 1482,
  serviceCosts: 32,
  totalDays: 10,
  // Andere gegevens zoals klantinfo kunnen hier worden toegevoegd
  customerInfo: {
    name: "John Doe",
    email: "johndoe@example.com",
  },
};

// Haal de huidige staat op (uit storage of gebruik default state)
export function getStateFromStorage() {
  const savedState =
    sessionStorage.getItem("appState") || localStorage.getItem("appState");
  return savedState ? JSON.parse(savedState) : initialState;
}

// Sla de bijgewerkte staat op in localStorage of sessionStorage
export function saveStateToStorage(state) {
  sessionStorage.setItem("appState", JSON.stringify(state));
  localStorage.setItem("appState", JSON.stringify(state));
}

// Werk de state bij en sla deze op
export function updateState(newState) {
  const currentState = getStateFromStorage(); // Haal de huidige state op
  // Als er een 'guests'-object wordt bijgewerkt, merge het met het bestaande guests-object
  if (newState.guests) {
    newState.guests = {
      ...currentState.guests, // Behoud de bestaande guests
      ...newState.guests, // Update alleen de gewijzigde velden
    };
    return saveStateToStorage({ ...currentState, ...newState }); // Sla de nieuwe state op
  }
  console.log("new");
  const updatedState = { ...currentState, ...newState }; // Werk de state bij
  saveStateToStorage(updatedState); // Sla de nieuwe state op
}
