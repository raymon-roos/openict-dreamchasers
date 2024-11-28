const dagSelect = document.getElementById('dag');
const maandSelect = document.getElementById('maand');
const jaarSelect = document.getElementById('jaar');
const resultaatDiv = document.getElementById('resultaat');

// Functie om het aantal dagen in een maand te bepalen
function aantalDagenInMaand(maand, jaar) {
    return new Date(jaar, maand, 0).getDate(); // 0 geeft de laatste dag van de vorige maand
}

// Functie om de dagen dynamisch te genereren op basis van maand en jaar
function vulDagen(maand, jaar) {
    const dagen = aantalDagenInMaand(maand, jaar);
    dagSelect.innerHTML = ''; // Reset dagen
    for (let i = 1; i <= dagen; i++) {
        const optie = document.createElement('option');
        optie.value = i;
        optie.textContent = i;
        dagSelect.appendChild(optie);
    }
}

// Functie om de maanden te vullen
function vulMaanden() {
    const maanden = [
        "Januari", "Februari", "Maart", "April", "Mei", "Juni",
        "Juli", "Augustus", "September", "Oktober", "November", "December"
    ];
    maanden.forEach((maand, index) => {
        const optie = document.createElement('option');
        optie.value = index + 1; // Maand begint bij 1
        optie.textContent = maand;
        maandSelect.appendChild(optie);
    });
}

function vulJaren() {
    const huidigeJaar = new Date().getFullYear();
    const startJaar = 1960;
    const leeftijdBeperking = 16;
    const maximaalJaar = huidigeJaar - leeftijdBeperking;

    // Beperk de jaren van 1960 tot het maximaal toegestane jaar
    for (let i = maximaalJaar; i >= startJaar; i--) {
        const optie = document.createElement('option');
        optie.value = i;
        optie.textContent = i;
        jaarSelect.appendChild(optie);
    }
}

// Valideer de geselecteerde datum
function valideerDatum() {
    const dag = parseInt(dagSelect.value, 10);
    const maand = parseInt(maandSelect.value, 10);
    const jaar = parseInt(jaarSelect.value, 10);
    
    const geselecteerdeDatum = new Date(jaar, maand - 1, dag); // Maand is 0-indexed
    if (
        geselecteerdeDatum.getFullYear() === jaar &&
        geselecteerdeDatum.getMonth() === maand - 1 &&
        geselecteerdeDatum.getDate() === dag
    ) {
        resultaatDiv.textContent = `Geldige datum: ${dag}-${maand}-${jaar}`;
        resultaatDiv.className = "resultaat"; // Verwijder foutstijl
    } else {
        resultaatDiv.textContent = "Ongeldige datum. Controleer de dag, maand en jaar.";
        resultaatDiv.className = "resultaat error"; // Voeg foutstijl toe
    }
}

// Event listeners om dagen bij te werken en te valideren
maandSelect.addEventListener('change', () => {
    const maand = parseInt(maandSelect.value, 10);
    const jaar = parseInt(jaarSelect.value, 10);
    vulDagen(maand, jaar); // Update de dagen bij een wijziging in de maand
    valideerDatum();
});

jaarSelect.addEventListener('change', () => {
    const maand = parseInt(maandSelect.value, 10);
    const jaar = parseInt(jaarSelect.value, 10);
    vulDagen(maand, jaar); // Update de dagen bij een wijziging in het jaar
    valideerDatum();
});

dagSelect.addEventListener('change', valideerDatum);

// Vul de selectievakken en start met de huidige datum
function init() {
    vulJaren();  // Vul de jaren dropdown eerst
    vulMaanden(); // Vul daarna de maanden dropdown

    // Zet de huidige maand en jaar in de selectievakken nadat de opties zijn gevuld
    const huidigeMaand = new Date().getMonth() + 1; // Maand is 1-indexed
    const huidigJaar = new Date().getFullYear();

    maandSelect.value = huidigeMaand;  // Zet de maand naar de huidige maand
    jaarSelect.value = huidigJaar;  // Zet het jaar naar het huidige jaar
    vulDagen(huidigeMaand, huidigJaar);  // Vul de dagen op basis van de huidige maand en jaar
}

init();  // Initialiseer de datumkiezer

