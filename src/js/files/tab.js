export default function tab() {
  const buttonsTab = document.querySelectorAll("[data-tab-btn]");

  if (buttonsTab.length) {
    buttonsTab.forEach((btn) => {
      const parent = btn.closest(".tab-container");
      const currentTabs = parent.querySelectorAll("[data-tab]");
      const currentButtons = parent.querySelectorAll("[data-tab-btn]");
      const currentImg = parent.querySelector("[data-tab-img]");

      if (currentImg) currentImg.src = currentButtons[0].dataset.img;

      btn.addEventListener("click", () => {
        const idTab = btn.dataset.tabBtn;
        const srcImg = btn.dataset.img;
        const currentTab = parent.querySelector(`[data-tab="${idTab}"]`);

        if (currentImg) {
          currentImg.style.opacity = 0;
          currentImg.src = srcImg;

          setTimeout(() => (currentImg.style.opacity = 1), 200);
        }

        currentTabs.forEach((t) => t.classList.remove("_open"));
        currentButtons.forEach((b) => b.classList.remove("_active"));

        currentTab.classList.add("_open");
        btn.classList.add("_active");
      });
    });
  }
}