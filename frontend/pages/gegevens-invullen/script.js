import { autoFillAddress } from "./scripts/autoFillAddress.js";
import { initializePhoneInputValidation } from "./scripts/phoneInputValidation.js";
import { validator } from "./scripts/inputValidation.js";
import { renderOverviewCard } from "../../components/overviewCard.js";
import { createHeader } from "../../components/headerComponent.js";

// Add header component to the DOM
const container = document.querySelector(".container");
const header = createHeader();
container.insertBefore(header, container.querySelector(".mainContainer"));

// Input validation
initializePhoneInputValidation();

// Vult automatisch adres in als je postcode en huisnummer invult
autoFillAddress();

// Initial Render OverviewCard
renderOverviewCard("overviewCard");

// Form submit
document
  .querySelector("#bookingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (validator.isValid) {
      window.location.href = "../betaalmethodes/index.html";
    }
  });
