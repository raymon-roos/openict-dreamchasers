export function initialiseBirthdate() {
  // Verkrijg de huidige datum
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // Maanden zijn 0-gebaseerd
  const currentDay = today.getDate();

  // Het minimumjaar voor een leeftijd van 16 jaar (16 jaar geleden)
  const minYear = currentYear - 16;
  const maxYear = 1900;

  const daySelect = document.querySelector("#day");
  const monthSelect = document.querySelector("#month");
  const yearSelect = document.querySelector("#year");

  // Functie om te controleren of een jaar een schrikkeljaar is
  function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  // Populeer de maanden
  const months = [
    "Januari",
    "Februari",
    "Maart",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
    "December",
  ];
  months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index + 1; // Maanden beginnen vanaf 1
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  // Populeer de jaren van 2007 naar 1950
  for (let i = minYear; i >= maxYear; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }

  // Functie om de dagen te updaten op basis van het geselecteerde jaar en maand
  function updateDays() {
    const selectedMonth = monthSelect.value;
    const selectedYear = yearSelect.value;

    // Verwijder de huidige dagopties
    daySelect.innerHTML = "";

    // Aantal dagen in de geselecteerde maand
    let daysInMonth = 31;
    if (selectedMonth == 2) {
      daysInMonth = isLeapYear(selectedYear) ? 29 : 28; // Februari (schrikkeljaar of niet)
    } else if (
      selectedMonth == 4 ||
      selectedMonth == 6 ||
      selectedMonth == 9 ||
      selectedMonth == 11
    ) {
      daysInMonth = 30;
    }

    // Populeer de dagen
    for (let i = 1; i <= daysInMonth; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      daySelect.appendChild(option);
    }
  }

  // Trigger update van dagen wanneer maand of jaar wordt geselecteerd
  monthSelect.addEventListener("change", updateDays);
  yearSelect.addEventListener("change", updateDays);

  // Initieel de dagen bijwerken
  updateDays();
}
