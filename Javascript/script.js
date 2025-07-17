// Gère le survol des liens du menu
function setHover() {
  const links = document.querySelectorAll("nav li a");

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.classList.add("nav-hover");
    });

    link.addEventListener("mouseleave", () => {
      link.classList.remove("nav-hover");
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
        const offset =
          target.getBoundingClientRect().top +
          window.scrollY -
          header.offsetHeight;

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
  const cards = document.querySelectorAll(".projets_article");

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
  const closeBtn = document.querySelector(".modal_close");
  const cards = document.querySelectorAll(".projets_article");

  cards.forEach(card => {
    card.addEventListener("click", e => {
      e.preventDefault();
      modal.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => modal.classList.remove("active"));

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  setHover();
  setScroll();
  setZoom();
  handleModal();
});
