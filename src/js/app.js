import "../scss/style.scss";
import "./lib/bootstrap.min.js";
import "./lib/inputmask.min.js";

import spoller from "./files/spoller.js";
import burger from "./files/burger.js";
import { heroAnimate, backgroundParallax, stirringsElements } from "./files/animate.js";
import mediaAdaptive from "./files/mediaAdaptive.js";
import { passwordBtn } from "./files/password-btn.js";
import scrollables from "./files/scrollables.js";
import btnBack from "./files/btn-back.js";
import sliders from "./files/sliders.js";
import { videoPlayer, videoSrc } from "./files/video.js";
import { templateConstructor } from "./files/template.js";
import tab from "./files/tab.js";
import inputmask from "./files/inputmask.js";
import { loadLogoOrder, qrType } from "./files/orderPage.js";
import { copyBtn, copyInputValue } from "./files/copy.js";

spoller();
burger();

heroAnimate();
backgroundParallax();
stirringsElements();
mediaAdaptive();
passwordBtn();
scrollables();
copyBtn();
copyInputValue();
btnBack();
sliders();
videoSrc();
videoPlayer();
templateConstructor();
tab();
inputmask();
loadLogoOrder();
qrType();