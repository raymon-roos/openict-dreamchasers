import { initializeCalendar } from "./calendar.js";

document.addEventListener("DOMContentLoaded", function () {
  initializeCalendar();
});

//
// //////////////////////////////////////////////////////////////////
//
//

// Dynamische kosten

function init() {
  // Zet de MutationObserver in voor de relevante spans
  const observer = new MutationObserver(() => {
    calculateAndDisplayCosts();
  });

  // Voeg observer toe aan elke span die de prijs of andere gegevens bevat
  const spans = document.querySelectorAll(
    "#adults, #youths, #children, #babies, #pets"
  );
  spans.forEach((span) => {
    observer.observe(span, {
      childList: true, // Luister naar veranderingen in de tekstinhoud
      subtree: false, // Luister naar veranderingen in de hele subtree
    });
  });

  // Start de initiële berekening
  calculateAndDisplayCosts();
}

function calculateCosts(
  days,
  basePrice,
  adults,
  youths,
  children,
  babies,
  pets
) {
  return {
    adults: { totalAdults: adults, adultsCosts: adults * basePrice * days },
    youths: {
      totalYouths: youths,
      youthsCosts: youths * (basePrice * 0.75) * days,
    },
    children: {
      totalChildren: children,
      childrenCosts: children * (basePrice * 0.5) * days,
    },
    babies: {
      totalBabies: babies,
      babiesCosts: babies * (basePrice * 0) * days,
    },
    pets: {
      totalPets: pets,
      petsCosts: pets * basePrice * days,
    },
  };
}

function displayCosts(costs) {
  // Tel alle kosten op
  const totalCosts =
    costs.adults.adultsCosts +
    costs.youths.youthsCosts +
    costs.children.childrenCosts +
    costs.babies.babiesCosts +
    costs.pets.petsCosts;

  let allCostsContainer = document.getElementById("allCostsContainer");
  const div = (guestType, totalGuests, totalCostsGuest) => {
    return `<div class="cost">
              <p>${totalGuests} ${guestType}</p>
              <span>€${totalCostsGuest}</span>
            </div>`;
  };

  allCostsContainer.innerHTML = "";

  // Volwassenen
  if (costs.adults.totalAdults > 0)
    allCostsContainer.innerHTML += div(
      "Volwassenen",
      costs.adults.totalAdults,
      costs.adults.adultsCosts
    );

  // Jongeren
  if (costs.youths.totalYouths > 0)
    allCostsContainer.innerHTML += div(
      "Jongeren",
      costs.youths.totalYouths,
      costs.youths.youthsCosts
    );

  // Kinderen
  if (costs.children.totalChildren > 0)
    allCostsContainer.innerHTML += div(
      "Kinderen",
      costs.children.totalChildren,
      costs.children.childrenCosts
    );

  // Babies
  if (costs.babies.totalBabies > 0)
    allCostsContainer.innerHTML += div(
      "Babies",
      costs.babies.totalBabies,
      costs.babies.babiesCosts
    );

  // Pets
  if (costs.pets.totalPets > 0)
    allCostsContainer.innerHTML += div(
      "Huisdieren",
      costs.pets.totalPets,
      costs.pets.petsCosts
    );

  document.getElementById("total-price").textContent = totalCosts;
}

function calculateAndDisplayCosts() {
  // Haal alle inputs/informatie op
  let days = 8;
  let basePrice =
    Number(document.getElementById("camping-price").innerText) || 0;
  let adults = Number(document.getElementById("adults").innerText) || 0;
  let youths = Number(document.getElementById("youths").innerText) || 0;
  let children = Number(document.getElementById("children").innerText) || 0;
  let babies = Number(document.getElementById("babies").innerText) || 0;
  let pets = Number(document.getElementById("pets").innerText) || 0;
  console.log(basePrice);

  // Bereken kosten
  let costs = calculateCosts(
    days,
    basePrice,
    adults,
    youths,
    children,
    babies,
    pets
  );

  // Display kosten
  displayCosts(costs);
}

init();

//
// //////////////////////////////////////////////////////////////////
//
//
