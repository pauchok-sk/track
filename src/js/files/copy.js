import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export function copyBtn() {
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

export function copyInputValue() {
  const buttons = document.querySelectorAll("[data-copy-input]");

  tippy("[data-copy-input]", {
    content: "Скопировано",
    trigger: "click",
  });

  if (buttons.length) {
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.copyInput;
        const target = document.querySelector(`#${id}`);

        console.log(target.value)

        navigator.clipboard.writeText(target.value);
      })
    })
  }
}