import gsap from "gsap";

export function heroAnimate() {
  const hero = document.querySelector(".hero");
  const music = document.querySelector(".hero__music");
  const record = document.querySelector(".hero__recorder");
  const recorcBig = document.querySelector(".hero__recorder-big");
  const stars = Array.from(document.querySelectorAll(".hero__star"));

  if (hero) {
    const items = [music, record, recorcBig];

    hero.addEventListener("mousemove", (e) => {
      const { width, height } = hero.getBoundingClientRect();

      const x = (e.offsetX / width - 0.5) * 20;
      const y = (e.offsetY / height - 0.5) * 20;

      items.forEach((item, index) => {
        const depth = (index + 1) * 3;

        gsap.to(item, {
          x: x * depth,
          y: y * depth,
          duration: 10 + index,
          ease: "power2.out",
        });
      });
    });

    hero.addEventListener("mouseleave", () => {
      gsap.to(items, { x: 0, y: 0, duration: 7.5, ease: "power2.out" });
    });

    stars.forEach((star) => stirring(star));

    if (window.matchMedia("(max-width: 991px)").matches) {
      stirring(recorcBig);
    }
  }
}

export function getOrdersAnimate() {
  const section = document.querySelector(".get-orders");

  if (section) {
    const stirringsArr = section.querySelectorAll(".stirring-el");
    const bg = document.querySelector(".get-orders__bg");

    stirringsArr.forEach((item) => stirring(item, 2.5));

    section.addEventListener("mousemove", (e) => {
      const { width, height } = section.getBoundingClientRect();

      const x = (e.offsetX / width - 0.5) * 20;
      const y = (e.offsetY / height - 0.5) * 20;

      gsap.to(bg, {
        x: x,
        y: y,
        duration: 10,
        ease: "power2.out",
      });
    });
  }
}

export function qrSectionAnimate() {
  const section = document.querySelector(".qr");

  if (section) {
    const stirringsArr = section.querySelectorAll(".stirring-el");
    stirringsArr.forEach((item) => stirring(item, 3.5));
    const backgrounds = document.querySelectorAll(".qr__bg");

    section.addEventListener("mousemove", (e) => {
      const { width, height } = section.getBoundingClientRect();
      const x = (e.offsetX / width - 0.5) * 20;
      const y = (e.offsetY / height - 0.5) * 20;

      backgrounds.forEach((bg, index) => {
          const depth = (index + 1) * 5;
          gsap.to(bg, { x: x * depth, y: y * depth, duration: 30, ease: "power2.out" });
      });
    });
  }
}

function stirring(el, duration) {
  gsap.to(el, {
    x: "random(-10, 15, 1)", // случайное движение по X
    y: "random(-10, 15, 1)", // случайное движение по Y
    rotation: "random(-5, 5, 1)", // небольшое вращение
    duration: duration || 1.5, // плавность
    ease: "sine.inOut",
    repeat: -1, // бесконечно
    yoyo: true, // возврат в исходное положение
  });
}
