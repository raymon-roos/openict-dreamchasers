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

  images.forEach(
    (img, i) => (img.style.display = i === currentIndex ? "block" : "none")
  );

  updateDots();
};

const updateDots = () => {
  const dots = dotsNavigation.querySelectorAll(".dot");

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex); // Actieve dot markeren
    dot.style.display =
      Math.abs(i - currentIndex) < 3 ? "inline-block" : "none"; // Max 3 dots zichtbaar
  });
};

const changeImage = (increment) => {
  showImage(currentIndex + increment);
};

// Event listeners voor navigatie knoppen
document.querySelector(".next").addEventListener("click", () => changeImage(1));
document
  .querySelector(".prev")
  .addEventListener("click", () => changeImage(-1));

// Initialiseren van het dot systeem en het tonen van de eerste afbeelding
createDots();
showImage(currentIndex);

// Event listeners voor tab navigatie
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".tab, .content")
      .forEach((el) => el.classList.remove("activeTab", "active-content"));
    tab.classList.add("activeTab");
    document
      .getElementById(tab.getAttribute("data-content"))
      .classList.add("active-content");
  });
});
