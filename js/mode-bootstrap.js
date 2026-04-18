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
})();
