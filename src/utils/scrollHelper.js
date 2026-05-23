// Native smooth scroll helper - no external dependencies
export const smoothScrollTo = (target, offset = 80) => {
  const element = document.querySelector(target);
  if (element) {
    const top = element.offsetTop - offset;
    window.scrollTo({
      top: top,
      behavior: "smooth",
    });
  }
};

export const scrollToSection = (sectionId, offset = 80) => {
  const target = `#${sectionId}`;
  smoothScrollTo(target, offset);
};

export const initSmoothScrolling = () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target.getAttribute("href");
      smoothScrollTo(target);
    });
  });
};
