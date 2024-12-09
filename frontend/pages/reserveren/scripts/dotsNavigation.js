let currentIndex = 0;

const images = document.querySelectorAll(".camping-img");
const dotsNavigation = document.querySelector(".dots-navigation");

const createDots = () => {
  dotsNavigation.innerHTML = ""; // Leegmaken dots-container

  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => showImage(i)); // Klikbare dot
    dotsNavigation.appendChild(dot);
  });
};

const showImage = (index) => {
  currentIndex = (index + images.length) % images.length;
  images.forEach((img, i) => {
    img.style.display = i === currentIndex ? "block" : "none";
  });
  updateDots();
};

const updateDots = () => {
  const dots = dotsNavigation.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.style.display =
      Math.abs(i - currentIndex) < 3 ? "inline-block" : "none"; // Max 3 dots zichtbaar
    dot.classList.toggle("active", i === currentIndex); // Actieve dot markeren
  });
};

document
  .querySelector(".next")
  .addEventListener("click", () => showImage(currentIndex + 1));
document
  .querySelector(".prev")
  .addEventListener("click", () => showImage(currentIndex - 1));

// Initialiseren
createDots();
showImage(currentIndex);
// Selecteer alle tabs
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    // Verwijder 'actief' van alle tabs en inhoud
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("activeTab"));
    document
      .querySelectorAll(".content")
      .forEach((content) => content.classList.remove("active-content"));

    // Voeg 'actief' toe aan de geklikte tab en bijbehorende inhoud
    tab.classList.add("activeTab");
    const contentId = tab.getAttribute("data-content");
    document.getElementById(contentId).classList.add("active-content");
  });
});
