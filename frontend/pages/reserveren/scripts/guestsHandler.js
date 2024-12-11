// Limieten voor het aantal gasten
const GUEST_LIMITS = {
  adults: { min: 1, max: Infinity }, // Minimaal 1 volwassene, geen bovenlimiet
  children: { min: 0, max: Infinity }, // Geen limiet voor kinderen
  youths: { min: 0, max: Infinity }, // Geen limiet voor jongeren
  babies: { min: 0, max: Infinity }, // Geen limiet voor baby's
};

// Limiet voor huisdieren
const PET_LIMIT = { min: 0, max: 2 }; // Maximaal 2 huisdieren

// Algemene limiet voor het totale aantal gasten
const TOTAL_GUEST_LIMIT = 6; // hardcoded / later naar backend

// Functie om het totale aantal gasten te berekenen
function getTotalGuests() {
  let totalGuests = 0;
  Object.keys(GUEST_LIMITS).forEach((guestType) => {
    const countElement = document.getElementById(guestType);
    totalGuests += parseInt(countElement.textContent);
  });
  return totalGuests;
}

// Functie om knoppen in of uit te schakelen op basis van het aantal gasten
function toggleButtons(countElement, guestType) {
  const currentCount = parseInt(countElement.textContent);
  const limits = guestType === "pets" ? PET_LIMIT : GUEST_LIMITS[guestType];
  const totalGuests = getTotalGuests();

  const minusIcon = countElement.previousElementSibling; // Voor de min-knop
  const plusIcon = countElement.nextElementSibling; // Voor de plus-knop

  // De min-icon uitschakelen als het aantal gasten de minimum waarde bereikt
  if (currentCount <= limits.min) {
    minusIcon.classList.add("disabled");
    minusIcon.style.pointerEvents = "none";
  } else {
    minusIcon.classList.remove("disabled");
    minusIcon.style.pointerEvents = "auto";
  }

  // De plus-icon uitschakelen als het aantal gasten de maximum waarde bereikt of als het totaal aan de limiet zit
  if (
    (guestType !== "pets" &&
      (currentCount >= limits.max || totalGuests >= TOTAL_GUEST_LIMIT)) ||
    (guestType === "pets" && currentCount >= PET_LIMIT.max)
  ) {
    plusIcon.classList.add("disabled");
    plusIcon.style.pointerEvents = "none";
  } else {
    plusIcon.classList.remove("disabled");
    plusIcon.style.pointerEvents = "auto";
  }
}

// Functie om het aantal gasten bij te werken
export function updateGuestCount(countElement, increment, guestType) {
  // Huidige waarde ophalen en naar een getal converteren
  let currentCount = parseInt(countElement.textContent);
  const newCount = currentCount + increment;

  // Haal de limieten voor dit type gast op
  const limits = guestType === "pets" ? PET_LIMIT : GUEST_LIMITS[guestType];
  const totalGuests = getTotalGuests();

  // Controleer of het nieuwe totaal binnen de limieten valt
  if (
    newCount >= limits.min &&
    newCount <= limits.max &&
    (guestType === "pets" || totalGuests + increment <= TOTAL_GUEST_LIMIT)
  ) {
    countElement.textContent = newCount;
  } else if (newCount < limits.min) {
    // Waarschuwing als het aantal lager is dan het minimum
    alert(`Er moet altijd minstens ${limits.min} ${guestType} zijn.`); // (Error Handle)
  } else if (newCount > limits.max) {
    // Waarschuwing als het aantal hoger is dan het maximum per gasttype
    alert(`Het aantal ${guestType} kan niet hoger zijn dan ${limits.max}.`); // (Error Handle)
  } else if (totalGuests + increment > TOTAL_GUEST_LIMIT) {
    // Waarschuwing als het totale aantal gasten de limiet overschrijdt
    alert(
      `Het totale aantal gasten kan niet hoger zijn dan ${TOTAL_GUEST_LIMIT}.` // (Error Handle)
    );
  }

  // Dynamisch de knoppen in- of uitschakelen
  Object.keys(GUEST_LIMITS)
    .concat("pets")
    .forEach((type) => {
      const element = document.getElementById(type);
      toggleButtons(element, type);
    });
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
      const guestType = button.dataset.type; // Haal het type gast op uit data attribuut
      updateGuestCount(countElement, -1, guestType); // Verlaag het aantal met 1
    });
  });

  // Voeg event listeners toe aan alle plus-knoppen
  plusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const countElement = button.previousElementSibling;
      const guestType = button.dataset.type; // Haal het type gast op uit data attribuut
      updateGuestCount(countElement, 1, guestType); // Verhoog het aantal met 1
    });
  });

  // Initialiseer de knoppen status op basis van huidige waarden
  Object.keys(GUEST_LIMITS)
    .concat("pets")
    .forEach((guestType) => {
      const countElement = document.getElementById(guestType);
      toggleButtons(countElement, guestType);
    });
}
