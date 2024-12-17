import { autoFillAddress } from "./scripts/autoFillAddress.js";
import { initializePhoneInputValidation } from "./scripts/phoneInputValidation.js";

// Input validation
initializePhoneInputValidation();

// Vult automatisch adres in als je postcode en huisnummer invult
autoFillAddress();
