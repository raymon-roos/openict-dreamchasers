import { getStateFromStorage } from "../../../state-manager/reservationState.js";

export function displayCustomerInfo() {
  // Haal de opgeslagen state op
  const state = getStateFromStorage();
  console.log(state);

  document.getElementById("arrivalDate").textContent = state.arriveDate;
  document.getElementById("departureDate").textContent = state.departureDate;
  document.getElementById(
    "totalGuests"
  ).textContent = `Totaal aantal personen: ${state.totalGuests}`;

  if (state.guests) {
    const guests = state.guests;

    // Vul de HTML-elementen met de gegevens uit de state
    document.getElementById("adults").textContent = guests.adults;
    document.getElementById("youths").textContent = guests.youths;
    document.getElementById("children").textContent = guests.children;
    document.getElementById("babies").textContent = guests.babies;
    const petsText =
      guests.pets && guests.pets.length === 1 ? "1 huisdier" : "huisdieren";
    document.getElementById("pets").textContent = `${guests.pets} ${petsText}`;
  }

  if (state.customerInfo) {
    const customerInfo = state.customerInfo;
    console.log(customerInfo);
    // Vul de HTML-elementen met de gegevens uit de state
    document.getElementById(
      "name"
    ).textContent = `${customerInfo.name} ${customerInfo.lastName}`;
    document.getElementById("email").textContent = customerInfo.email;
    document.getElementById("number").textContent = customerInfo.number;
    document.getElementById(
      "street"
    ).textContent = `${customerInfo.streetName} ${customerInfo.houseNumber} ${customerInfo.extension}`;
    document.getElementById(
      "street2"
    ).textContent = `${customerInfo.postalCode} ${customerInfo.city}`;
    document.getElementById("country").textContent = customerInfo.country;
    document.getElementById("date").textContent = customerInfo.birthdate;
  } else {
    // Als er geen klantgegevens zijn, toon een melding
  }
}
