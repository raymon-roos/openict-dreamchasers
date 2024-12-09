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
