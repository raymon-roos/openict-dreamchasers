export const initialState = {
  imgSrc: "campingplek.jpg",
  placeName: "Plek 1",
  rating: "★★★★",
  pricePerNight: 38,
  arriveDate: "1 jul. 2024",
  arrivalTime: "15:00 - 20:00",
  departureDate: "5 jul. 2024",
  departureTime: "10:00",
  stayDuration: "7 nachten",
  guests: {
    adults: 0, // Aantal volwassenen
    youths: 0, // Aantal jongeren
    children: 0, // Aantal kinderen
    babies: 0, // Aantal baby's
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
  const updatedState = { ...currentState, ...newState }; // Werk de state bij
  saveStateToStorage(updatedState); // Sla de nieuwe state op
}
