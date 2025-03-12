export function loadLogoOrder() {
  const input = document.querySelector("#order-logo-download");

  if (input) {
    const inputType = document.querySelector("#order-logo-type");
    const label = input.nextElementSibling;
    const logoWrapper = document.querySelector("#order-logo-wrapper");

    input.addEventListener("change", (e) => {
      const [file] = e.target.files;
      const logoImg = logoWrapper.querySelector(".order__logo-img");

      const reader = new FileReader();
      reader.onload = ({ target }) => {
        if (logoImg) {
          logoImg.src = target.result;
        } else {
          const img = document.createElement("img");
          img.classList.add("order__logo-img", "mb-3");
          img.alt = "image";
          img.src = target.result;

          logoWrapper.prepend(img);
        }
      };

      inputType?.remove();
      label.textContent = "Сменить лого";
      reader.readAsDataURL(file); 
    });
  }
}

export function qrType() {
  const qrInputs = document.querySelectorAll("[name='qr-type']");

  if (qrInputs.length) {
    const qrDownload = document.querySelector("#qr-download");

    qrInputs.forEach(input => {
      input.addEventListener("change", (e) => {
        qrDownload.href = e.target.value;
      })
    })
  }
}