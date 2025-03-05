import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

export default function sliders() {
  const previewsSlider = document.querySelector(".template__previews");

  if (previewsSlider) {
    const slider = new Swiper(previewsSlider, {
      speed: 800,
      slidesPerView: "auto",
      modules: [Navigation],
      spaceBetween: 8,
      slideToClickedSlide: true,
      navigation: {
        prevEl: ".template .slider-btn._prev",
        nextEl: ".template .slider-btn._next",
      },
    });
  }
}
