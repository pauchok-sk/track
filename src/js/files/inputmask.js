export default function inputmask() {
  const inputsTel = document.querySelectorAll('input[type="tel"]');
  const imTel = new Inputmask("+7 (999) 999 99-99");
  imTel.mask(inputsTel);

  const inputsCard = document.querySelectorAll("input[data-mask-card]");
  const imCard = new Inputmask("9999 9999 9999 9999");
  imCard.mask(inputsCard);
}