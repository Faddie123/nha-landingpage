const testimonialSlider = document.querySelector('.testimonial');

if (testimonialSlider) {
  const slides = [...testimonialSlider.querySelectorAll('[data-testimonial-slide]')];
  const dots = [...testimonialSlider.querySelectorAll('[data-testimonial-dot]')];
  const previousButton = testimonialSlider.querySelector('[data-testimonial-previous]');
  const nextButton = testimonialSlider.querySelector('[data-testimonial-next]');
  let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
  let autoplayTimer;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.hidden = !isActive;
      slide.classList.toggle('is-active', isActive);
    });
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle('on', isActive);
      dot.setAttribute('aria-pressed', String(isActive));
    });
  };

  previousButton?.addEventListener('click', () => showSlide(activeIndex - 1));
  nextButton?.addEventListener('click', () => showSlide(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));

  const stopAutoplay = () => {
    window.clearInterval(autoplayTimer);
    autoplayTimer = undefined;
  };

  const startAutoplay = () => {
    if (slides.length < 2 || document.hidden || autoplayTimer) return;
    autoplayTimer = window.setInterval(() => showSlide(activeIndex + 1), 5000);
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });
  startAutoplay();
}
