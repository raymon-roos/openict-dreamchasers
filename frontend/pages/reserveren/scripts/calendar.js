import { updateState } from "../../../state-manager/reservationState.js";
import { calculateAndDisplayCosts } from "./costsHandler.js";
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
  locale: "nl", // Zet de locale naar Nederlands
  timeZone: "Europe/Amsterdam", // Dit is niet standaard ondersteund, maar kan later worden opgelost in de onChange functie

  dateFormat: "Y-m-d",
  minDate: "today",
  disable: unavailableDates,
  onChange: handleDataChange,
};

// Functie om de datum om te zetten naar 'YYYY-MM-DD' in de Nederlandse tijdzone (Europe/Amsterdam)
function formatDateToDutchTimeZone(date) {
  const dateObj = new Date(date);

  // Zet de datum om naar de Nederlandse tijdzone (tijdzoneverschil met UTC)
  const offset = 1; // CET (UTC+1) of CEST (UTC+2) afhankelijk van de tijd van het jaar

  // Pas de tijd aan naar Nederlandse tijd
  dateObj.setHours(dateObj.getHours() + offset);

  // Haal de datum op in 'YYYY-MM-DD' formaat
  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // Maand is 0-gebaseerd
  const day = ("0" + dateObj.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

// Wanneer er geklikt wordt op een datum
function handleDataChange(selectedDates) {
  const arriveElement = document.getElementById("arrive");
  const departureElement = document.getElementById("departure");

  if (!arriveElement || !departureElement) {
    console.error("Kan de DOM-elementen niet vinden");
    return;
  }

  console.log(selectedDates);

  if (selectedDates.length === 2) {
    arriveElement.value = formatDateToDutchTimeZone(selectedDates[0]);
    departureElement.value = formatDateToDutchTimeZone(selectedDates[1]);

    // Bereken het aantal dagen
    const totalDays = calculateTotalDays(selectedDates[0], selectedDates[1]);

    // Sla het aantal dagen op in localStorage
    saveDaysToLocalStorage(totalDays);

    // Display prijzen
    calculateAndDisplayCosts();
  } else if (selectedDates.length === 1) {
    arriveElement.value = formatDateToDutchTimeZone(selectedDates[0]);
    departureElement.value = ""; // Leegmaken als de vertrekdatum nog niet is geselecteerd
  }
}

// Functie om het aantal dagen op te slaan in localStorage
function saveDaysToLocalStorage(totalDays) {
  localStorage.setItem("totalDays", totalDays);
  updateState({ totalDays });
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
