import { calculateCosts } from "./costsHandler.js";

export async function initializeCampingInfo() {
  try {
    // CampingPlek Info API request
    //const response = await fetch("/api/campinginfo");
    //if (!response.ok) {
    //  throw new Error("Fout bij ophalen van campinginformatie");
    //}

    //const data = await response.json();

    // Haal de basisprijs op (bijvoorbeeld 30 euro per nacht)
    //const basePrice = data.prijzen.basisPrijs;

    const basePrice = 30;

    // Display base Price
    document.getElementById("camping-price").innerHTML = basePrice;

    // Elke gast op 1 (Om de prijs te kunnen weten van 1 per type)
    const adults = 1;
    const youths = 1;
    const children = 1;
    const babies = 1;
    const pets = 1;

    const days = 1; // Aantal dagen (voor deze berekening altijd 1)

    // Bereken de kosten per nacht per gasttype
    const costs = calculateCosts(
      days,
      basePrice,
      adults,
      youths,
      children,
      babies,
      pets
    );

    // Toon de kosten per nacht per type in de UI
    document.getElementById(
      "adults-price-per-night"
    ).innerHTML = `€<span class='price-per-night'>${costs.adults.adultsCosts}</span> per nacht`;
    document.getElementById(
      "youths-price-per-night"
    ).innerHTML = `€<span class='price-per-night'>${costs.youths.youthsCosts}</span> per nacht`;
    document.getElementById(
      "children-price-per-night"
    ).innerHTML = `€<span class='price-per-night'>${costs.children.childrenCosts}</span> per nacht`;
    document.getElementById(
      "babies-price-per-night"
    ).innerHTML = `€<span class='price-per-night'>${
      costs.babies.babiesCosts === 0 ? "Gratis" : costs.babies.babiesCosts
    }</span> per nacht`;
    document.getElementById(
      "pets-price-per-night"
    ).innerHTML = `€<span class='price-per-night'>${costs.pets.petsCosts}</span> per nacht`;

    localStorage.removeItem("totalDays");
    // Catch Error
  } catch (error) {
    console.error("Er is een fout opgetreden:", error);
    alert("Kon de campinginformatie niet ophalen. Probeer het later opnieuw.");
  }
}
