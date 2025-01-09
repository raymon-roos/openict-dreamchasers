export function displayReservationInfo() {
  // Aankomst & Vertrek
  const arriveDate = localStorage.getItem("arriveDate");
  const departureDate = localStorage.getItem("departureDate");

  document.getElementById("arrive-date").textContent = arriveDate;
  document.getElementById("departure-date").textContent = departureDate;

  // Totale nachten
  const totalNights = localStorage.getItem("totalDays");

  document.getElementById("total-nights").textContent =
    totalNights == 1 ? totalNights + " nacht" : totalNights + " nachten";

  // Totale gasten
  const totalGuestsObj = JSON.parse(localStorage.getItem("totalGuests"));

  const totalGuests = totalGuestsObj[0].totalGuests;
  console.log(totalGuests);
  document.getElementById("total-guests").textContent =
    totalGuests == 1 ? totalGuests + " gast" : totalGuests + " gasten";
}
