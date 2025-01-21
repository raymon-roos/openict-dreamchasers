import { getStateFromStorage } from "../../../state-manager/reservationState.js";

function formatBirthdate(birthdate) {
  if (!birthdate) return "Geboortedatum niet beschikbaar";
  const date = new Date(birthdate);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("nl-NL", options);
}

export function displayCustomerInfo() {
  // Haal de opgeslagen state op
  const state = getStateFromStorage();
  console.log(state);

  // Functie om datum te formatteren
  function formatDate(dateString) {
    if (!dateString) return "Datum niet beschikbaar";
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("nl-NL", options);
  }

  // Data ophalen en formatteren
  const arrivalDate = formatDate(state.arriveDate);
  const departureDate = formatDate(state.departureDate);

  // Waarden tonen in de juiste HTML-elementen
  document.getElementById("arrivalDate").textContent = arrivalDate;
  document.getElementById("departureDate").textContent = departureDate;

  document.getElementById(
    "totalGuests"
  ).textContent = `Totaal aantal personen: ${state.totalGuests}`;
  document.getElementById("boekerNaamH1").textContent = state.customerInfo.name;

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
    // Functie om geboortedatum te formatteren

    // Haal de geboortedatum op en formatteer deze
    const formattedBirthdate = formatBirthdate(customerInfo.birthdate);

    // Toon de geboortedatum in het juiste HTML-element
    document.getElementById("date").textContent = formattedBirthdate;
  } else {
    // Als er geen klantgegevens zijn, toon een melding
  }
}
