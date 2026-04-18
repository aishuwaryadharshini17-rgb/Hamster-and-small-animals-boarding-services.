(() => {
  const sliders = document.querySelectorAll("[data-hero-slider]");

  if (!sliders.length) {
    return;
  }

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  sliders.forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll("[data-hero-slide]"));
    const dots = Array.from(slider.querySelectorAll("[data-slider-dot]"));
    const previousButton = slider.querySelector("[data-slider-prev]");
    const nextButton = slider.querySelector("[data-slider-next]");
    const autoplayDelay = 5200;
    let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
    let autoplayId = null;

    if (!slides.length) {
      return;
    }

    if (activeIndex < 0) {
      activeIndex = 0;
    }

    const stopAutoplay = () => {
      if (autoplayId !== null) {
        window.clearInterval(autoplayId);
        autoplayId = null;
      }
    };

    const render = (nextIndex) => {
      activeIndex = (nextIndex + slides.length) % slides.length;

      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;

        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;

        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-pressed", String(isActive));
      });
    };

    const startAutoplay = () => {
      stopAutoplay();

      if (slides.length < 2 || reducedMotionQuery.matches) {
        return;
      }

      autoplayId = window.setInterval(() => {
        render(activeIndex + 1);
      }, autoplayDelay);
    };

    const step = (direction) => {
      render(activeIndex + direction);
      startAutoplay();
    };

    previousButton?.addEventListener("click", () => {
      step(-1);
    });

    nextButton?.addEventListener("click", () => {
      step(1);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        render(index);
        startAutoplay();
      });
    });

    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);
    slider.addEventListener("focusin", stopAutoplay);
    slider.addEventListener("focusout", (event) => {
      if (!slider.contains(event.relatedTarget)) {
        startAutoplay();
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", startAutoplay);
    }

    render(activeIndex);
    startAutoplay();
  });
})();
