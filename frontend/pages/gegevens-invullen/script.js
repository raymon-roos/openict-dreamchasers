import { autoFillAddress } from "./scripts/autoFillAddress.js";
import { initializePhoneInputValidation } from "./scripts/phoneInputValidation.js";
import { validator } from "./scripts/inputValidation.js";
import { renderOverviewCard } from "../../components/overviewCard.js";
import { createHeader } from "../../components/headerComponent.js";
import { updateState } from "../../state-manager/reservationState.js";

// Add header component to the DOM
const container = document.querySelector(".container");
const header = createHeader(2);
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
      const customerInfo = {
        name: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        birthdate: document.querySelector("#dob").value,
        email: document.querySelector("#email").value,
        number: document.querySelector("#phoneNumber").value,
        postalCode: document.querySelector("#postalCode").value,
        houseNumber: document.querySelector("#houseNumber").value,
        city: document.querySelector("#cityName").value,
        extension: document.querySelector("#extension").value,
        streetName: document.querySelector("#streetName").value,
        country: document.querySelector("#selectCountry").value,
      };

      updateState({ customerInfo });

      window.location.href = "../betaalmethodes/index.html";
    }
  });
