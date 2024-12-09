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
    arriveElement.textContent = selectedDates[0].toLocaleDateString();
    departureElement.textContent = selectedDates[1].toLocaleDateString();
  } else if (selectedDates.length === 1) {
    arriveElement.textContent = selectedDates[0].toLocaleDateString();
    departureElement.textContent = "Nog niet geselecteerd";
  }
}
