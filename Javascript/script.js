import { projectData } from "./data.js";

// Gère le survol des liens du menu
function setHover() {
  const links = document.querySelectorAll("nav li a");

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.classList.add("nav--hover");
    });

    link.addEventListener("mouseleave", () => {
      link.classList.remove("nav--hover");
    });
  });
}

// Gère le scroll fluide avec marge pour le header
function setScroll() {
  const header = document.querySelector("header");
  const links = document.querySelectorAll("header nav a");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("href");
      const target = document.querySelector(id);

      if (target) {
        const offset = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;

        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      }
    });
  });
}

// Gère le zoom sur les cartes projets
function setZoom() {
  const cards = document.querySelectorAll(".projets__article");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        card.style.transform = "scale(1.08)";
        card.style.transition = "transform 0.3s ease";
      } else {
        card.style.transform = "none";
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1)";
    });
  });
}

function handleModal() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.querySelector(".modal__close");
  const cards = document.querySelectorAll(".projets__article");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = card.dataset.id;
      const project = projectData.find((p) => p.id === projectId);
      if (!project) return;

      // Remplir le contenu de la modale
      modal.querySelector(".modal__description").textContent = project.description;

      const problemList = modal.querySelector(".modal__problem--list");
      problemList.innerHTML = "";
      project.problems.forEach((problem) => {
        const li = document.createElement("li");
        li.textContent = problem;
        problemList.appendChild(li);
      });
      document.querySelector(".modal__title").textContent = project.title;
      modal.querySelector(".modal__skills").textContent = project.skills;
      modal.querySelector(".modal__github").href = project.github;
      modal.querySelector(".modal__site").href = project.site;

      modal.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => modal.classList.remove("active"));

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

// Gère le menu burger

function handleBurgerMenu() {
  const burger = document.querySelector(".nav_burger");
  const menu = document.querySelector("nav ul");

  burger.addEventListener("click", (e) => {
    e.stopPropagation(); // empêche la fermeture immédiate
    menu.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target)) {
      menu.classList.remove("open");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setHover();
  setScroll();
  setZoom();
  handleModal();
  handleBurgerMenu();
});
