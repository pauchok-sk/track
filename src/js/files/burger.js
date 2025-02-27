export default function burger() {
  const burgerBtn = document.querySelector("#burger-btn");
  const burger = document.querySelector("#burger");
  const heightHeader = document.querySelector(".header").clientHeight;

  if (burger) {
    burger.addEventListener("click", (e) => e.stopPropagation());

    burgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (burger.classList.contains("_open")) {
        burgerClose();
      } else {
        burgerOpen();
      }
    });

    function burgerClose() {
      burger.classList.remove("_open");
      burgerBtn.classList.remove("_active");
      document.body.classList.remove("body-hidden");

      document.body.removeEventListener("click", burgerClose);
    }

    function burgerOpen() {
      burger.classList.add("_open");
      burgerBtn.classList.add("_active");
      document.body.classList.add("body-hidden");

      document.body.addEventListener("click", burgerClose);
    }

    function updateHeightBurger() {
      burger.style.maxHeight = `${window.visualViewport.height - heightHeader}px`;
      burger.style.top = `${heightHeader}px`;
    }

    window.visualViewport.addEventListener("resize", updateHeightBurger);
    window.visualViewport.addEventListener("scroll", updateHeightBurger);

    updateHeightBurger();
  }
}