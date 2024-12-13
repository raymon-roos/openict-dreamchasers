import { initializeCalendar } from "./calendar.js";
import { addGuestEventListeners } from "./guestsHandler.js";
import { addPersonPickerEventListener } from "./customDropdown.js";
import { calculateAndDisplayCosts } from "./costsHandler.js";
import { initializeCampingInfo } from "./campingInfo.js";

function main() {
  // Calendar
  initializeCalendar();

  // Gasten Toevoegen / Verwijderen
  addGuestEventListeners();
  addPersonPickerEventListener();

  // Initializeer camping info
  initializeCampingInfo();

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
}

main();
