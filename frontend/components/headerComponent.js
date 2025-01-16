export function createHeader() {
  const header = document.createElement("div");
  header.className = "header";

  const steps = [
    {
      number: 1,
      text: "Campingplek",
      link: "/frontend/pages/reserveren/index.html",
    },
    {
      number: 2,
      text: "Gegevens",
      link: "/frontend/pages/gegevens-invullen/index.html",
    },
    {
      number: 3,
      text: "Betaling",
      link: "/frontend/pages/betaalmethodes/index.html",
    },
    {
      number: 4,
      text: "Overzicht",
      link: "/frontend/pages/overzicht/index.html",
    },
  ];

  const currentPath = window.location.pathname;
  const currentStepIndex = steps.findIndex((step) => step.link === currentPath);

  steps.forEach((step, index) => {
    const procesbar = document.createElement("div");
    procesbar.className = "procesbar";

    // Markeer de actieve stap
    if (currentPath === step.link) {
      procesbar.classList.add("active-procesbar");
    }

    // Maak klikbaar alleen als het een eerdere stap is
    procesbar.addEventListener("click", () => {
      if (index < currentStepIndex) {
        window.location.href = step.link;
      }
    });

    const span = document.createElement("span");
    span.textContent = step.number;

    const p = document.createElement("p");
    p.textContent = step.text;

    procesbar.appendChild(span);
    procesbar.appendChild(p);
    header.appendChild(procesbar);

    // Voeg pijl toe tussen stappen, behalve na de laatste stap
    if (index < steps.length - 1) {
      const arrow = document.createElement("i");
      arrow.className = "fa-solid fa-chevron-right";
      header.appendChild(arrow);
    }
  });

  return header;
}
