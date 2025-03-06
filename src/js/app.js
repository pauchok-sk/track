import "../scss/style.scss";
import "./lib/bootstrap.min.js";

import spoller from "./files/spoller.js";
import burger from "./files/burger.js";
import { heroAnimate, backgroundParallax, stirringsElements } from "./files/animate.js";
import mediaAdaptive from "./files/mediaAdaptive.js";
import { passwordBtn } from "./files/password-btn.js";
import scrollables from "./files/scrollables.js";
import copyBtn from "./files/copyBtn.js";
import btnBack from "./files/btn-back.js";
import sliders from "./files/sliders.js";
import { videoPlayer, videoSrc } from "./files/video.js";
import { templateConstructor } from "./files/template.js";

spoller();
burger();

heroAnimate();
backgroundParallax();
stirringsElements();
mediaAdaptive();
passwordBtn();
scrollables();
copyBtn();
btnBack();
sliders();
videoSrc();
videoPlayer();
templateConstructor();