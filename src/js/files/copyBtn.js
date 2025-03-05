import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export default function copyBtn() {
  const buttons = document.querySelectorAll("[data-copy]");

  tippy("[data-copy]", {
    content: "Скопировано",
    trigger: "click",
  });

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const copytext = btn.dataset.copy;

        navigator.clipboard.writeText(copytext);
      });
    });
  }
}
