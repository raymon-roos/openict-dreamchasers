// overviewCard.js

import { getStateFromStorage } from "../state-manager/reservationState.js"; // Haal de centrale state op

// Maak de OverviewCard met gegevens uit de state
export function createOverviewCard() {
  const {
    imgSrc,
    placeName,
    rating,
    pricePerNight,
    arriveDate,
    departureDate,
    totalGuests,
    totalPets,
    totalPrice,
    totalDays,
    guests,
  } = getStateFromStorage();

  const { adults, youths, children, babies, pets } = guests;

  const adultsCosts = adults * pricePerNight * totalDays;
  const youthsCosts = youths * (pricePerNight * 0.75) * totalDays;
  const childrenCosts = children * (pricePerNight * 0.5) * totalDays;
  const babiesCosts = babies * (pricePerNight * 0) * totalDays;
  const petsCosts = pets * 2.5 * totalDays;

  const totalPrices =
    adultsCosts + youthsCosts + childrenCosts + babiesCosts + petsCosts;

  return `
  <div class="overviewCard">
    <h2>Overzicht</h2>
    <div class="placeInfo">
      <img src="${imgSrc}" alt="${placeName}" />
      <div class="placeInfo__text">
        <h3>${placeName}</h3>
        <p>${rating}</p>
        <p><span>€${pricePerNight}</span> per nacht</p>
      </div>
    </div>
    <div class="reservationInfo">
      <div class="departure-arrival">
        <div class="arrival">
          <h3>Aankomst</h3>
          <div>
            <i class="fa-regular fa-calendar-days"></i>
            <p>${arriveDate}</p>
          </div>
          <p class="checkin-checkout">Inchecken: 15:00 - 20:00</p>
        </div>
        <div class="departure">
          <h3>Vertrek</h3>
          <div>
            <i class="fa-regular fa-calendar-days"></i>
            <p>${departureDate}</p>
          </div>
          <p class="checkin-checkout">Uitchecken: 10:00</p>
        </div>
      </div>
      <div class="stay-duration">
        <i class="fa-regular fa-clock"></i>
        <div>
          <h3>Verblijfsduur</h3>
          <p>${totalDays} ${totalDays === 1 ? "nacht" : "nachten"}</p>
        </div>
      </div>
      <div class="companions">
        <div class="guests">
          <i class="fa-solid fa-user-group"></i>
          <div>
            <h3>Gasten</h3>
            <p>${totalGuests} gasten</p>
          </div>
        </div>
        <div class="pets">
          <i class="fas fa-dog"></i>
          <div>
            <h3>Huisdieren</h3>
            <p>${totalPets} ${totalPets === 1 ? "huisdier" : "huisdieren"}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="price-info">
      <h3>Prijsinformatie</h3>
      
      ${
        adults >= 1
          ? `
        <div class="costs">
          <p>${adults}x Volwassen${adults === 1 ? "en" : "en"}</p>
          <p>€${adultsCosts}</p>
        </div>
      `
          : ""
      }
      
      ${
        children >= 1
          ? `
        <div class="costs">
          <p>${children}x Kind${children === 1 ? "" : "eren"}</p>
          <p>€${childrenCosts}</p>
        </div>
      `
          : ""
      }
      
      ${
        youths >= 1
          ? `
        <div class="costs">
          <p>${youths}x Jongeren</p>
          <p>€${youthsCosts}</p>
        </div>
      `
          : ""
      }
      
      ${
        babies >= 1
          ? `
        <div class="costs">
          <p>${babies}x Baby${babies === 1 ? "" : "s"}</p>
          <p>€${babiesCosts}</p>
        </div>
      `
          : ""
      }
      
      ${
        pets > 0
          ? `
        <div class="costs">
          <p>${pets}x ${pets === 1 ? "Huisdier" : "Huisdieren"}</p>
          <p>€${petsCosts}</p>
        </div>
      `
          : ""
      }

      <div class="line"></div>
      <div class="total-price">
        <p>Totaal</p>
        <p>€${totalPrices}</p>
      </div>
    </div>
  </div>
`;
}

// Render de OverviewCard in de container
export function renderOverviewCard(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = createOverviewCard(); // Render de overview card
}
