// Functie om het adres op te halen op basis van huisnummer, postcode en land
export async function autoFillAddress() {
  document.getElementById("houseNumber").addEventListener("blur", async () => {
    const country = document.getElementById("selectCountry").value.trim();
    const postcode = document.getElementById("postalCode").value.trim();
    const housenumber = document.getElementById("houseNumber").value.trim();

    if (!postcode || !housenumber) {
      console.log(
        "Postcode of huisnummer ontbreekt. Adres wordt niet opgehaald."
      );
      return;
    }

    const apiKey = "-T8N8YZU_AM2UZDwWiV82NzQTm3kPC-f7c-G5Jg-Rx4"; // HERE API Key
    const query = `${housenumber} ${postcode} ${country}`;
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
      query
    )}&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data.items && data.items.length > 0) {
        // Filter resultaten op basis van exact huisnummer en postcode
        const filteredItems = data.items.filter((item) => {
          const address = item.address;
          return (
            address.countryCode === "NLD" &&
            address.postalCode.replace(/[\s\u200B\u00A0]+/g, "").trim() ===
              postcode &&
            address.houseNumber === housenumber
          );
        });

        if (filteredItems.length > 0) {
          const address = filteredItems[0];
          const street = address.address.street || "";
          const city = address.address.city || "";

          document.getElementById("streetName").value = street;
          document.getElementById("cityName").value = city;

          // Verberg de statusboodschap en disable inputs
          document.getElementById("addressMessage").innerText = "";
          document.getElementById("streetName").disabled = true;
          document.getElementById("cityName").disabled = true;
        } else {
          console.warn("Exact adres niet gevonden.");
          document.getElementById("addressMessage").innerText =
            "Foute postcode of huisnummer.";
        }
      } else {
        console.warn("Geen resultaten gevonden.");
        document.getElementById("addressMessage").innerText =
          "Foute postcode of huisnummer.";
      }
    } catch (error) {
      console.error("Fout bij het ophalen van het adres:", error);
      document.getElementById("addressMessage").innerText =
        "Er is een fout opgetreden.";
    }
  });
}
