// Functie om de modal te openen of te sluiten
export function togglePersonPickerModal(personPicker, personPickerModal) {
  const img = personPicker.querySelector(".personPickerArrowIcon");

  // Voeg of verwijder de 'rotated' klasse voor de pijl
  img.classList.toggle("rotated");

  // Check of de modal zichtbaar is, en pas de display en visibiliteit aan
  if (personPickerModal.classList.contains("visible")) {
    personPickerModal.classList.remove("visible");

    setTimeout(() => {
      personPickerModal.style.display = "none";
    }, 300); // Zorg ervoor dat deze duur overeenkomt met je CSS-transitie
  } else {
    personPickerModal.style.display = "flex";

    setTimeout(() => {
      personPickerModal.classList.add("visible");
    }, 10); // Vertraging voor transitie-effecten
  }
}

// Functie om de event listener toe te voegen
export function addPersonPickerEventListener() {
  const personPicker = document.querySelector(".personPicker");
  const personPickerModal = document.querySelector(".personPicker__modal");

  if (personPicker && personPickerModal) {
    personPicker.addEventListener("click", () =>
      togglePersonPickerModal(personPicker, personPickerModal)
    );
  } else {
    console.error("Person picker modal elementen niet gevonden.");
  }
}
