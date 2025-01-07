import { autoFillAddress } from "./scripts/autoFillAddress.js";
import { initializePhoneInputValidation } from "./scripts/phoneInputValidation.js";
import { validator } from "./scripts/inputValidation.js";
import { displayReservationInfo } from "./scripts/displayReservationInfo.js";

// Input validation
initializePhoneInputValidation();

// Vult automatisch adres in als je postcode en huisnummer invult
autoFillAddress();

displayReservationInfo();

// Form submit
document
  .querySelector("#bookingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (validator.isValid) {
      window.location.href = "../betaalmethodes/index.html";
    }
  });
