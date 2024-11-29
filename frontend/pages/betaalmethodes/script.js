document
  .querySelectorAll(".paypal, .ideal, .maestro, .visa")
  .forEach((item) => {
    item.addEventListener("click", function () {
      // Verwijder de 'selected' klasse van alle betaalmethoden
      document
        .querySelectorAll(".paypal, .ideal, .maestro, .visa")
        .forEach((div) => {
          div.classList.remove("selected");
        });

      // Voeg de 'selected' klasse toe aan de geklikte betaalmethode
      this.classList.add("selected");

      // Checkt als ideal dorpdown activeert moet worden
      if (this.getAttribute("name") == "Ideal") {
        document.querySelector(".dropdownContainer").style.display = "flex";
      } else {
        document.querySelector(".dropdownContainer").style.display = "none";
      }

      // Zet de knop 'Volgende' in staat om ingeschakeld te worden
      document.querySelector(".nextButton").disabled = false;

      // Bewaar de geselecteerde betaalmethode (optioneel)
      const selectedMethod = this.getAttribute("data-method");
      console.log("Gekozen methode:", selectedMethod);
    });
  });

// Zet de 'Volgende' knop weer uitgeschakeld bij laden van de pagina
document.querySelector(".nextButton").disabled = true;
