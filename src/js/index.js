import "core-js/stable";
import "regenerator-runtime/runtime";

import "../sass/main.scss";

// DOM Elements
const tooltips = document.querySelectorAll(".tooltips .tooltip");
const section = document.querySelector(".section");
const container = document.querySelector(".container");

function contentPosition() {
  tooltips.forEach((tooltip) => {
    const pin = tooltip.querySelector(".tooltip__pin");
    const content = tooltip.querySelector(".tooltip__content");
    const arrow = tooltip.querySelector(".tooltip__content__arrow");

    // pin.getBoundingClientRect().left is relative to viewport
    // pin.offsetLeft is relative to it's parent

    content.style.left = `${pin.offsetLeft - content.offsetWidth / 2}px`;
    content.style.top = `${pin.offsetTop + 40}px`;
    arrow.style.left = `${pin.offsetLeft - content.offsetLeft + pin.offsetWidth / 2}px`;
  });
}

contentPosition();
["load", "resize"].forEach((evt) => window.addEventListener(evt, contentPosition));
