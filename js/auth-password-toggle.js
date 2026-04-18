document.querySelectorAll(".password-toggle").forEach((toggle) => {
  const field = toggle.closest(".password-field");
  const input = field ? field.querySelector('input[type="password"], input[type="text"]') : null;

  if (!input) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isVisible = input.type === "text";

    input.type = isVisible ? "password" : "text";
    toggle.setAttribute("aria-pressed", String(!isVisible));
    toggle.setAttribute("aria-label", isVisible ? "Show password" : "Hide password");
  });
});
