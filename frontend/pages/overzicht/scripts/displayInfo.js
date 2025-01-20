import { getStateFromStorage } from "../../../state-manager/reservationState.js";

// Functie om klantgegevens in de HTML te tonen
export function displayCustomerInfo() {
  // Haal de opgeslagen state op
  const state = getStateFromStorage();

  if (state.customerInfo) {
    const customerInfo = state.customerInfo;

    displayPaymentMethod(state.paymentMethod);

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
  } else {
    // Als er geen klantgegevens zijn, toon een melding
    document.getElementById("overview").innerHTML =
      "<p>Geen klantgegevens beschikbaar.</p>";
  }
}

function displayPaymentMethod(paymentMethod) {
  const paymentImage = document.getElementById("payment-image");
  const paymentTitle = document.getElementById("payment-title");

  // Controleer welke betaalmethode is geselecteerd
  if (paymentMethod === "Ideal") {
    paymentImage.src = "../assets/ideal.png"; // Het pad naar je afbeelding
    paymentTitle.textContent = "Betalen met iDeal";
  } else if (paymentMethod === "creditCard") {
    paymentImage.src = "../assets/atm-card.png"; // Het pad naar je afbeelding
    paymentTitle.textContent = "Betalen met Creditcard";
  } else if (paymentMethod === "Paypal") {
    paymentImage.src = "../assets/paypal.png"; // Het pad naar je afbeelding
    paymentTitle.textContent = "Betalen met PayPal";
  } else {
    paymentImage.src = ""; // Geen afbeelding als geen geldige methode
    paymentTitle.textContent = "Betalingsmethode onbekend";
  }
}
