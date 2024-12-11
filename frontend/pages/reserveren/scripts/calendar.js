import { calculateAndDisplayCosts } from "./costsHandler.js";

// Calendar Init
export function initializeCalendar() {
  flatpickr("#calendar", calendarConfig);
}

// API-aanroep om onbeschikbare datums op te halen (met async/await)
export async function getUnavailableDatesFromAPI() {
  try {
    const response = await fetch("/api/unavailable-dates");
    if (!response.ok) {
      throw new Error(
        "Netwerkfout bij het ophalen van de onbeschikbare datums."
      );
    }
    const data = await response.json();
    return data; // De data kan een array zijn van datums of objecten met bereik
  } catch (error) {
    console.error("Fout bij het ophalen van de onbeschikbare datums:", error);
    // Fallback: Hardcoded datums
    return [
      "2024-12-10",
      "2024-12-15",
      { from: "2024-12-20", to: "2024-12-25" },
    ];
  }
}

// (Hardcoded Data) later met API functions
const unavailableDates = [
  "2024-12-10",
  "2024-12-15",
  { from: "2024-12-20", to: "2024-12-25" },
];

// Flatpickr Config
const calendarConfig = {
  mode: "range",
  inline: true,
  dateFormat: "Y-m-d",
  minDate: "today",
  disable: unavailableDates,
  onChange: handleDataChange,
};

// Wanneer er geklikt wordt op een datum
function handleDataChange(selectedDates) {
  const arriveElement = document.getElementById("arrive");
  const departureElement = document.getElementById("departure");

  if (!arriveElement || !departureElement) {
    console.error("Kan de DOM-elementen niet vinden");
    return;
  }

  if (selectedDates.length === 2) {
    arriveElement.value = selectedDates[0].toISOString().split("T")[0]; // Datum in 'YYYY-MM-DD'-formaat
    departureElement.value = selectedDates[1].toISOString().split("T")[0];

    // Bereken het aantal dagen
    const totalDays = calculateTotalDays(selectedDates[0], selectedDates[1]);

    // Sla het aantal dagen op in localStorage
    saveDaysToLocalStorage(totalDays);

    // Display prijzen
    calculateAndDisplayCosts();

    // Select eerste date
  } else if (selectedDates.length === 1) {
    arriveElement.value = selectedDates[0].toISOString().split("T")[0];
    departureElement.value = ""; // Leegmaken als de vertrekdatum nog niet is geselecteerd
  }
}

// Functie om het aantal dagen op te slaan in localStorage
function saveDaysToLocalStorage(totalDays) {
  localStorage.setItem("totalDays", totalDays);
  console.log(`Totaal aantal dagen opgeslagen in localStorage: ${totalDays}`);
}

// Functie voor het berekenen van het aantal dagen
function calculateTotalDays(startDate, endDate) {
  // Zet de datums om naar Date objecten
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Bereken het verschil in milliseconden
  const timeDifference = end - start;

  // Zet het verschil om naar dagen
  const totalDays = timeDifference / (1000 * 3600 * 24);

  return totalDays;
}
