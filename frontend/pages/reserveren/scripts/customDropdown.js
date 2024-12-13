// Functie om de Dropdown te openen of te sluiten
export function toggleCustomDropdown(personPicker, personPickerDropdown) {
  const img = personPicker.querySelector(".personPickerArrowIcon");

  // Voeg of verwijder de 'rotated' klasse voor de pijl
  img.classList.toggle("rotated");

  // Check of de Dropdown zichtbaar is, en pas de display en visibiliteit aan
  if (personPickerDropdown.classList.contains("visible")) {
    personPickerDropdown.classList.remove("visible");

    setTimeout(() => {
      personPickerDropdown.style.display = "none";
    }, 300); // Zorg ervoor dat deze duur overeenkomt met je CSS-transitie
  } else {
    personPickerDropdown.style.display = "flex";

    setTimeout(() => {
      personPickerDropdown.classList.add("visible");
    }, 10); // Vertraging voor transitie-effecten
  }
}

// Functie om de event listener toe te voegen
export function addPersonPickerEventListener() {
  const personPicker = document.querySelector(".personPicker");
  const personPickerDropdown = document.querySelector(
    ".personPicker__customDropdown"
  );

  if (personPicker && personPickerDropdown) {
    personPicker.addEventListener("click", () =>
      toggleCustomDropdown(personPicker, personPickerDropdown)
    );
  } else {
    console.error("Person picker Dropdown elementen niet gevonden.");
  }
}
