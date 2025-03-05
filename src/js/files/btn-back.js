export default function btnBack() {
  const buttons = document.querySelectorAll(".btn-back");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => window.history.back());
    });
  }
}
