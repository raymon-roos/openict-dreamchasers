document.getElementById("print").addEventListener("click", function () {
  const overviewCard = document.getElementById("overviewCard");

  // Maak een nieuw venster aan voor de printweergave
  const printWindow = window.open("", "_blank");

  // Verzamel alle stijlen (externe en inline)
  const stylesheets = Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        if (sheet.href) {
          return `<link rel="stylesheet" href="${sheet.href}">`; // Voeg externe stylesheets toe
        } else {
          return [...sheet.cssRules].map((rule) => rule.cssText).join("\n"); // Voeg inline stijlen toe
        }
      } catch (e) {
        return ""; // Externe stijlen kunnen CORS-beperkingen hebben
      }
    })
    .join("\n");

  // Voeg de HTML voor de printweergave toe, inclusief de print-specifieke stijlen
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Overview Card</title>
        <!-- Link naar externe stijlen -->
        ${Array.from(document.styleSheets)
          .map((sheet) =>
            sheet.href ? `<link rel="stylesheet" href="${sheet.href}">` : ""
          )
          .join("\n")}
        <!-- Voeg de inline stijlen toe -->
        <style>
          /* Stijlen voor printen */
          @media print {
            body {
              margin: 0;
              font-family: Arial, sans-serif;
              line-height: 1.4;
              width: 450mm; /* Verhoogde breedte (250mm in plaats van 210mm) */
              height: 297mm; /* A4 hoogte */
            }
            .overviewCard {
              max-width: 100%;
              overflow: hidden;
              page-break-before: auto;
              page-break-after: auto;
            }
            h1, h2, h3, p {
              margin: 10px 0;
              padding: 0;
            }
            /* Zorg ervoor dat alles netjes op de pagina past */
            * {
              box-sizing: border-box;
            }
          }
        </style>
      </head>
      <body>
        ${overviewCard.outerHTML}
        <script>
          window.onload = function() {
            // Wacht even en voer de printopdracht uit
            setTimeout(function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            }, 500); // 500ms vertraging om ervoor te zorgen dat alles goed is geladen
          }
        </script>
      </body>
    </html>
  `);

  // Sluit het document om wijzigingen door te voeren
  printWindow.document.close();
});

// Download
document.getElementById("download").addEventListener("click", function () {
  const overviewCard = document.getElementById("overviewCard");
  const reservationNumber = "Reserveringsnummer: 123456"; // Hier vul je de juiste reserveringsnummer in.

  // Use html2canvas to capture the `overviewCard` element
  html2canvas(overviewCard, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jspdf.jsPDF("p", "mm", "a4");

    // Voeg de reserveringsnummer bovenaan de PDF toe
    pdf.setFontSize(16); // Kies een grote tekstgrootte
    pdf.setFont("helvetica", "bold"); // Maak de tekst vetgedrukt
    pdf.text(reservationNumber, 10, 20); // Plaats de tekst, bijv. 10 mm van links en 20 mm van boven

    // Calculate dimensions to fit the content into A4
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Voeg de afbeelding toe aan de PDF (onder de tekst)
    pdf.addImage(imgData, "PNG", 0, 30, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save("overviewCard.pdf");
  });
});

// Confetti
document.addEventListener("DOMContentLoaded", () => {
  // Trigger confetti
  confetti({
    particleCount: 140,
    spread: 100,
  });
});
