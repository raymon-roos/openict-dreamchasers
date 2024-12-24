document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".carousel .camping-img");
  const dotsNavigation = document.querySelector(".dots-navigation");
  let currentIndex = 0;

  const createDots = () => {
    dotsNavigation.innerHTML = "";
    images.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => showImage(i));
      dotsNavigation.appendChild(dot);
    });
  };

  const showImage = (index) => {
    currentIndex = (index + images.length) % images.length;
    images.forEach((img, i) => {
      img.classList.toggle("active", i === currentIndex);
    });
    updateDots();
  };

  const updateDots = () => {
    const dots = dotsNavigation.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  };

  const changeImage = (increment) => {
    showImage(currentIndex + increment);
  };

  document
    .querySelector(".arrow-left")
    .addEventListener("click", () => changeImage(-1));
  document
    .querySelector(".arrow-right")
    .addEventListener("click", () => changeImage(1));

  createDots();
  showImage(currentIndex);

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
});
