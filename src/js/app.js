import "../scss/style.scss";
import "./lib/bootstrap.min.js";

import spoller from "./files/spoller.js";
import burger from "./files/burger.js";
import { getOrdersAnimate, heroAnimate, backgroundParallax, stirringsElements } from "./files/animate.js";
import mediaAdaptive from "./files/mediaAdaptive.js";
import { passwordBtn } from "./files/password-btn.js";
import scrollables from "./files/scrollables.js";

spoller();
burger();

heroAnimate();
backgroundParallax();
stirringsElements();

mediaAdaptive();
passwordBtn();
scrollables();