import { autoFillAddress } from "./scripts/autoFillAddress.js";
import { initializePhoneInputValidation } from "./scripts/phoneInputValidation.js";
import { initialiseBirthdate } from "./scripts/birthdate.js";

// Validatie van de geboortedatum: controleren of de geselecteerde datum resulteert in een leeftijd van 16 jaar of ouder
const validator = new JustValidate("#bookingForm");

validator
  .addField("#firstName", [
    {
      rule: "required",
      errorMessage: "Vul je voornaam in",
    },
  ])
  .addField("#lastName", [
    {
      rule: "required",
      errorMessage: "Vul je achternaam in.",
    },
  ])
  .addField("#email", [
    {
      rule: "email",
      errorMessage: "Vul een geldig e-mailadres in.",
    },
    {
      rule: "required",
      errorMessage: "Vul een e-mail adres in.",
    },
  ])
  .addField("#day", [
    {
      rule: "required",
      errorMessage: "Kies een dag",
    },
  ])
  .addField("#month", [
    {
      rule: "required",
      errorMessage: "Kies een maand",
    },
  ])
  .addField("#year", [
    {
      rule: "required",
      errorMessage: "Kies een jaar",
    },
  ])
  .addField("#date", [
    {
      validator: function () {
        const selectedDay = parseInt(daySelect.value);
        const selectedMonth = parseInt(monthSelect.value);
        const selectedYear = parseInt(yearSelect.value);

        // Bereken het verschil in jaren
        let age = currentYear - selectedYear;
        if (
          currentMonth < selectedMonth ||
          (currentMonth === selectedMonth && currentDay < selectedDay)
        ) {
          age--;
        }

        // Controleer of de gebruiker minimaal 16 jaar oud is
        if (age < 16) {
          return false; // Foutmelding als de leeftijd minder dan 16 is
        }
        return true; // Geldig als de leeftijd 16 of ouder is
      },
      errorMessage: "Je moet minimaal 16 jaar oud zijn om je in te schrijven.",
    },
  ]);

// Input validation

// Birth date data
initialiseBirthdate();

// Telefoon validatie
initializePhoneInputValidation();

// Vult automatisch adres in als je postcode en huisnummer invult
autoFillAddress();
