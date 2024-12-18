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

      // Checkt als ideal dorpdown activeert moet worden
      if (this.getAttribute("name") == "creditCard") {
        document.querySelector(".maestroContainer").style.display = "flex";
      } else {
        document.querySelector(".maestroContainer").style.display = "none";
      }

      // Zet de knop 'Volgende' in staat om ingeschakeld te worden
      document.querySelector(".disableButton").disabled = false;

      // Bewaar de geselecteerde betaalmethode (optioneel)
      const selectedMethod = this.getAttribute("data-method");
      console.log("Gekozen methode:", selectedMethod);
    });
  });

// Zet de 'Volgende' knop weer uitgeschakeld bij laden van de pagina
document.querySelector(".disableButton").disabled = true;

function blockNumbers(event) {
  // Verkrijg de ingevoerde waarde
  const value = event.target.value;

  // Regexp om cijfers te blokkeren (en dus geen cijfers toe te staan)
  const blockedValue = value.replace(/[0-9]/g, "");

  // Zet de waarde van het invoerveld gelijk aan de waarde zonder cijfers
  event.target.value = blockedValue;
}

function handleInput(event) {
  const cardNumber = event.target.value;
  const result = document.getElementById("validation-result");
  console.log(" Test");
  // Reset de resultaat en boodschap
  result.textContent = "";
  result.style.color = "black";

  // Gebruik card-validator om te controleren welk type kaart het is
  const card = cardValidator.number(cardNumber);
  console.log(card);
  if (!card.isPotentiallyValid) {
    result.textContent = "Invalid card number.";
    result.style.color = "red";
    return;
  }

  // Controleren welk type kaart het is
  const cardType = card.card ? card.card.type : "Unknown";

  // Validatie voor verschillende kaarttypen
  switch (cardType) {
    case "visa":
      if (cardNumber.length === 13 || cardNumber.length === 16) {
        result.textContent = "Valid Visa card number!";
        result.style.color = "green";
      } else {
        result.textContent = "Visa card must be 13 or 16 digits long.";
        result.style.color = "red";
      }
      break;

    case "master-card":
      if (cardNumber.length === 16) {
        console.log(" tess");
        result.textContent = "Valid MasterCard number!";
        result.style.color = "green";
      } else {
        result.textContent = "MasterCard must be 16 digits long.";
        result.style.color = "red";
      }
      break;

    case "maestro":
      if (cardNumber.length >= 12 && cardNumber.length <= 19) {
        result.textContent = "Valid Maestro card number!";
        result.style.color = "green";
      } else {
        result.textContent = "Maestro card must be between 12 and 19 digits.";
        result.style.color = "red";
      }
      break;

    case "amex":
      if (cardNumber.length === 15) {
        result.textContent = "Valid American Express card number!";
        result.style.color = "green";
      } else {
        result.textContent = "American Express card must be 15 digits long.";
        result.style.color = "red";
      }
      break;

    default:
      result.textContent = "Invalid card number.";
      result.style.color = "red";
  }
}

function handleExpiryDate(event) {
  const expiryDate = event.target.value;
  const result = document.getElementById("validation-expiryDate");

  // Controleer of de vervaldatum is ingevuld
  if (!expiryDate) {
    result.textContent = "Vervaldatum is vereist.";
    result.style.color = "red";
    return;
  }

  // Verkrijg de huidige datum
  const currentDate = new Date();
  const [year, month] = expiryDate.split("-"); // Verkrijg het jaar en de maand uit de invoer
  const expiryMonth = parseInt(month, 10);
  const expiryYear = parseInt(year, 10);

  // Controleer of de vervaldatum in de toekomst ligt
  if (
    expiryYear < currentDate.getFullYear() ||
    (expiryYear === currentDate.getFullYear() &&
      expiryMonth < currentDate.getMonth() + 1)
  ) {
    result.textContent = "Vervaldatum is verstreken.";
    result.style.color = "red";
    return;
  }

  result.textContent = "Geldige vervaldatum!";
  result.style.color = "green";
}

// Functie om de CVV te valideren
function handleCVV(event) {
  const cvv = event.target.value;
  const result = document.getElementById("validation-cvv");

  // CVV validatie: 3 cijfers voor de meeste kaarten, 4 cijfers voor American Express
  const cvvRegex = /^\d{3,4}$/;

  if (!cvvRegex.test(cvv)) {
    result.textContent = "Ongeldige CVV. Voer 3 of 4 cijfers in.";
    result.style.color = "red";
    return;
  }

  result.textContent = "Geldige CVV!";
  result.style.color = "green";
}
