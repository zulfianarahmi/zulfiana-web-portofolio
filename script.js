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

// View Toggle Animation
const viewToggle = document.querySelector('.view-toggle');
const terminalView = document.querySelector('.terminal-view');
const cardView = document.querySelector('.card-view');

viewToggle.addEventListener('click', function(e) {
    if (e.target.classList.contains('ubuntu-button')) {
        // Remove active class from all buttons
        viewToggle.querySelectorAll('.ubuntu-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Toggle views with animation
        if (e.target.dataset.view === 'terminal') {
            cardView.classList.add('hidden');
            terminalView.classList.remove('hidden');
            terminalView.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
            terminalView.classList.add('hidden');
            cardView.classList.remove('hidden');
            cardView.style.animation = 'fadeIn 0.5s ease forwards';
        }
    }
});

// Particles.js initialization
window.addEventListener('DOMContentLoaded', function() {
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#e95420" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.3,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out"
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }
});
