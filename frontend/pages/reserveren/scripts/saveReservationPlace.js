import { updateState } from "../../../state-manager/reservationState.js";

const submitButton = document.querySelector(".pay-button");

// Arriveer en Vertrek Inputs
const arriveInput = document.getElementById("arrive");
const departureInput = document.getElementById("departure");

// Aantal gasten per categorie
const pickers = document.querySelectorAll(".picker");

// Sla alle gasten en totaal aantal gasten op
function savePickerData() {
  const pickerData = [{ totalGuests: 0 }, { guests: [] }];

  // Loop door elke picker
  pickers.forEach((picker) => {
    // Haal de gegevens uit de picker op
    const pickerType = picker.dataset.type; // Typenaam (bijv. "adults")
    const pricePerNight = picker.querySelector(".price-per-night").textContent; // Prijs
    const count = picker.querySelector(".person-control p").textContent; // Aantal personen
    // Controleer of alle gegevens beschikbaar zijn

    if (pickerType && pricePerNight && count) {
      pickerData[1].guests.push({
        type: pickerType, // Engels opslaan (via data attribuut)
        pricePerNight: pricePerNight, // Bijv. "€35.00/nacht"
        count: parseInt(count), // Aantal personen als een getal
      });
      pickerData[0].totalGuests += parseInt(count);
    }
  });

  if (pickerData) {
    localStorage.setItem("totalGuests", JSON.stringify(pickerData));
  }
}

submitButton.addEventListener("click", () => {
  const arriveDate = arriveInput.value;
  const departureDate = departureInput.value;

  savePickerData();

  if (arriveDate && departureDate) {
    updateState({ arriveDate, departureDate });
    localStorage.setItem("arriveDate", arriveDate);
    localStorage.setItem("departureDate", departureDate);
    window.location.href = "../gegevens-invullen/index.html";
  } else {
    console.log("Datums niet");
  }
});
