const SITE_TITLE = "SpielBeispieltitel";

document.title = SITE_TITLE;
document.getElementById("site-title").textContent = SITE_TITLE;

const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    contents.forEach(c => c.classList.remove("active"));
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

// ⭐ STAR RATING FORM
const stars = document.querySelectorAll(".star-rating .star");
let ratingValue = 0;

stars.forEach(star => {
  star.addEventListener("mouseover", () => {
    stars.forEach(s => s.classList.remove("hovered"));
    star.classList.add("hovered");
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

// submit handling
document.getElementById("feedback-submit").addEventListener("click", () => {
  const text = document.getElementById("feedback-text").value.trim();
  if (ratingValue === 0) {
    document.getElementById("feedback-result").textContent = "Bitte erst Sterne auswählen!";
    return;
  }
  if (text === "") {
    document.getElementById("feedback-result").textContent = "Bitte ein Feedback schreiben!";
    return;
  }
  document.getElementById("feedback-result").textContent =
    `Danke für deine Bewertung: ${ratingValue} ⭐ und Kommentar!`;
});
