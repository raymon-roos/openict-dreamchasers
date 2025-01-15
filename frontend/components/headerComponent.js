export function createHeader() {
  const header = document.createElement("div");
  header.className = "header";

  const steps = [
    { number: 1, text: "Campingplek" },
    { number: 2, text: "Gegevens" },
    { number: 3, text: "Betaling" },
    { number: 4, text: "Overzicht" },
  ];

  steps.forEach((step, index) => {
    const procesbar = document.createElement("div");
    procesbar.className = "procesbar";
    if (index === 0) procesbar.classList.add("active-procesbar");

    const span = document.createElement("span");
    span.textContent = step.number;

    const p = document.createElement("p");
    p.textContent = step.text;

    procesbar.appendChild(span);
    procesbar.appendChild(p);
    header.appendChild(procesbar);

    if (index < steps.length - 1) {
      const arrow = document.createElement("i");
      arrow.className = "fa-solid fa-chevron-right";
      header.appendChild(arrow);
    }
  });

  return header;
}
