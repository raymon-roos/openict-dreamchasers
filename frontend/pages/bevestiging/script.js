// Print
document.getElementById("print").addEventListener("click", function () {
  const overviewCard = document.getElementById("overviewCard");
  const printWindow = window.open("", "", "height=500,width=500");

  // Open and write the content to the new print window
  printWindow.document.write("<html><head><title>Print Content</title>");

  // Include the necessary stylesheets (both inline and external)
  const styleSheets = document.querySelectorAll(
    'link[rel="stylesheet"], style'
  );
  styleSheets.forEach(function (sheet) {
    printWindow.document.write(sheet.outerHTML);
  });

  // Write the content you want to print
  printWindow.document.write("</head><body>");
  printWindow.document.write(overviewCard.innerHTML);
  printWindow.document.write("</body></html>");

  printWindow.document.close(); // Close the document to finish the setup
  printWindow.print(); // Open the print dialog
});

// Download
document.getElementById("download").addEventListener("click", function () {
  const overviewCard = document.getElementById("overviewCard");

  // Use html2canvas to capture the `overviewCard` element
  html2canvas(overviewCard, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jspdf.jsPDF("p", "mm", "a4");

    // Calculate dimensions to fit the content into A4
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save("overviewCard.pdf");
  });
});
