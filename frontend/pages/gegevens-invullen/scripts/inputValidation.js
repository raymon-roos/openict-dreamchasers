const validator = new JustValidate("#bookingForm", {
  showErrors: true, // Houd de globale validatie-instellingen aan
});

validator
  .addField("#firstName", [
    {
      rule: "required",
      errorMessage: "Vul je naam in.",
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
      rule: "required",
      errorMessage: "Vul je email in.",
    },
    {
      rule: "email",
      errorMessage: "Email is niet geldig.",
    },
  ])
  .addField("#confirm-email", [
    {
      rule: "required",
      errorMessage: "Bevestig je e-mailadres.",
    },
    {
      validator: (value, fields) => {
        // Haal waarde van het eerste veld op
        const emailField = fields["#email"];
        if (emailField && emailField.isValid) {
          return value === emailField.elem.value; // Vergelijk alleen bij geldige waarde
        }
        return true; // Skip validatie als eerste veld nog niet geldig is
      },
      errorMessage: "E-mailadressen komen niet overeen.",
    },
  ])
  .addField("#dob", [
    {
      rule: "required",
      errorMessage: "Geboortedatum is verplicht.",
    },
    {
      validator: (value) => {
        // Minimum leeftijd validatie (bijvoorbeeld 18 jaar)
        const minAge = 18;
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        // Als de leeftijd minder is dan de minimumleeftijd
        if (age < minAge || (age === minAge && month < 0)) {
          return false;
        }
        return true;
      },
      errorMessage: "Je moet minimaal 18 jaar oud zijn.",
    },
  ])
  .addField("#terms", [
    {
      rule: "required",
      errorMessage: "Ga akkoord om verder te gaan.",
    },
  ])
  .addField("#postalCode", [
    {
      rule: "required",
      errorMessage: "Vul een postcode in.",
    },
  ])
  .addField("#houseNumber", [
    {
      rule: "required",
      errorMessage: "Vul een huisnummer in.",
    },
  ]);

export { validator };
