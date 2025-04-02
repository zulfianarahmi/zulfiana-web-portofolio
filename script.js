// ==================== FUNGSIONALITAS YANG SUDAH ADA ====================
// (Tetap dipertahankan semua)

// Simple interactivity untuk dock icon (tetap dipertahankan)
document.querySelectorAll(".dock-icon").forEach((icon) => {
  icon.addEventListener("click", (e) => {
    const app = e.target.getAttribute("title");
    alert(`Launching ${app}... (This would navigate to real links)`);
  });
});

// Animated cursor (tetap dipertahankan)
setInterval(() => {
  const cursor = document.querySelector(".cursor");
  if (cursor) {
    cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
  }
}, 500);

// Terminal commands (tetap dipertahankan)
const terminalCommands = {
  help: () => "Available commands: about, projects, contact, clear",
  about: () => (window.location.hash = "#about"),
  projects: () => (window.location.hash = "#projects"),
  contact: () =>
    (document.getElementById("contact-window").style.display = "block"),
  clear: () => {
    document.querySelector(".terminal").innerHTML =
      '<div><span class="prompt">$</span> <span class="cursor">_</span></div>';
    return "";
  },
};

// Theme switcher (tetap dipertahankan)
const themeSwitcher = document.createElement("div");
themeSwitcher.className = "theme-switcher";
themeSwitcher.innerHTML = `
      <button id="dark-theme">Dark</button>
      <button id="light-theme">Light</button>
    `;
document.body.appendChild(themeSwitcher);

document.getElementById("light-theme").addEventListener("click", () => {
  document.body.classList.add("light-theme");
  localStorage.setItem("theme", "light");
});

document.getElementById("dark-theme").addEventListener("click", () => {
  document.body.classList.remove("light-theme");
  localStorage.setItem("theme", "dark");
});

// Check saved theme (tetap dipertahankan)
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }
});

// WindowManager class (tetap dipertahankan)
class WindowManager {
  constructor() {
    this.windows = [];
    this.zIndex = 100;
  }

  register(windowElement) {
    windowElement.addEventListener("mousedown", () => {
      windowElement.style.zIndex = ++this.zIndex;
    });
    this.windows.push(windowElement);
  }
}

const wm = new WindowManager();
document.querySelectorAll(".window").forEach((w) => wm.register(w));

// Window controls (tetap dipertahankan)
document.querySelectorAll(".window-controls button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const action = e.target.getAttribute("title");
    const window = e.target.closest(".window");

    switch (action) {
      case "Minimize":
        window.querySelector(".window-content").style.display = "none";
        break;
      case "Maximize":
        window.classList.toggle("maximized");
        break;
      case "Close":
        window.style.display = "none";
        break;
    }
  });
});

// ==================== PENAMBAHAN FUNGSIONALITAS BARU ====================
// (Tanpa menghapus yang lama)

// 1. Enhanced Dock Navigation
document.querySelectorAll(".dock-icon[data-section]").forEach((icon) => {
  icon.addEventListener("click", function () {
    const section = this.getAttribute("data-section");
    const targetWindow = document.getElementById(`${section}-window`);

    if (targetWindow) {
      // Sembunyikan semua windows
      document
        .querySelectorAll(".window")
        .forEach((w) => (w.style.display = "none"));

      // Tampilkan window yang dipilih
      targetWindow.style.display = "block";
      targetWindow.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 2. Project View Toggle
document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", function () {
    const view = this.getAttribute("data-view");

    // Update active button
    document.querySelectorAll("[data-view]").forEach((btn) => {
      btn.classList.toggle("active", btn === this);
    });

    // Toggle visibility
    document
      .querySelector(".terminal-view")
      .classList.toggle("hidden", view !== "terminal");
    document
      .querySelector(".card-view")
      .classList.toggle("hidden", view !== "card");
  });
});

// 3. Project Detail View
document.querySelectorAll(".terminal-link, .project-card").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const projectId = this.getAttribute("data-project");

    // Sembunyikan semua windows
    document;

    // Isi detail proyek
    const detailWindow = document.getElementById("project-detail-window");
    detailWindow.querySelector(
      "#project-detail-title"
    ).textContent = `${projectId}/details.md`;

    // Tampilkan window detail
    detailWindow.style.display = "block";
    detailWindow.scrollIntoView({ behavior: "smooth" });
  });
});

// 4. Back Button untuk Project Detail
document.querySelector(".back-button").addEventListener("click", function () {
  // Sembunyikan detail window
  document.getElementById("project-detail-window").style.display = "none";

  // Tampilkan projects window
  document.getElementById("projects-window").style.display = "block";
});

// 5. Form Submission
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Validasi sederhana
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
      alert("Pesan terkirim! (Ini hanya simulasi)");
      this.reset();
    } else {
      alert("Harap isi semua field!");
    }
  });

// 6. Mobile Menu Toggle
document
  .querySelector(".mobile-menu-btn")
  .addEventListener("click", function () {
    document.querySelector(".mobile-nav").style.display =
      document.querySelector(".mobile-nav").style.display === "block"
        ? "none"
        : "block";
  });

// 7. Close mobile nav ketika memilih item
document.querySelectorAll(".mobile-nav span").forEach((item) => {
  item.addEventListener("click", function () {
    document.querySelector(".mobile-nav").style.display = "none";
  });
});
