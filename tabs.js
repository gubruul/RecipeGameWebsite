const SITE_TITLE = "WhoDineIt";

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

const feedbackContainer = document.getElementById("all-feedback");

// 🔥 Feedback laden aus Firebase
async function loadFeedback() {
  feedbackContainer.innerHTML = "";

  const q = query(collection(db, "feedback"), orderBy("date", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const data = doc.data();

    const div = document.createElement("div");
    div.classList.add("feedback-item");

    div.innerHTML = `
      <div class="feedback-stars">${"★".repeat(data.rating)}</div>
      <div class="feedback-text">${data.text}</div>
    `;

    feedbackContainer.appendChild(div);
  });
}

// 🔥 Feedback speichern in Firebase
document.getElementById("feedback-submit").addEventListener("click", async () => {

  const text = document.getElementById("feedback-text").value.trim();

  if (ratingValue === 0 || text === "") {
    document.getElementById("feedback-result").textContent =
      "Bitte Sterne auswählen und Text eingeben!";
    return;
  }

  await addDoc(collection(db, "feedback"), {
    rating: ratingValue,
    text: text,
    date: new Date()
  });

  document.getElementById("feedback-text").value = "";
  ratingValue = 0;
  stars.forEach(s => s.classList.remove("selected"));

  document.getElementById("feedback-result").textContent =
    "Danke für dein Feedback!";

  loadFeedback();
});

// Beim Laden Seite Feedback aus Firebase holen
document.addEventListener("DOMContentLoaded", loadFeedback);

const recipes = {
  pasta: `
    <h4>Spaghetti Aglio e Olio</h4>
    <p><strong>Zutaten:</strong></p>
    <ul>
      <li>Spaghetti</li>
      <li>Knoblauch</li>
      <li>Olivenöl</li>
      <li>Chili</li>
      <li>Petersilie</li>
    </ul>
    <p><strong>Zubereitung:</strong></p>
    <p>Spaghetti kochen. Knoblauch in Olivenöl anbraten, Chili dazugeben. Pasta untermischen, mit Petersilie servieren.</p>
  `,
  burger: `
    <h4>Classic Burger</h4>
    <p><strong>Zutaten:</strong></p>
    <ul>
      <li>Burger Bun</li>
      <li>Rindfleisch Patty</li>
      <li>Käse</li>
      <li>Salat</li>
      <li>Tomate</li>
    </ul>
    <p><strong>Zubereitung:</strong></p>
    <p>Patty braten, Käse schmelzen lassen, alles im Bun stapeln und servieren.</p>
  `,
  salad: `
    <h4>Caesar Salad</h4>
    <p><strong>Zutaten:</strong></p>
    <ul>
      <li>Römersalat</li>
      <li>Croutons</li>
      <li>Parmesan</li>
      <li>Caesar Dressing</li>
    </ul>
    <p><strong>Zubereitung:</strong></p>
    <p>Salat waschen, Dressing untermischen, mit Croutons und Parmesan toppen.</p>
  `
};

const recipeSelect = document.getElementById("recipe-select");
const recipeDisplay = document.getElementById("recipe-display");

recipeSelect.addEventListener("change", function () {
  const selected = this.value;

  if (recipes[selected]) {
    recipeDisplay.innerHTML = recipes[selected];
  } else {
    recipeDisplay.innerHTML = "";
  }
});



