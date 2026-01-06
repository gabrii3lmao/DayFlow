document.querySelectorAll("[data-collapsible]").forEach(card => {
  const button = card.querySelector(".day-toggle");

  button.addEventListener("click", () => {
    card.classList.toggle("is-collapsed");
  });
});
