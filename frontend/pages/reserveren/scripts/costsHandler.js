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
      petsCosts: pets * 2.5 * days,
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
  const dynamicDiv = (guestType, totalGuests, totalCostsGuest) => {
    return `<div class="cost">
              <p>${totalGuests}x ${guestType}</p>
              <span>€${totalCostsGuest}</span>
            </div>`;
  };

  allCostsContainer.innerHTML = "";

  // Loop door de keys van het costs-object
  Object.keys(costs).forEach((key) => {
    // Dynamisch de displaynaam genereren op basis van de key
    const guestTypeName = key.charAt(0).toUpperCase() + key.slice(1); // Dit maakt bijvoorbeeld 'adults' naar 'Adults'

    // Dynamisch de totaal aantal gasten en kosten ophalen
    const totalGuestsKey = `total${guestTypeName}`; // Bijvoorbeeld 'totalAdults'
    const totalCostsKey = `${key}Costs`; // Bijvoorbeeld 'adultsCosts'

    // Controleer of er gasten van dit type zijn
    if (costs[key][totalGuestsKey] > 0) {
      allCostsContainer.innerHTML += dynamicDiv(
        guestTypeName,
        costs[key][totalGuestsKey],
        costs[key][totalCostsKey]
      );
    }
  });

  document.getElementById("total-price").textContent = totalCosts;
}

function calculateAndDisplayCosts() {
  // Haal het aantal dagen op uit localStorage
  let days = localStorage.getItem("totalDays") || 0; // Als er geen waarde is, stel in op 8

  // Haal alle inputs/informatie op
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

export { calculateAndDisplayCosts, calculateCosts };
