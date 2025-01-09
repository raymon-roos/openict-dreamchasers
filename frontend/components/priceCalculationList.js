// calculation.js

// Prijzen per gasttype
const pricePerType = {
  adult: 38, // Volwassenen
  youth: 76, // Jongeren
  child: 20, // Kinderen
  pet: 10, // Huisdieren
};

// Haal de huidige staat op van de centrale state
import { getStateFromStorage } from "../state-manager/reservationState.js";

// Functie die de gegevens voor de berekening haalt en de HTML genereert
export function createCalculationComponent() {
  // Haal de gegevens uit de centrale staat
  const state = getStateFromStorage();
  const { adults, youths, children, pets, totalDays } = state;

  // Bereken de kosten voor elk gasttype
  const adultTotal = adults * pricePerType.adult;
  const youthTotal = youths * pricePerType.youth;
  const childTotal = children * pricePerType.child;
  const petTotal = pets * pricePerType.pet;

  // Bereken de totale prijs
  const totalPrice = adultTotal + youthTotal + childTotal + petTotal;
  const serviceCosts = 20; // Voorbeeld van servicekosten

  // Functie voor het genereren van prijsinformatie per gasttype als het aantal > 0 is
  function createCostInfo(label, pricePerPerson, count) {
    if (count > 0) {
      const totalCost = pricePerPerson * count;
      return `
          <p>€${pricePerPerson} x ${count} ${label} = €${totalCost}</p>
        `;
    }
    return ""; // Als het aantal 0 is, geef een lege string terug
  }

  return `
      <div class="calculation">
        <h2>Bereken je Reservering</h2>
  
        <label for="adults">Aantal volwassenen:</label>
        <input type="number" id="adults" value="${adults}" min="0" />
  
        <label for="youths">Aantal jongeren:</label>
        <input type="number" id="youths" value="${youths}" min="0" />
  
        <label for="children">Aantal kinderen:</label>
        <input type="number" id="children" value="${children}" min="0" />
  
        <label for="pets">Aantal huisdieren:</label>
        <input type="number" id="pets" value="${pets}" min="0" />
  
        <label for="days">Aantal nachten:</label>
        <input type="number" id="days" value="${totalDays}" min="1" />
  
        <button id="calculate-button">Bereken</button>
  
        <div class="price-info">
          <h3>Prijsinformatie</h3>
          <div class="costs">
            ${createCostInfo("volwassenen", pricePerType.adult, adults)}
            ${createCostInfo("jongeren", pricePerType.youth, youths)}
            ${createCostInfo("kinderen", pricePerType.child, children)}
            ${createCostInfo("huisdieren", pricePerType.pet, pets)}
          </div>
          <div class="service-costs">
            <p>Service kosten</p>
            <p>€${serviceCosts}</p>
          </div>
          <div class="line"></div>
          <div class="total-price">
            <p>Totaal</p>
            <p>€${totalPrice + serviceCosts}</p>
          </div>
        </div>
      </div>
    `;
}

// Render de berekeningscomponent in een container
export function renderCalculationComponent(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = createCalculationComponent(); // Render de berekeningscomponent
}

// Event listener voor de "Bereken" knop om de gegevens op te slaan in de centrale staat
document.addEventListener("DOMContentLoaded", () => {
  const calculateButton = document.getElementById("calculate-button");

  calculateButton.addEventListener("click", () => {
    const adults = parseInt(document.getElementById("adults").value);
    const youths = parseInt(document.getElementById("youths").value);
    const children = parseInt(document.getElementById("children").value);
    const pets = parseInt(document.getElementById("pets").value);
    const totalDays = parseInt(document.getElementById("days").value);

    // Update de centrale staat (je kunt een state management systeem gebruiken)
    const newState = {
      adults,
      youths,
      children,
      pets,
      totalDays,
    };

    // Update de centrale staat in sessionStorage of localStorage
    sessionStorage.setItem("appState", JSON.stringify(newState));

    // Herlaad de component om de nieuwe prijzen weer te geven
    renderCalculationComponent("calculation-container");
  });
});
