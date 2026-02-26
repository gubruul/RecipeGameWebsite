const SITE_TITLE = "WhoDineIt";

document.title = SITE_TITLE;
document.getElementById("site-title").textContent = SITE_TITLE;

/* ================= TAB SYSTEM ================= */

const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    contents.forEach(c => c.classList.remove("active"));

    const target = document.getElementById(tab.dataset.tab);
    if (target) target.classList.add("active");
  });
});

/* ================= HEADER SCROLL EFFECT ================= */

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > 40) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

/* ================= STAR RATING ================= */

const stars = document.querySelectorAll(".star-rating .star");
let ratingValue = 0;

stars.forEach(star => {

  star.addEventListener("mouseover", () => {
    stars.forEach(s => s.classList.remove("hovered"));
    for (let i = 0; i < star.dataset.value; i++) {
      stars[i].classList.add("hovered");
    }
  });

  star.addEventListener("mouseout", () => {
    stars.forEach(s => s.classList.remove("hovered"));
  });

  star.addEventListener("click", () => {
    ratingValue = parseInt(star.dataset.value);

    stars.forEach(s => s.classList.remove("selected"));

    for (let i = 0; i < ratingValue; i++) {
      stars[i].classList.add("selected");
    }
  });

});

/* ================= RECIPE DROPDOWN ================= */

const recipeSelect = document.getElementById("recipe-select");
const recipeDisplay = document.getElementById("recipe-display");

const recipes = {
  pasta: `...`,
  burger: `...`,
  salad: `...`
};

recipeSelect?.addEventListener("change", function () {
  const selected = this.value;

  if (recipes[selected]) {
    recipeDisplay.innerHTML = recipes[selected];
  } else {
    recipeDisplay.innerHTML = "";
  }
});
