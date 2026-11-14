(() => {
  const header = document.querySelector(".header");
  if (header) {
    const updateHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0
        ? Math.min(window.scrollY / scrollableHeight, 1) * 100
        : 0;
      header.style.setProperty("--scroll-progress", `${progress}%`);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroSlides = document.querySelectorAll(".hero-slide");
  if (!reduceMotion && heroSlides.length > 1) {
    let activeSlide = 0;
    window.setInterval(() => {
      heroSlides[activeSlide].classList.remove("is-active");
      activeSlide = (activeSlide + 1) % heroSlides.length;
      heroSlides[activeSlide].classList.add("is-active");
    }, 6000);
  }

  const revealSelector = [
    ".hero-content",
    ".quick-link",
    ".service-card",
    ".about-img",
    ".about-text",
    ".about-stats .stat",
    ".leader-card",
    ".project-card",
    ".detail-hero > .container",
    ".detail-card",
    ".project-section-item",
    ".about-hero-copy",
    ".about-hero-image",
    ".about-responsibility-card",
    ".about-mission-card",
    ".career-hero-copy",
    ".career-pillar",
    ".career-step",
    ".media-card",
    ".contact-hero > .container",
    ".directory-heading",
    ".table-wrap",
    ".contact-card",
    ".complaints-category-card",
    ".maintenance-panel",
    ".travel-panel"
  ].join(",");

  if (reduceMotion) return;

  const elements = document.querySelectorAll(revealSelector);
  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const siblingIndexes = new Map();
  elements.forEach((element) => {
    const parent = element.parentElement;
    const index = siblingIndexes.get(parent) || 0;
    siblingIndexes.set(parent, index + 1);
    element.style.setProperty("--motion-delay", `${Math.min(index, 4) * 70}ms`);
    element.setAttribute("data-motion-reveal", "");
  });

  document.documentElement.classList.add("motion-enabled");

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

  elements.forEach((element) => observer.observe(element));
})();
