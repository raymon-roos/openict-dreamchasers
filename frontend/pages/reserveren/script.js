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

// Voorbeeld van geblokkeerde datums (pas aan naar jouw wensen)
const disabledDates = [
  "2024-12-25", // Specifieke datums
  { from: "2024-12-20", to: "2024-12-22" }, // Datums tussen 20 december en 22 december
];

// Functie om datum naar d-m-Y formaat te converteren
function formatDate(date) {
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getFullYear()}`;
}

// Initializeer Flatpickr in inline modus
flatpickr("#calendar", {
  mode: "range",
  inline: true, // Toon de kalender inline
  dateFormat: "d-m-Y", // Formaat: dag-maand-jaar
  minDate: "today", // Start bij vandaag
  disable: disabledDates, // Blokkeer specifieke datums
  locale: {
    firstDayOfWeek: 1, // Week begint op maandag
  },
  onChange: (selectedDates) => {
    const aankomst = document.getElementById("arrive");
    const vertrek = document.getElementById("departure");
    const errorMsg = document.getElementById("error-msg");

    // Reset eventuele foutmelding
    errorMsg.textContent = "";

    // Update de tekst voor aankomst en vertrek
    if (selectedDates.length > 0) {
      aankomst.textContent = formatDate(selectedDates[0]);
    } else {
      aankomst.textContent = "Nog niet geselecteerd";
    }

    if (selectedDates.length > 1) {
      vertrek.textContent = formatDate(selectedDates[1]);
    } else {
      vertrek.textContent = "Nog niet geselecteerd";
    }

    // Controleer of een geblokkeerde datum is geselecteerd
    if (
      selectedDates.some((date) =>
        disabledDates.some((disable) => {
          if (typeof disable === "string") {
            return formatDate(date) === disable; // Vergelijk met string format
          }
          if (disable.from && disable.to) {
            return (
              date >= new Date(disable.from) && date <= new Date(disable.to)
            );
          }
          return false;
        })
      )
    ) {
      errorMsg.textContent =
        "De geselecteerde periode bevat niet-beschikbare datums.";
    }
  },
});
