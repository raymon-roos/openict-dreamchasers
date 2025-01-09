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
    serviceCosts,
    totalDays,
  } = getStateFromStorage();

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
              <p>${totalPets} huisdieren</p>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="price-info">
        <h3>Prijsinformatie</h3>
        <div class="costs">
          <p>€${pricePerNight} x ${totalDays}</p>
          <p>€${pricePerNight * totalDays}</p>
        </div>
        <div class="costs">
          <p>Service kosten</p>
          <p>€${serviceCosts}</p>
        </div>
        <div class="line"></div>
        <div class="total-price">
          <p>Totaal</p>
          <p>€${totalPrice}</p>
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
