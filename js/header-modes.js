(() => {
  const root = document.documentElement;
  const storageKeys = {
    theme: "cozyCrittersTheme",
    direction: "cozyCrittersDirection"
  };

  try {
    const savedTheme = localStorage.getItem(storageKeys.theme);
    const savedDirection = localStorage.getItem(storageKeys.direction);

    root.dataset.theme = savedTheme === "dark" ? "dark" : "light";
    root.setAttribute("dir", savedDirection === "rtl" ? "rtl" : "ltr");
  } catch (error) {
    root.dataset.theme = "light";
    root.setAttribute("dir", "ltr");
  }

  const themeButton = document.querySelector('[data-mode-toggle="theme"]');
  const directionButton = document.querySelector('[data-mode-toggle="dir"]');

  const safeStore = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      return;
    }
  };

  const getTheme = () => root.dataset.theme === "dark" ? "dark" : "light";
  const getDirection = () => root.getAttribute("dir") === "rtl" ? "rtl" : "ltr";

  const syncButton = (button, isActive, value, label) => {
    if (!button) {
      return;
    }

    const valueNode = button.querySelector(".nav-mode-value");

    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);

    if (valueNode) {
      valueNode.textContent = value;
    }
  };

  const renderModeButtons = () => {
    const theme = getTheme();
    const direction = getDirection();

    syncButton(
      themeButton,
      theme === "dark",
      theme === "dark" ? "Dark" : "Light",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );

    syncButton(
      directionButton,
      direction === "rtl",
      direction.toUpperCase(),
      direction === "rtl" ? "Switch to left to right layout" : "Switch to right to left layout"
    );
  };

  themeButton?.addEventListener("click", () => {
    const nextTheme = getTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    safeStore(storageKeys.theme, nextTheme);
    renderModeButtons();
  });

  directionButton?.addEventListener("click", () => {
    const nextDirection = getDirection() === "rtl" ? "ltr" : "rtl";
    root.setAttribute("dir", nextDirection);
    safeStore(storageKeys.direction, nextDirection);
    renderModeButtons();
  });

  renderModeButtons();
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const careCards = Array.from(document.querySelectorAll("[data-care-card]"));

  if (careCards.length) {
    let activeCareIndex = Math.max(0, careCards.findIndex((card) => card.classList.contains("is-active")));
    let careCycleTimer = null;

    const setActiveCareCard = (index) => {
      activeCareIndex = index;

      careCards.forEach((card, cardIndex) => {
        card.classList.toggle("is-active", cardIndex === index);
      });
    };

    const restartCareCycle = () => {
      if (careCycleTimer) {
        window.clearInterval(careCycleTimer);
      }

      if (reducedMotionQuery.matches || careCards.length < 2) {
        careCycleTimer = null;
        return;
      }

      careCycleTimer = window.setInterval(() => {
        const nextIndex = (activeCareIndex + 1) % careCards.length;
        setActiveCareCard(nextIndex);
      }, 3600);
    };

    setActiveCareCard(activeCareIndex);
    restartCareCycle();

    careCards.forEach((card, index) => {
      const activateCard = () => {
        setActiveCareCard(index);
        restartCareCycle();
      };

      card.addEventListener("mouseenter", activateCard);
      card.addEventListener("focus", activateCard);
      card.addEventListener("click", activateCard);
      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        event.preventDefault();
        activateCard();
      });
    });

    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", () => {
        restartCareCycle();
      });
    }
  }

  const scrollTopButton = (() => {
    const existingButton = document.querySelector("[data-scroll-top]");

    if (existingButton) {
      return existingButton;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "scroll-top-button";
    button.setAttribute("data-scroll-top", "");
    button.setAttribute("aria-label", "Scroll to top");
    button.innerHTML = `
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M12 18V6"></path>
        <path d="m6 12 6-6 6 6"></path>
      </svg>
    `;
    document.body.append(button);
    return button;
  })();

  const updateScrollTopButton = () => {
    const shouldShow = window.scrollY > 260;

    scrollTopButton.classList.toggle("is-visible", shouldShow);
    scrollTopButton.setAttribute("aria-hidden", String(!shouldShow));
  };

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotionQuery.matches ? "auto" : "smooth"
    });
  });

  window.addEventListener("scroll", updateScrollTopButton, { passive: true });
  updateScrollTopButton();

  const revealNodes = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!revealNodes.length) {
    return;
  }

  const showAllReveals = () => {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  };

  if (reducedMotionQuery.matches || typeof IntersectionObserver !== "function") {
    showAllReveals();
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));

  if (typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", (event) => {
      if (!event.matches) {
        return;
      }

      revealObserver.disconnect();
      showAllReveals();
    });
  }
})();
