let currentIndex = 0;

const images = document.querySelectorAll(".camping-img");
const dotsNavigation = document.querySelector(".dots-navigation");

const createDots = () => {
  dotsNavigation.innerHTML = ""; // Leegmaken dots-container

  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => showImage(i)); // Klikbare dot
    dotsNavigation.appendChild(dot);
  });
};

const showImage = (index) => {
  currentIndex = (index + images.length) % images.length;
  images.forEach((img, i) => {
    img.style.display = i === currentIndex ? "block" : "none";
  });
  updateDots();
};

const updateDots = () => {
  const dots = dotsNavigation.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.style.display =
      Math.abs(i - currentIndex) < 3 ? "inline-block" : "none"; // Max 3 dots zichtbaar
    dot.classList.toggle("active", i === currentIndex); // Actieve dot markeren
  });
};

document
  .querySelector(".next")
  .addEventListener("click", () => showImage(currentIndex + 1));
document
  .querySelector(".prev")
  .addEventListener("click", () => showImage(currentIndex - 1));

// Initialiseren
createDots();
showImage(currentIndex);
// Selecteer alle tabs
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    // Verwijder 'actief' van alle tabs en inhoud
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("activeTab"));
    document
      .querySelectorAll(".content")
      .forEach((content) => content.classList.remove("active-content"));

    // Voeg 'actief' toe aan de geklikte tab en bijbehorende inhoud
    tab.classList.add("activeTab");
    const contentId = tab.getAttribute("data-content");
    document.getElementById(contentId).classList.add("active-content");
  });
});

//
// //////////////////////////////////////////////////////////////////
//
//

// Dynamische kosten

function init() {
  // Zet de MutationObserver in voor de relevante spans
  const observer = new MutationObserver(() => {
    calculateAndDisplayCosts();
  });

  // Voeg observer toe aan elke span die de prijs of andere gegevens bevat
  const spans = document.querySelectorAll(
    "#adults, #youths, #children, #babies, #pets"
  );
  spans.forEach((span) => {
    observer.observe(span, {
      childList: true, // Luister naar veranderingen in de tekstinhoud
      subtree: true, // Luister naar veranderingen in de hele subtree
    });
  });

  // Start de initiële berekening
  calculateAndDisplayCosts();
}

function calculateCosts(
  days,
  basePrice,
  adults,
  youths,
  children,
  babies,
  pets
) {
  return {
    adults: { totalAdults: adults, adultsCosts: adults * basePrice * days },
    youths: {
      totalYouths: youths,
      youthsCosts: youths * (basePrice * 0.75) * days,
    },
    children: {
      totalChildren: children,
      childrenCosts: children * (basePrice * 0.5) * days,
    },
    babies: {
      totalBabies: babies,
      babiesCosts: babies * (basePrice * 0) * days,
    },
    pets: {
      totalPets: pets,
      petsCosts: pets * basePrice * days,
    },
  };
}

function displayCosts(costs) {
  // Tel alle kosten op
  const totalCosts =
    costs.adults.adultsCosts +
    costs.youths.youthsCosts +
    costs.children.childrenCosts +
    costs.babies.babiesCosts +
    costs.pets.petsCosts;

  document.getElementById("total-price").textContent = totalCosts;
}

function calculateAndDisplayCosts() {
  // Haal alle inputs/informatie op
  let days = 8;
  let basePrice =
    Number(document.getElementById("camping-price").innerText) || 0;
  let adults = Number(document.getElementById("adults").innerText) || 0;
  let youths = Number(document.getElementById("youths").innerText) || 0;
  let children = Number(document.getElementById("children").innerText) || 0;
  let babies = Number(document.getElementById("babies").innerText) || 0;
  let pets = Number(document.getElementById("pets").innerText) || 0;

  // Bereken kosten
  let costs = calculateCosts(
    days,
    basePrice,
    adults,
    youths,
    children,
    babies,
    pets
  );

  // Display kosten
  displayCosts(costs);
}

init();

//
// //////////////////////////////////////////////////////////////////
//
//

// Open / Sluit Modal Gasten

let = personPicker = document.querySelector(".personPicker");

personPicker.addEventListener("click", () => {
  const personPickerModal = document.querySelector(".personPicker__modal");

  const img = personPicker.querySelector(".personPickerArrowIcon"); // Select the image inside the div
  img.classList.toggle("rotated"); // Toggle the 'rotated' class

  if (personPickerModal.classList.contains("visible")) {
    // Verberg de modal
    personPickerModal.classList.remove("visible");

    setTimeout(() => {
      personPickerModal.style.display = "none"; // Verwijder flex na animatie
    }, 300); // Animatieduur moet overeenkomen met de CSS-transitie
  } else {
    // Toon de modal
    personPickerModal.style.display = "flex"; // Voeg flex toe

    setTimeout(() => {
      personPickerModal.classList.add("visible");
    }, 10); // Vertraging voor het activeren van transities
  }
});

//
// //////////////////////////////////////////////////////////////////
//
//

// Gasten toevoegen / verwijderen

// Select all minus and plus buttons
const minusButtons = document.querySelectorAll(".minus");
const plusButtons = document.querySelectorAll(".plus");

// Function to update the count
function updateGuestCount(countElement, increment) {
  let currentCount = parseInt(countElement.textContent);
  const newCount = currentCount + increment;

  // Ensure count doesn't go below 0
  if (newCount >= 0) {
    countElement.textContent = newCount;
  }
}

// Add event listeners to all minus buttons
minusButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const countElement = button.nextElementSibling;
    updateGuestCount(countElement, -1);
  });
});

// Add event listeners to all plus buttons
plusButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const countElement = button.previousElementSibling;
    updateGuestCount(countElement, 1);
  });
});

//
// //////////////////////////////////////////////////////////////////
//
//

// Calendar

document.addEventListener("DOMContentLoaded", function () {
  const unavailableDates = [
    "2024-12-10",
    "2024-12-15",
    { from: "2024-12-20", to: "2024-12-25" }, // Een bereik van onbeschikbare datums
  ];

  // Stap 1: Initialiseer Flatpickr
  flatpickr("#calendar", {
    mode: "range", // Schakel de modus 'range' in voor een aankomst- en vertrekdatum
    inline: true, // Toon de kalender inline (in de container)
    dateFormat: "Y-m-d", // Formatteer de datums als 'Jaar-Maand-Dag'
    minDate: "today", // Blokkeer datums vóór vandaag
    disable: unavailableDates, // Voeg onbeschikbare datums toe
    onChange: function (selectedDates) {
      const arriveElement = document.getElementById("arrive");
      const departureElement = document.getElementById("departure");

      if (selectedDates.length === 2) {
        // Toon correcte datums
        arriveElement.textContent = selectedDates[0].toLocaleDateString();
        departureElement.textContent = selectedDates[1].toLocaleDateString();
      } else if (selectedDates.length === 1) {
        // Toon alleen de aankomstdatum als vertrekdatum nog niet is gekozen
        arriveElement.textContent = selectedDates[0].toLocaleDateString();
        departureElement.textContent = "Nog niet geselecteerd";
      }
    },
  });
});
