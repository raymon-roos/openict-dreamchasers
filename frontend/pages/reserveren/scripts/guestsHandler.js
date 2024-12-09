// Functie om het aantal gasten bij te werken
export function updateGuestCount(countElement, increment) {
  // Huidige waarde ophalen en naar een getal converteren
  let currentCount = parseInt(countElement.textContent);
  const newCount = currentCount + increment;

  // Zorg ervoor dat het aantal niet onder 0 komt
  if (newCount >= 0) {
    countElement.textContent = newCount;
  }
}

// Functie om event listeners toe te voegen aan alle knoppen
export function addGuestEventListeners() {
  // Selecteer alle minus- en plusknoppen
  const minusButtons = document.querySelectorAll(".minus");
  const plusButtons = document.querySelectorAll(".plus");

  // Voeg event listeners toe aan alle minus-knoppen
  minusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const countElement = button.nextElementSibling;
      updateGuestCount(countElement, -1); // Verlaag het aantal met 1
    });
  });

  // Voeg event listeners toe aan alle plus-knoppen
  plusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const countElement = button.previousElementSibling;
      updateGuestCount(countElement, 1); // Verhoog het aantal met 1
    });
  });
}
