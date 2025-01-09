import { initializeCalendar } from "./calendar.js";
import { addGuestEventListeners } from "./guestsHandler.js";
import { addPersonPickerEventListener } from "./customDropdown.js";
import { calculateAndDisplayCosts } from "./costsHandler.js";
import { initializeCampingInfo } from "./campingInfo.js";
import { createHeader } from "./headerComponent.js";
import { updateState } from "../../../state-manager/reservationState.js";

function main() {
  // Add header component to the DOM
  const container = document.querySelector(".container");
  const header = createHeader();
  container.insertBefore(
    header,
    container.querySelector(".camping-info-header")
  );

  // Calendar
  initializeCalendar();

  // Initializeer camping info
  initializeCampingInfo();

  // Gasten Toevoegen / Verwijderen
  addGuestEventListeners();
  addPersonPickerEventListener();

  // Zet de MutationObserver in voor de relevante inputs
  const observer = new MutationObserver(() => {
    calculateAndDisplayCosts();
  });

  // Voeg observer toe aan elke input die de prijs of andere gegevens bevat
  const outputs = document.querySelectorAll(
    "#adults, #youths, #children, #babies, #pets"
  );
  outputs.forEach((output) => {
    observer.observe(output, {
      childList: true,
      subtree: false,
    });
  });

  // Start de initiële berekening
  calculateAndDisplayCosts();

  const submitButton = document.querySelector(".pay-button");

  // Arriveer en Vertrek Inputs
  const arriveInput = document.getElementById("arrive");
  const departureInput = document.getElementById("departure");

  submitButton.addEventListener("click", () => {
    const arriveDate = arriveInput.value;
    const departureDate = departureInput.value;

    if (arriveDate && departureDate) {
      updateState({ arriveDate, departureDate });
      window.location.href = "../gegevens-invullen/index.html";
    } else {
      console.log("Datums niet");
    }
  });
}

main();
