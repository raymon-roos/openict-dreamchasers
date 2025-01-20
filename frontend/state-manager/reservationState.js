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
  paymentMethod: "iDeal",
  // Andere gegevens zoals klantinfo kunnen hier worden toegevoegd
  customerInfo: {
    name: "John",
    lastName: "Doe",
    birthdate: "01-01-2000",
    email: "johndoe@example.com",
    number: "0612345678",
    postalCode: "1234AB",
    houseNumber: "1",
    city: "Amsterdam",
    country: "Nederland",
    extension: "155",
    streetName: "Amsterdamseweg",
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

export function updateState(newState) {
  const currentState = getStateFromStorage(); // Haal de huidige state op

  // Update specifieke objecten in de state
  if (newState.customerInfo) {
    newState.customerInfo = {
      ...currentState.customerInfo, // Behoud bestaande customerInfo
      ...newState.customerInfo, // Update gewijzigde velden
    };
  }

  if (newState.guests) {
    newState.guests = {
      ...currentState.guests, // Behoud bestaande guests
      ...newState.guests, // Update gewijzigde velden
    };
  }

  // Algemene state update
  const updatedState = { ...currentState, ...newState };

  // Sla de bijgewerkte state op
  saveStateToStorage(updatedState);
}
