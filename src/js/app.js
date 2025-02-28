import "../scss/style.scss";
import "./lib/bootstrap.min.js";

import spoller from "./files/spoller.js";
import burger from "./files/burger.js";
import { getOrdersAnimate, heroAnimate, qrSectionAnimate } from "./files/animate.js";

spoller();
burger();

heroAnimate();
getOrdersAnimate();
qrSectionAnimate();