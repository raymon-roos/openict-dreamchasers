// Gasten toevoegen / verwijderen

// Select all minus and plus buttons
const minusButtons = document.querySelectorAll(".minus");
const plusButtons = document.querySelectorAll(".plus");

// Function to update the count
function updateGuestCount(countElement, increment) {
  let currentCount = parseInt(countElement.textContent);
  const newCount = currentCount + increment;

  // Ensure count doesn't go below 0
  if (newCount >= 0) {
    countElement.textContent = newCount;
  }
}

// Add event listeners to all minus buttons
minusButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const countElement = button.nextElementSibling;
    updateGuestCount(countElement, -1);
  });
});

// Add event listeners to all plus buttons
plusButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const countElement = button.previousElementSibling;
    updateGuestCount(countElement, 1);
  });
});
