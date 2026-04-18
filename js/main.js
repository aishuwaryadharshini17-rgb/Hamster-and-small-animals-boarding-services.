(() => {
  const root = document.documentElement;

  try {
    const savedTheme = localStorage.getItem("cozyCrittersTheme");
    const savedDirection = localStorage.getItem("cozyCrittersDirection");

    root.dataset.theme = savedTheme === "dark" ? "dark" : "light";
    root.setAttribute("dir", savedDirection === "rtl" ? "rtl" : "ltr");
  } catch (error) {
    root.dataset.theme = "light";
    root.setAttribute("dir", "ltr");
  }

  const themeButton = document.querySelector('[data-mode-toggle="theme"]');
  const directionButton = document.querySelector('[data-mode-toggle="dir"]');

  if (!themeButton || !directionButton) {
    return;
  }

  const storageKeys = {
    theme: "cozyCrittersTheme",
    direction: "cozyCrittersDirection"
  };

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
    const valueNode = button.querySelector(".nav-mode-value");

    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);

    if (valueNode) {
      valueNode.textContent = value;
    }
  };

  const render = () => {
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

  themeButton.addEventListener("click", () => {
    const nextTheme = getTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    safeStore(storageKeys.theme, nextTheme);
    render();
  });

  directionButton.addEventListener("click", () => {
    const nextDirection = getDirection() === "rtl" ? "ltr" : "rtl";
    root.setAttribute("dir", nextDirection);
    safeStore(storageKeys.direction, nextDirection);
    render();
  });

  render();
})();
  (function () {
      try {
        var root = document.documentElement;
        var savedTheme = localStorage.getItem("cozyCrittersTheme");
        var savedDirection = localStorage.getItem("cozyCrittersDirection");

        root.dataset.theme = savedTheme === "dark" ? "dark" : "light";
        root.setAttribute("dir", savedDirection === "rtl" ? "rtl" : "ltr");
      } catch (error) {
        document.documentElement.dataset.theme = "light";
        document.documentElement.setAttribute("dir", "ltr");
      }
    }());

     (function () {
      try {
        var root = document.documentElement;
        var savedTheme = localStorage.getItem("cozyCrittersTheme");
        var savedDirection = localStorage.getItem("cozyCrittersDirection");

        root.dataset.theme = savedTheme === "dark" ? "dark" : "light";
        root.setAttribute("dir", savedDirection === "rtl" ? "rtl" : "ltr");
      } catch (error) {
        document.documentElement.dataset.theme = "light";
        document.documentElement.setAttribute("dir", "ltr");
      }
    }());