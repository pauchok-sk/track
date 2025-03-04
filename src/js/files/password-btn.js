export function passwordBtn() {
  const passwordButtons = document.querySelectorAll(".password-btn");

  if (passwordButtons.length) {
    passwordButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {

        const control = btn.closest(".input-control");
        const input = control.querySelector(".input");

        if (btn.classList.contains("_active")) {
          input.type = "password";
          btn.classList.remove("_active");
        } else {
          input.type = "text";
          btn.classList.add("_active");
        }
      });
    });
  }
}