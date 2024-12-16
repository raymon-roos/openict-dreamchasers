// Function to initialize the phone number input validation
export function initializePhoneInputValidation() {
  const input = document.querySelector("#phoneNumber");
  const button = document.querySelector(".nextButton");
  const errorMsg = document.querySelector("#error-msg");

  // here, the index maps to the error code returned from getValidationError - see readme
  const errorMap = [
    "Invalid number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number",
  ];

  // initialise plugin
  const iti = window.intlTelInput(input, {
    initialCountry: "nl",
    strictMode: true,
    separateDialCode: true,
    loadUtils: () =>
      import(
        "https://cdn.jsdelivr.net/npm/intl-tel-input@25.2.0/build/js/utils.js"
      ),
  });

  const reset = () => {
    input.classList.remove("error");
    errorMsg.innerHTML = "";
    errorMsg.classList.add("hide");
  };

  const showError = (msg) => {
    input.classList.add("error");
    errorMsg.innerHTML = msg;
    errorMsg.classList.remove("hide");
  };

  // on click button: validate
  button.addEventListener("click", () => {
    reset();
    if (!input.value.trim()) {
      showError("Required");
    } else if (iti.isValidNumber()) {
    } else {
      const errorCode = iti.getValidationError();
      const msg = errorMap[errorCode] || "Invalid number";
      showError(msg);
    }
  });

  // on keyup / change flag: reset
  input.addEventListener("change", reset);
  input.addEventListener("keyup", reset);
}
