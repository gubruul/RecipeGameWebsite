// ===============================
// ZENTRALE TITEL-VARIABLE
// ===============================
const SITE_TITLE = "SpielBeispieltitel";

// Titel in Header & Browser-Tab setzen
document.title = SITE_TITLE;
document.getElementById("site-title").textContent = SITE_TITLE;


// ===============================
// TAB-FUNKTIONALITÄT
// ===============================
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    tabs.forEach(t => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    contents.forEach(c => c.classList.remove("active"));
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});
